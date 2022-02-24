import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks';
import { setTemplate, TemplateName } from '../../../store/reducers/template';
import Modal from '../../Shared/Modal/Modal';
import style from './TemplatesModal.module.scss';

type Props = {
  closeModal(): void;
  show: boolean;
};

const TemplatesModal = (props: Props) => {
  const { closeModal, show } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <Modal
      show={show}
      position='right'
      height={'screen'}
      width={'33%'}
      closeModal={closeModal}
    >
      <div className='h-full bg-gray-300 dark:bg-gray-600 p-5 flex-col relative'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold dark:text-white'>
            {t('chooseYourTemplate')}
          </h1>
          <button
            className='font-bold absolute top-1 right-3 hover:bg-gray-500 hover:text-white rounded-full'
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
        <div className='flex justify-center items-center'>
          {Object.keys(TemplateName).map(key => {
            const templateName = key as TemplateName;
            return (
              <div
                key={templateName}
                className={`${style.template} ${style[templateName]} bg-white dark:bg-gray-800 rounded-md`}
                onClick={() => {
                  dispatch(setTemplate(templateName));
                  closeModal();
                }}
              >
                <div
                  className={`${style.templateImage} ${style[templateName]}`}
                />
                <div className={`${style.templateName} dark:text-white`}>
                  {t(templateName)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default TemplatesModal;
