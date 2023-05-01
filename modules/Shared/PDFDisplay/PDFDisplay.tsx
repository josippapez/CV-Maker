import { CVTemplate } from '@modules/PDFView/CVTemplates/CVTemplate';
import { usePDFComponentsAreHTML } from '@modules/PDFView/CVTemplates/Templates/Components';
import { PDFDownload } from '@modules/PDFView/PDFDownload/PDFDownload';
import { PDFData } from '@modules/PDFView/models';
import { useAuth } from '@modules/Providers';
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
    windowSize.height < windowSize.width
      ? (windowSize.height - 100) / 842
      : (windowSize.width - 50) / 595;

  return (
    <>
      <div
        className={`documentPDFView flex flex-col items-center justify-center overflow-hidden drop-shadow-xl ${
          windowSize.width < 1550 || isPDFPreview ? 'w-full' : 'w-5/12'
        }`}
        style={{
          height: 842 * scale,
        }}
      >
        <div
          className='document-display overflow-y-scroll'
          style={{
            width: 595,
            height: 842,
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
