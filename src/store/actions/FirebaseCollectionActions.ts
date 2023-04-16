import { FirebaseService } from '@modules/Services';
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { AppDispatch, AppState } from './../store';

const firebase = FirebaseService.getInstance();
const auth = firebase.getAuth();
const firestore = firebase.getFirestore();

export const FirebaseCollectionActions = (collectionName: string) => {
  return {
    add: (data: any, onSuccess?: () => void, onError?: () => void) => {
      return async (dispatch: AppDispatch, getState: AppState) => {
        try {
          const id = auth.currentUser?.uid;
          if (!id) {
            throw new Error('User not logged in');
          }
          await setDoc(doc(firestore, collectionName, id), {
            ...data,
            uid: id,
          });
          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.log(error);
          if (onError) {
            onError();
          }
        }
      };
    },
    update: async (
      id: string,
      data: any,
      onSuccess?: () => void,
      onError?: () => void
    ) => {
      try {
        await updateDoc(doc(firestore, collectionName, id), data);
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.log(error);
        if (onError) {
          onError();
        }
      }
    },
    delete: async (
      id: string,
      onSuccess?: () => void,
      onError?: () => void
    ) => {
      try {
        await deleteDoc(doc(firestore, collectionName, id));
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.log(error);
        if (onError) {
          onError();
        }
      }
    },
    getById: async (
      id: string,
      onSuccess?: () => void,
      onError?: () => void
    ) => {
      try {
        const docRef = doc(firestore, collectionName, id);
        const docSnap = await getDoc(docRef);
        let data = null;
        if (docSnap.exists()) {
          data = docSnap.data();
        }
        if (onSuccess) {
          onSuccess();
        }
        return data;
      } catch (error) {
        console.log(error);
        if (onError) {
          onError();
        }
      }
    },
    listenById: async (
      id: string,
      setState: (data: any) => void,
      onSuccess?: () => void,
      onError?: () => void
    ) => {
      try {
        const docRef = doc(firestore, collectionName, id);
        const unsubscribe = onSnapshot(docRef, doc => {
          if (doc.exists()) {
            setState(doc.data());
          }
        });
        if (onSuccess) {
          onSuccess();
        }
        return unsubscribe;
      } catch (error) {
        console.log(error);
        if (onError) {
          onError();
        }
      }
    },
  };
};
