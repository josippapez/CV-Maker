import {
  ChangeLanguageButton,
  DarkModeButton,
} from '@modules/Navbar/Components';
import Logo from '@public/Styles/Assets/Images/logo.svg';
import { RoutesWithLocale } from 'consts/Routes';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styles from './NavbarPresenter.module.scss';

type Props = {
  routesWithLocale?: typeof RoutesWithLocale;
};

const DynamicModal = dynamic(
  () =>
    import('@modules/Navbar/Components/NavbarModal').then(
      mod => mod.NavbarModal
    ),
  {
    ssr: false,
  }
);

export const NavbarPresenter: FC<Props> = ({
  routesWithLocale = RoutesWithLocale,
}) => {
  const { t } = useTranslation('Navbar');
  const { asPath } = useRouter();
  const [showNavigation, setShowNavigation] = useState(false);

  return (
    <div className='page-container desktop_col-28 mobile_col-16'>
      <div className='flex w-full justify-between py-6'>
        <nav className={`${styles['desktop-navigation-menu']} flex gap-20`}>
          <Link href={routesWithLocale?.LANDING_PAGE}>
            <Logo />
          </Link>
          <nav className='flex items-center justify-center gap-5'>
            <Link href={routesWithLocale?.LANDING_PAGE}>{t('home')}</Link>
            <Link href={routesWithLocale?.CREATE}>{t('create')}</Link>
          </nav>
        </nav>
        <button
          className={styles['mobile-navigation-menu']}
          onClick={() => setShowNavigation(true)}
        >
          <Image
            alt='Menu'
            src={'/Styles/Assets/Images/HamburgerMenu.svg'}
            height={28}
            width={28}
          />
        </button>
        <div className='relative flex gap-8'>
          <DarkModeButton className='cursor-pointer select-none' />
          {asPath === routesWithLocale?.LANDING_PAGE && (
            <ChangeLanguageButton
              dropdownPosition='bottom-left'
              className='cursor-pointer select-none rounded-full text-sm font-bold transition-all'
            />
          )}
        </div>
      </div>
      <DynamicModal
        setShowNavigation={setShowNavigation}
        showNavigation={showNavigation}
      />
    </div>
  );
};
