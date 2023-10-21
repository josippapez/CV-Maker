import { FirebaseService } from '@modules/Services';
import { usePDFData } from '@modules/Shared/Hooks';
import { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const firebase = FirebaseService.getInstance();

const AuthContext = createContext<{ user: User | null }>({
  user: firebase.getAuth().currentUser,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const { getUserData } = usePDFData();
  const [user, setUser] = useState<User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return firebase.getAuth().onIdTokenChanged(async user => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
        getUserData();
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(
      async () => {
        const user = firebase.getUser();
        if (user) await user.getIdToken(true);
      },
      10 * 60 * 1000
    );

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
