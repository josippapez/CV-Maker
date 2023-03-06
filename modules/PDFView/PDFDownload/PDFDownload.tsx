import { Modal } from '@modules/Shared/Modal';
import { useState } from 'react';

type Props = {
  pdfInstance: {
    url: string;
    blob: Blob;
  };
  closeModal(): void;
  show: boolean;
};

export const PDFDownload = (props: Props) => {
  const { pdfInstance, show, closeModal } = props;
  const [cvName, setCvName] = useState('CV');
  return (
    <Modal show={show} position='center' closeModal={closeModal}>
      <div className='relative h-fit w-fit flex-col bg-white p-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Download CV</h1>
          <button
            className='absolute top-1 right-3 rounded-full font-bold hover:bg-slate-500 hover:text-white'
            style={{
              lineHeight: '10px',
              fontSize: '20px',
              width: '30px',
              height: '30px',
            }}
            onClick={() => {
              closeModal();
            }}
          >
            &times;
          </button>
        </div>
        <div className='mt-4 flex justify-center'>
          <span className='mr-3 w-auto self-center font-bold'>CV PDF name</span>
          <input
            className='w-auto border border-gray-400 p-2'
            type='text'
            placeholder='Enter CV name'
            value={cvName}
            onChange={e => setCvName(e.target.value)}
          />
        </div>
        <div className='mt-4 flex justify-center'>
          <a
            className='w-full bg-blue-500 p-2 text-center font-bold text-white shadow-[0_0_20px_-5px] hover:shadow-blue-800 focus:shadow-blue-800'
            href={pdfInstance?.url}
            download={`${cvName}.pdf`}
          >
            Download
          </a>
        </div>
      </div>
    </Modal>
  );
};
