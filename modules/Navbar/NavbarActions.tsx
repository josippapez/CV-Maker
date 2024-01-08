'use client';

import { usePathname } from '@/translations/navigation';
import { ChangeLanguageButton } from '@modules/Navbar/Components/ChangeLanguageButton';
import { DarkModeButton } from '@modules/Navbar/Components/DarkModeButton';
import { NavbarModal } from '@modules/Navbar/Components/NavbarModal';
import { Routes } from 'consts/Routes';
import Image from 'next/image';
import { useState } from 'react';

export const NavbarActions: React.FC = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button className={'md:hidden'} onClick={() => setShowNavigation(true)}>
        <Image
          alt='Menu'
          src={'/Styles/Assets/Images/HamburgerMenu.svg'}
          height={28}
          width={28}
        />
      </button>
      <NavbarModal
        setShowNavigation={setShowNavigation}
        showNavigation={showNavigation}
      />
      <div className='relative flex gap-8'>
        <DarkModeButton className='cursor-pointer select-none' />
        {pathname === Routes.CREATE && (
          <ChangeLanguageButton
            dropdownPosition='bottom-left'
            className='cursor-pointer select-none rounded-full text-sm font-bold transition-all'
          />
        )}
      </div>
    </>
  );
};
