'use client';

import { store } from '@/store/store';
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
