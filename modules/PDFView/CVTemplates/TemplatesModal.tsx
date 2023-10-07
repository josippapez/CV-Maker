import { Carousel } from '@modules/PDFView/CVTemplates/Carousel';
import { Modal } from '@modules/Shared/Modal/Modal';
import { useTranslations } from 'next-intl';

type Props = {
  closeModal(): void;
  show: boolean;
};

export const TemplatesModal = (props: Props) => {
  const { closeModal, show } = props;
  const t = useTranslations('Templates');
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
      <div className='relative min-h-screen flex-col bg-[#000000e8] p-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-white'>
            {t('chooseYourTemplate')}
          </h1>
          <button
            className='absolute right-3 top-1 rounded-full text-4xl font-bold text-white'
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
