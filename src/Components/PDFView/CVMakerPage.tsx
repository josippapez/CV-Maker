import PDFView from '@/Components/PDFView/PDFViewContainer';
import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const CVMakerPage: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PDFView />
      </PersistGate>
    </Provider>
  );
};

export default CVMakerPage;
