import { saveDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cacheAllData, setModified } from '@/store/reducers/pdfData';
import { setTemplate } from '@/store/reducers/template';
import { setDisplayVersionHistory } from '@/store/reducers/versionHistory';
import { useChangeLanguage } from '@modules/Navbar';
import { Modal } from '@modules/Shared/Modal';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect } from 'react';

export const VersionHistoryModal: FC = () => {
  const dispatch = useAppDispatch();
  const { changeLanguage } = useChangeLanguage();
  const { t } = useTranslation('VersionHistoryModal');
  const { displayVersionHistory, tempPdfData } = useAppSelector(
    state => state.versionHistory
  );

  useEffect(() => {
    if (!tempPdfData) {
      dispatch(
        setDisplayVersionHistory({
          displayVersionHistory: false,
        })
      );
    }
  }, []);

  const closeModal = useCallback(() => {
    dispatch(
      setDisplayVersionHistory({
        displayVersionHistory: false,
      })
    );
    dispatch(setModified(false));
    localStorage.setItem('preventVersionHistory', 'true');
  }, []);

  return (
    <Modal
      show={
        displayVersionHistory && !localStorage.getItem('preventVersionHistory')
      }
      width='45rem'
    >
      <div className='rounded-md bg-white px-8 py-6 tracking-wide text-almost-black'>
        <p>{t('conflict')}</p>
        <p className='mt-2 font-semibold'>{t('conflict-local')}</p>
        <p className='mt-2 font-semibold'>{t('conflict-cloud')}</p>
        <div className='mt-7 flex justify-around'>
          <button
            className='rounded-md bg-blue-200 px-3 py-2 hover:bg-blue-300'
            onClick={() => {
              dispatch(saveDataForUser());
              closeModal();
            }}
          >
            <p>{t('conflict_keep_local')}</p>
          </button>
          <button
            className='rounded-md bg-green-200 px-3 py-2 hover:bg-green-300'
            onClick={async () => {
              if (!tempPdfData) return;
              await changeLanguage(tempPdfData.language);
              dispatch(cacheAllData(tempPdfData));
              dispatch(setTemplate(tempPdfData.template.templateName));
              closeModal();
            }}
          >
            <p>{t('conflict_keep_cloud')}</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};
