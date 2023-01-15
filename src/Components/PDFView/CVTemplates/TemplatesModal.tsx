import { useTranslation } from 'react-i18next';
import Modal from '../../Shared/Modal/Modal';
import Carousell from './Carousell';

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
      <div className='bg-[#000000dc] p-5 flex-col relative'>
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
        <Carousell closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default TemplatesModal;
