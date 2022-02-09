import { useState } from 'react';
import Modal from '../Shared/Modal/Modal';

type Props = {
  pdfInstance: {
    url: string;
    blob: Blob;
  };
  closeModal(): void;
  show: boolean;
};

const PDFDownload = (props: Props) => {
  const { pdfInstance, show, closeModal } = props;
  const [cvName, setCvName] = useState('CV');
  return (
    <Modal show={show} position='center' closeModal={closeModal}>
      <div className='w-fit h-fit bg-white p-5 flex-col'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Download CV</h1>
          <button
            className='text-2xl font-bold'
            onClick={() => {
              closeModal();
            }}
          >
            &times;
          </button>
        </div>
        <div className='flex justify-center mt-4'>
          <span className='font-bold w-auto self-center mr-3'>CV PDF name</span>
          <input
            className='w-auto p-2 border border-gray-400'
            type='text'
            placeholder='Enter CV name'
            value={cvName}
            onChange={e => setCvName(e.target.value)}
          />
        </div>
        <div className='flex justify-center mt-4'>
          <a
            className='w-full p-2 bg-blue-500 text-white font-bold text-center shadow-[0_0_20px_-5px] hover:shadow-blue-800 focus:shadow-blue-800'
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

export default PDFDownload;
