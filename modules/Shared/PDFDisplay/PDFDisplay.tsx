import { saveDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch } from '@/store/hooks';
import { CVTemplate } from '@modules/PDFView/CVTemplates/CVTemplate';
import { usePDFComponentsAreHTML } from '@modules/PDFView/CVTemplates/Templates/Components';
import { PDFDownload } from '@modules/PDFView/PDFDownload/PDFDownload';
import { useAuth } from '@modules/Providers';
import { useDebouncedFunction } from '@modules/Shared/Hooks';
import { useDebouncedValue } from '@modules/Shared/Hooks/useDebouncedValue';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { Tooltip } from '@modules/Shared/Tooltip';
import { FC, useCallback, useEffect, useState } from 'react';

type Props = {
  isPDFPreview?: boolean;
};

export const PDFDisplay: FC<Props> = ({ isPDFPreview }) => {
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();
  const { user } = useAuth();
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    template,
    projects,
    previewData,
  } = usePDFData();
  const [displayDownloadModal, setDisplayDownloadModal] = useState(false);
  const [initial, setInitial] = useDebouncedValue(true, 2000);
  const { isHTML } = usePDFComponentsAreHTML();

  const userIsLoggedIn = !!user?.uid;
  const data = isPDFPreview
    ? {
        generalInfo: previewData?.generalInfo,
        professionalExperience: previewData?.professionalExperience,
        certificates: previewData?.certificates,
        education: previewData?.education,
        languages: previewData?.languages,
        skills: previewData?.skills,
        template: { templateName: previewData?.template },
        projects: previewData?.projects,
      }
    : {
        generalInfo,
        professionalExperience,
        certificates,
        education,
        languages,
        skills,
        template,
        projects,
      };
  const TemplateNotHtml = useCallback(() => CVTemplate(data), [isHTML, data]);
  const Template = () => CVTemplate(data);

  const [saveData] = useDebouncedFunction(() => {
    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, 600);

  useEffect(() => {
    if (isPDFPreview) return;
    saveData();
  }, [
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    projects,
  ]);

  useEffect(() => {
    if (isPDFPreview) return;
    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, [template]);

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
