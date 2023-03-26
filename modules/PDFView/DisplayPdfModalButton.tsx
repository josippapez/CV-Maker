import { PageLoader } from '@modules/Shared/Loader';
import { Modal } from '@modules/Shared/Modal';
import DocumentButton from '@public/Styles/Assets/Images/documentButton.svg';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';

const DynamicPDFDisplay = dynamic(
  () =>
    import('@modules/Shared/PDFDisplay/PDFDisplay').then(mod => ({
      default: mod.PDFDisplay,
    })),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

type Props = {
  className?: string;
  iconStrokeColor?: string;
};

export const DisplayPdfModalButton: FC<Props> = ({
  className,
  iconStrokeColor,
}) => {
  const [displayPdfModal, setDisplayPdfModal] = useState(false);

  return (
    <>
      <div
        className={`flex items-center justify-center ${className}`}
        onClick={() => setDisplayPdfModal(true)}
      >
        <DocumentButton
          height={30}
          width={35}
          className={`${iconStrokeColor ?? 'stroke-gray-700'}`}
        />
      </div>
      <Modal
        width='screen'
        animation='slide-right'
        position='center'
        height='screen'
        show={displayPdfModal}
        closeModal={() => setDisplayPdfModal(false)}
      >
        <button
          className='absolute top-1 left-3 z-10 flex rounded-full text-4xl font-bold text-white'
          onClick={() => setDisplayPdfModal(false)}
        >
          &times;
        </button>
        <DynamicPDFDisplay />
      </Modal>
    </>
  );
};
