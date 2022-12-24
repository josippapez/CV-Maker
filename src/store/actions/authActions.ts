import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import Cookie from 'js-cookie';
import { resetUser, setUser } from '../reducers/user';
import { AppDispatch, store } from '../store';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const auth = getAuth(firebase.app());
    const db = getFirestore(firebase.app());
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        authProvider: 'google',
        email: user.email,
      });
    }
    if (user) {
      const serializedUser = {
        id: user.uid,
        email: user.email,
      };
      Cookie.set('accessToken', await user.getIdToken(), { expires: 1 });
      store.dispatch(setUser(serializedUser));
    }
  } catch (err) {
    console.error(err);
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const auth = getAuth(firebase.app());
    const db = getFirestore(firebase.app());
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
    const serializedUser = {
      id: user.uid,
      email: user.email,
    };
    Cookie.set('accessToken', await user.getIdToken(), { expires: 1 });
    store.dispatch(setUser(serializedUser));
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (
        err.code === 'auth/weak-password' ||
        err.code === 'auth/too-many-requests'
      ) {
        return `auth.${err.code.split('/')[1]}`;
      }
      console.error(err);
    }
  }
};

// export const signInEmailAndPassword = async (
//   email: string,
//   password: string
// ) => {
//   try {
//     const auth = getAuth(firebase.app());
//     const res = await signInWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     if (user) {
//       const serializedUser = {
//         id: user.uid,
//         email: user.email ? user.email : '',
//       };
//       store.dispatch(setUser(serializedUser));
//     } else {
//       return registerWithEmailAndPassword(email, password);
//     }
//   } catch (err) {
//     if (err instanceof FirebaseError) {
//       if (
//         err.code === 'auth/wrong-password' ||
//         err.code === 'auth/too-many-requests'
//       ) {
//         return `auth.${err.code.split('/')[1]}`;
//       }
//       if (err.code === 'auth/user-not-found') {
//         return registerWithEmailAndPassword(email, password);
//       }
//     }
//   }
// };

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    // await persistor.purge();
    // await persistor.flush();
    Cookie.remove('accessToken');
    dispatch(resetUser());
    const auth = getAuth(firebase.app());
    await signOut(auth);
  };
};
