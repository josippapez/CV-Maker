'use client';

import { persistor, store } from '@/store/store';
import { CreateView } from '@modules/PDFView/CreateView';
import { AuthProvider } from '@modules/Providers/AuthProvider';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const CVMakerPage: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <CreateView />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};
