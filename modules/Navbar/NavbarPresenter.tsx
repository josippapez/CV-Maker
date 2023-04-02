import {
  ChangeLanguageButton,
  DarkModeButton,
} from '@modules/Navbar/Components';
import { useWindowSize } from '@modules/Shared/Hooks';
import Logo from '@public/Styles/Assets/Images/logo.svg';
import { RoutesWithLocale } from 'consts/Routes';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

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
  const windowSize = useWindowSize(50);
  const { asPath } = useRouter();
  const [showNavigation, setShowNavigation] = useState(false);

  return windowSize.width > 800 ? (
    <div className='page-container desktop_col-28'>
      <div className='flex w-full justify-between py-6'>
        <nav className='flex gap-20'>
          <Link href={routesWithLocale?.LANDING_PAGE}>
            <Logo />
          </Link>
          <nav className='flex items-center justify-center gap-5'>
            <Link href={routesWithLocale?.LANDING_PAGE}>{t('home')}</Link>
            <Link href={routesWithLocale?.CREATE}>{t('create')}</Link>
          </nav>
        </nav>
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
    </div>
  ) : (
    <div className='page-container py-5'>
      <div className='flex items-center justify-between'>
        <button onClick={() => setShowNavigation(true)}>
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

        <DynamicModal
          setShowNavigation={setShowNavigation}
          showNavigation={showNavigation}
        />
      </div>
    </div>
  );
};
