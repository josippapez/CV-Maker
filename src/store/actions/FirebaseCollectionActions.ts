import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { AppDispatch, AppState } from './../store';

export const FirebaseCollectionActions = (collectionName: string) => {
  return {
    add: (data: any, onSuccess?: () => void, onError?: () => void) => {
      return async (dispatch: AppDispatch, getState: AppState) => {
        try {
          const { id } = getState().user.user;
          if (!id) {
            throw new Error('User not logged in');
          }
          await setDoc(doc(getFirestore(), collectionName, id), {
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
        await updateDoc(doc(getFirestore(), collectionName, id), data);
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
        await deleteDoc(doc(getFirestore(), collectionName, id));
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
        const docRef = doc(getFirestore(), collectionName, id);
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
  };
};
