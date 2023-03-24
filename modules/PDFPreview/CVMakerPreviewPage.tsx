import { store } from '@/store/store';
import i18n from '@/translations/i18n';
import { PDFPreview } from '@modules/PDFPreview/PDFPreview';
import { FC } from 'react';
import { Provider } from 'react-redux';

export const CVMakerPreviewPage: FC = () => {
  i18n.init();
  return (
    <Provider store={store}>
      <PDFPreview />
    </Provider>
  );
};
