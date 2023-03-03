import '@/i18n';
import { persistor, store } from '@/store';
import { PDFViewContainer } from '@modules/PDFView';
import { AuthProvider } from '@modules/Providers/AuthProvider';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const CVMakerPage: FC = () => {
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
