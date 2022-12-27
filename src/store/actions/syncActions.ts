import { toast } from 'react-toastify';
import { cacheAllData, PDFData, setLoading } from '../reducers/pdfData';
import { setTemplate, Template, TemplateName } from '../reducers/template';
import { AppDispatch, AppState } from '../store';
import { FirebaseCollectionActions } from './FirebaseCollectionActions';

export interface DocumentPDFData extends PDFData {
  template: Template;
}

export const saveDataForUser = () => {
  return (dispatch: AppDispatch, getState: AppState) => {
    if (!getState().user.user.id) return;

    const { add } = FirebaseCollectionActions('user-data');

    const data = Object.keys(getState().pdfData).reduce((acc, key) => {
      if (key !== 'timestamp' && key !== 'loading') {
        return { ...acc, [key]: getState().pdfData[key as keyof PDFData] };
      } else {
        return acc;
      }
    }, {});

    dispatch(
      add(
        {
          ...data,
          template: getState().template,
          timestamp: Date.now(),
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
    const { id } = getState().user.user;
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

export const getDataForUser = () => {
  return (dispatch: AppDispatch, getState: AppState) => {
    const id = getState().user.user.id;

    if (!id) return;

    const { getById } = FirebaseCollectionActions('user-data');

    dispatch(setLoading(true));

    getById(
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
        dispatch(setLoading(false));
      }
    ).then(data => {
      if (!data) {
        dispatch(saveDataForUser());
        dispatch(setLoading(false));
        toast.dark('Saved data to cloud!', {
          type: 'success',
          position: 'bottom-center',
        });
        return;
      }

      const pdfData = data;

      dispatch(setLoading(false));
      dispatch(cacheAllData(pdfData as PDFData));
      dispatch(setTemplate(pdfData.template.templateName as TemplateName));
    });
  };
};

export const getCVPreviewForUser = async (
  userId: string,
  setState: (data: any) => void
) => {
  const id = userId;

  if (!id) return;

  const { listenById } = FirebaseCollectionActions('user-data');

  return listenById(id, setState);
};
