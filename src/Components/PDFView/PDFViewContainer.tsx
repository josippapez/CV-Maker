import {
  Document,
  Page,
  Text,
  usePDF,
  StyleSheet,
  View,
} from '@react-pdf/renderer';
import { useState } from 'react';

import PDFViewPresenter from './PDFViewPresenter';

const styles = StyleSheet.create({
  pdfViewer: {
    width: '100%',
    height: '100%',
  },
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
  },
});

const PDFView = () => {
  const [firstInput, setFirstInput] = useState('');
  const [instance, updateInstance] = usePDF({
    document: (
      <Document>
        <Page size='A4' style={styles.page}>
          <View>
            <Text>{firstInput}</Text>
          </View>
        </Page>
      </Document>
    ),
  });
  console.log(instance);

  return (
    <PDFViewPresenter
      pdfInstance={instance}
      updateInstance={updateInstance}
      setFirstInput={setFirstInput}
      firstInput={firstInput}
    />
  );
};

export default PDFView;
