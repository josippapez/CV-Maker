import '@/i18n';
import { store } from '@/store';
import { PDFViewContainer } from '@modules/PDFView';
import { FC } from 'react';
import { Provider } from 'react-redux';

export const CVMakerPreviewPage: FC = () => {
  return (
    <Provider store={store}>
      <PDFViewContainer />
    </Provider>
  );
};
