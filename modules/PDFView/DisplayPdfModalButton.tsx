import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PDFData } from '@modules/PDFView/models';
import { PageLoader } from '@modules/Shared/Loader/PageLoader';
import { CloseButton } from '@modules/Shared/Modal/Components';
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
    <Sheet open={displayPdfModal} onOpenChange={setDisplayPdfModal}>
      <SheetTrigger className={`flex items-center justify-center ${className}`}>
        <DocumentButton
          height={30}
          width={35}
          className={`${iconStrokeColor ?? 'stroke-gray-700'}`}
        />
      </SheetTrigger>
      <SheetContent
        side='right'
        showCloseButton={false}
        className='h-full w-full border-none bg-white dark:bg-almost-black'
      >
        <SheetClose asChild>
          <CloseButton
            onClick={() => {
              setDisplayPdfModal(false);
            }}
            align='left'
            imageClassName='dark:fill-white'
            buttonClassName='p-4'
          />
        </SheetClose>
        <DynamicPDFDisplay data={data} />
      </SheetContent>
    </Sheet>
  );
};
