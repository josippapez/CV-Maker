import PDFViewContainer from '@/Components/PDFView/PDFViewContainer';
import { AuthProvider } from '@/Providers/AuthProvider';
import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const CVMakerPage: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <PDFViewContainer />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default CVMakerPage;
