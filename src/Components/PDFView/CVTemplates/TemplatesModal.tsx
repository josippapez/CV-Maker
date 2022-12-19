import { useTranslation } from 'react-i18next';
import useMobileView from '../../../Hooks/useMobileView';
import { useAppDispatch } from '../../../store/hooks';
import { setTemplate, TemplateName } from '../../../store/reducers/template';
import Modal from '../../Shared/Modal/Modal';
import style from './TemplatesModal.module.scss';

type Props = {
  closeModal(): void;
  show: boolean;
};

const TemplatesModal = (props: Props) => {
  const isMobileView = useMobileView();
  const { closeModal, show } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <Modal
      show={show}
      position='right'
      animation='slide-right'
      height='screen'
      zindex={100}
      width={isMobileView ? '100%' : '50rem'}
      closeModal={closeModal}
    >
      <div className='h-full bg-gray-300 dark:bg-zinc-900 p-5 flex-col relative'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold dark:text-white'>
            {t('chooseYourTemplate')}
          </h1>
          <button
            className='font-bold absolute top-1 right-3 hover:bg-gray-500 hover:text-white rounded-full dark:text-white'
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
          {Object.entries(TemplateName).map(value => {
            const templateName = value[1];
            return (
              <div
                key={templateName}
                className={`${style.template} ${
                  style[value[0]]
                } bg-white dark:bg-gray-800 rounded-md`}
                onClick={() => {
                  dispatch(setTemplate(templateName));
                  closeModal();
                }}
              >
                <div className={`${style.templateImage} ${style[value[0]]}`} />
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
