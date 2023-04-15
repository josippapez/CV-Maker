import { FirebaseService } from '@modules/Services';
import { User } from 'firebase/auth';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const firebase = FirebaseService.getInstance();

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return firebase.getAuth().onIdTokenChanged(async user => {
      if (!user) {
        setUser(null);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      } else {
        const token = await user.getIdToken();
        const refreshToken = user.refreshToken;
        setUser(user);
        Cookies.set('accessToken', token, { expires: 14 });
        Cookies.set('refreshToken', refreshToken, { expires: 14 });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.getUser();
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
