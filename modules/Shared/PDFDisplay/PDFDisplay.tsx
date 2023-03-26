import { saveDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch } from '@/store/hooks';
import { CVTemplate } from '@modules/PDFView/CVTemplates/CVTemplate';
import { PDFDownload } from '@modules/PDFView/PDFDownload/PDFDownload';
import { useAuth } from '@modules/Providers';
import { useDebouncedFunction } from '@modules/Shared/Hooks';
import { useDebouncedValue } from '@modules/Shared/Hooks/useDebouncedValue';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { Tooltip } from '@modules/Shared/Tooltip';
import { FC, useEffect, useState } from 'react';

export const PDFDisplay: FC = () => {
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
  } = usePDFData();
  const [displayDownloadModal, setDisplayDownloadModal] = useState(false);
  const [initial, setInitial] = useDebouncedValue(true, 2000);

  const userIsLoggedIn = !!user?.uid;
  const Template = () =>
    CVTemplate({
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      skills,
      template,
      projects,
    });

  const [saveData] = useDebouncedFunction(() => {
    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, 600);

  useEffect(() => {
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
    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, [template]);

  const scale =
    windowSize.height < windowSize.width
      ? windowSize.height / 842
      : windowSize.width / 595;

  return (
    <>
      <div
        className={`documentPDFView flex h-full flex-col items-center justify-center overflow-hidden drop-shadow-xl transition-colors dark:bg-neutral-700 ${
          windowSize.width < 1550 ? 'w-full' : 'w-5/12'
        }`}
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
          {!displayDownloadModal && <Template />}
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
        PdfInstance={Template}
        show={displayDownloadModal}
        closeModal={() => setDisplayDownloadModal(false)}
      />
    </>
  );
};
