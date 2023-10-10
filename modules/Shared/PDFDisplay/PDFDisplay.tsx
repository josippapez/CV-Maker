import { CVTemplate } from '@modules/PDFView/CVTemplates/CVTemplate';
import { usePDFComponentsAreHTML } from '@rawwee/react-pdf-html';
import { PDFDownload } from '@modules/PDFView/PDFDownload/PDFDownload';
import { PDFData } from '@modules/PDFView/models';
import { useAuth } from '@modules/Providers/AuthProvider';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { Tooltip } from '@modules/Shared/Tooltip';
import { FC, useCallback, useState } from 'react';

type Props = {
  isPDFPreview?: boolean;
  data: PDFData;
};

export const PDFDisplay: FC<Props> = ({ isPDFPreview = false, data }) => {
  const windowSize = useWindowSize();
  const { user } = useAuth();
  const [displayDownloadModal, setDisplayDownloadModal] = useState(false);
  const { isHTML } = usePDFComponentsAreHTML();

  const userIsLoggedIn = !!user?.uid;
  const TemplateNotHtml = useCallback(() => CVTemplate(data), [isHTML, data]);
  const Template = () => CVTemplate(data);

  const scale =
    windowSize.width * 1.414213562 < windowSize.height
      ? (windowSize.width - 80) / 595
      : (windowSize.height - 80) / 842;

  if (!data) return null;

  return (
    <>
      <div
        className={`documentPDFView flex flex-col items-center justify-center overflow-hidden drop-shadow-xl ${
          windowSize.width < 1550 || isPDFPreview ? 'h-full w-full' : 'w-5/12'
        }`}
      >
        <div
          className='document-display overflow-y-scroll'
          style={{
            width: 595,
            height: 842,
            aspectRatio: 1.414213562,
            transform: `scaleX(${scale}) scaleY(
                ${scale}
              )`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Template />
        </div>

        <div className='document-controls'>
          <button
            className='pdf-download'
            onClick={() => setDisplayDownloadModal(true)}
          />
          {userIsLoggedIn && (
            <Tooltip
              tooltipText={'Copied link to clipboard'}
              position='top'
              showOnClick
              showOnHover={false}
            >
              <button
                className='pdf-share'
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/cv/${user?.uid}`
                  );
                }}
              />
            </Tooltip>
          )}
        </div>
      </div>

      <PDFDownload
        PdfInstance={TemplateNotHtml}
        show={displayDownloadModal}
        closeModal={() => setDisplayDownloadModal(false)}
      />
    </>
  );
};
