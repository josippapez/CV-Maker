import { store } from '@/store';
import '@/translations/i18n';
import { PDFPreview } from '@modules/PDFPreview/PDFPreview';
import { FC } from 'react';
import { Provider } from 'react-redux';

export const CVMakerPreviewPage: FC = () => {
  return (
    <Provider store={store}>
      <PDFPreview />
    </Provider>
  );
};
