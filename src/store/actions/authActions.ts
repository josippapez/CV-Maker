import { AppDispatch, AppState, persistor } from '@/store/store';
import { FirebaseService } from '@modules/Services';
import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

const firebase = FirebaseService.getInstance();
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
  return async (dispatch: AppDispatch, getState: AppState) => {
    try {
      const auth = firebase.getAuth();
      const db = firebase.getFirestore();
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
    } catch (err) {
      console.error(err);
    }
  };
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const auth = firebase.getAuth();
    const db = firebase.getFirestore();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
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
    await persistor.purge();
    await persistor.flush();
    await firebase.getAuth().signOut();
    localStorage.clear();
    location.reload();
  };
};
