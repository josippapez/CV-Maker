import { CloseButton, Modal } from '@modules/Shared/Modal';
import { RoutesWithLocale } from 'consts/Routes';
import Logo from '@public/Styles/Assets/Images/logo.svg';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  showNavigation: boolean;
  setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarModal: FC<Props> = ({
  showNavigation,
  setShowNavigation,
}) => {
  const { t } = useTranslation('Navbar');

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
              href={RoutesWithLocale.LANDING_PAGE}
              className={`mobile w-full py-4 px-5 text-left text-3xl`}
            >
              {t('home')}
            </Link>
            <div className={navbarLinkDivider} />
            <Link
              shallow
              href={RoutesWithLocale.CREATE}
              className={`mobile w-full py-4 px-5 text-left text-3xl`}
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
