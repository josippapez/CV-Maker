import { useTranslation } from 'react-i18next';
import Modal from '../../Shared/Modal/Modal';
import Carousel from './Carousel';

type Props = {
  closeModal(): void;
  show: boolean;
};

const TemplatesModal = (props: Props) => {
  const { closeModal, show } = props;
  const { t } = useTranslation('CVTemplates');
  return (
    <Modal
      show={show}
      animation='fade'
      position='center'
      height='screen'
      width='screen'
      zindex={100}
      closeModal={closeModal}
    >
      <div className='relative flex-col bg-[#000000e8] p-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-white'>
            {t('chooseYourTemplate')}
          </h1>
          <button
            className='absolute top-1 right-3 rounded-full font-bold hover:bg-gray-500 hover:text-white dark:text-white'
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
        <Carousel closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default TemplatesModal;
