import {
  Document as DocumentPDFView,
  Page as DocumentPageView
} from 'react-pdf/dist/umd/entry.webpack';

interface Props {
  pdfInstance: {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
  };
  updateInstance: () => void;
  setFirstInput(value: string): void;
  firstInput: string;
}

const PDFViewPresenter = (props: Props) => {
  const {
    pdfInstance, updateInstance, firstInput, setFirstInput
  } = props;
  return (
    <div className='flex w-full px-4 mt-4 h-full'>
      <div className='w-2/4 mr-3'>
        <input
          className='w-full h-auto border-2 border-gray-600 dark:border-gray-400'
          type='text'
          defaultValue={firstInput}
          onChange={e => {
            setFirstInput(e.target.value.toString());
          }}
          onKeyDown={e => e.key === 'Enter' && updateInstance()}
        />
      </div>
      <div className='w-2/4'>
        <DocumentPDFView file={pdfInstance.url}>
          <DocumentPageView
            renderMode='canvas'
            width={window.innerWidth / 2 - 40}
            pageNumber={1}
            className='mx-5 my-5 drop-shadow-2xl'
          />
        </DocumentPDFView>
      </div>
    </div>
  );
};

export default PDFViewPresenter;
