import { CloseButton } from '@modules/Shared/Modal/Components';
import { Modal } from '@modules/Shared/Modal/Modal';
import Logo from '@public/Styles/Assets/Images/logo.svg';
import { Routes } from 'consts/Routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  showNavigation: boolean;
  setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarModal: FC<Props> = ({
  showNavigation,
  setShowNavigation,
}) => {
  const t = useTranslations('Navbar');

  const navbarLinkDivider = 'h-[1px] w-full bg-gray-200';
  return (
    <Modal
      animation='slide-left'
      height='100%'
      width='100%'
      show={showNavigation}
      contentClassname='text-almost-black'
      closeModal={() => setShowNavigation(false)}
    >
      <div className='flex h-full flex-col justify-between bg-white p-5'>
        <div className='flex flex-col gap-14'>
          <CloseButton
            width={28}
            height={28}
            color='#9D9DAF'
            onClick={() => setShowNavigation(false)}
          />
          <div className='flex flex-col'>
            <Link
              shallow
              href={Routes.LANDING_PAGE}
              className={`mobile w-full px-5 py-4 text-left text-3xl`}
            >
              {t('home')}
            </Link>
            <div className={navbarLinkDivider} />
            <Link
              shallow
              href={Routes.CREATE}
              className={`mobile w-full px-5 py-4 text-left text-3xl`}
            >
              {t('create')}
            </Link>
            <div className={navbarLinkDivider} />
          </div>
        </div>
        <Logo />
      </div>
    </Modal>
  );
};
