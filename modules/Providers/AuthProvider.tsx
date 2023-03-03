import firebase from 'firebase/compat/app';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: firebase.User | null }>({
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebase.User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async user => {
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
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
