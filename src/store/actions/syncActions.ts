import { setDisplayVersionHistory } from '@/store/reducers/versionHistory';
import { getAuth } from 'firebase/auth';
import { i18n } from 'next-i18next';
import { toast } from 'react-toastify';
import { cacheAllData, PDFData } from '../reducers/pdfData';
import { setTemplate, Template } from '../reducers/template';
import { AppDispatch, AppState } from '../store';
import { FirebaseCollectionActions } from './FirebaseCollectionActions';

export interface DocumentPDFData extends PDFData {
  template: Template;
  language: string;
}

export const saveDataForUser = () => {
  return async (dispatch: AppDispatch, getState: AppState) => {
    if (!getAuth().currentUser) return;

    const { add } = FirebaseCollectionActions('user-data');

    const data = Object.keys(getState().pdfData).reduce((acc, key) => {
      if (key !== 'timestamp' && key !== 'loaded' && key !== 'modified') {
        return { ...acc, [key]: getState().pdfData[key as keyof PDFData] };
      } else {
        return acc;
      }
    }, {});

    await dispatch(
      add(
        {
          ...data,
          template: getState().template,
          timestamp: Date.now(),
          language: i18n?.language || 'en-US',
        },
        () => {
          console.log('saved user data');
        },
        () => {
          console.log('error saving user data');
        }
      )
    );
  };
};

export const deleteDataForUser = () => {
  return (dispatch: AppDispatch, getState: AppState) => {
    const { delete: deleteData } = FirebaseCollectionActions('user-data');
    const id = getAuth().currentUser?.uid;
    if (!id) {
      throw new Error('User not logged in');
    }
    deleteData(
      id,
      () => {
        console.log('deleted user data');
        toast.dark('Deleted user data!', {
          type: 'success',
          position: 'bottom-right',
        });
      },
      () => {
        console.log('error deleting user data');
        toast.dark('Error deleting user data!', {
          type: 'error',
          position: 'bottom-right',
        });
      }
    );
  };
};

export const getDataForUser = (props?: {
  preventVersionHistory?: boolean;
  userId?: string;
  successCallback?: (data?: DocumentPDFData) => void;
}) => {
  return async (dispatch: AppDispatch, getState: AppState) => {
    const id = getAuth().currentUser?.uid || props?.userId;

    if (!id) return;

    const { getById } = FirebaseCollectionActions('user-data');

    const data = await getById(
      id,
      () => {
        console.log('got user data');
      },
      () => {
        console.log('error getting user data');
        toast.dark('Error getting user data!', {
          type: 'error',
          position: 'bottom-right',
        });
      }
    );

    if (!data) {
      dispatch(saveDataForUser());
      toast.dark('Saved data to cloud!', {
        type: 'success',
        position: 'bottom-center',
      });
      return;
    }

    const pdfData = data as DocumentPDFData;

    if (getState().pdfData.modified && !props?.preventVersionHistory) {
      return dispatch(
        setDisplayVersionHistory({
          displayVersionHistory: true,
          pdfData: pdfData,
        })
      );
    }

    dispatch(cacheAllData(pdfData));
    dispatch(setTemplate(pdfData.template.templateName));
    if (props?.successCallback) {
      props.successCallback(pdfData);
    }
  };
};

export const getCVPreviewForUser = async (
  userId: string,
  setState: (data: any) => void
) => {
  if (!userId) return;

  const { listenById } = FirebaseCollectionActions('user-data');

  return listenById(userId, setState);
};
