import PDFViewContainer from '@/Components/PDFView/PDFViewContainer';
import { AuthProvider } from '@/Providers/AuthProvider';
import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const CVMakerPage: React.FC = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PDFViewContainer />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default CVMakerPage;
