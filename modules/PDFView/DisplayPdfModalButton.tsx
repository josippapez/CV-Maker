import { PDFData } from '@modules/PDFView/models';
import { PageLoader } from '@modules/Shared/Loader/PageLoader';
import { CloseButton } from '@modules/Shared/Modal/Components';
import { Modal } from '@modules/Shared/Modal/Modal';
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
  data: PDFData;
};

export const DisplayPdfModalButton: FC<Props> = ({
  className,
  iconStrokeColor,
  data,
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
        contentClassname='bg-white dark:bg-almost-black'
        closeModal={() => setDisplayPdfModal(false)}
      >
        <CloseButton
          onClick={() => setDisplayPdfModal(false)}
          align='left'
          imageClassName='dark:fill-white'
          buttonClassName='p-4'
        />
        <DynamicPDFDisplay data={data} />
      </Modal>
    </>
  );
};
