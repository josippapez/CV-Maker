import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { usePathname } from '@/translations/navigation';
import { CloseButton } from '@modules/Shared/Modal/Components';
import Logo from '@public/Styles/Assets/Images/logo.svg';
import { Routes } from 'consts/Routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC, useEffect } from 'react';

type Props = {
  showNavigation: boolean;
  setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarModal: FC<Props> = ({
  showNavigation,
  setShowNavigation,
}) => {
  const pathname = usePathname();
  const t = useTranslations('Navbar');

  const navbarLinkDivider = 'h-[1px] w-full bg-gray-200';

  useEffect(() => {
    setShowNavigation(false);
  }, [pathname, setShowNavigation]);

  return (
    <Sheet open={showNavigation} onOpenChange={setShowNavigation}>
      <SheetContent
        side='left'
        showCloseButton={false}
        className='h-full w-full text-black'
      >
        <div className='flex h-full flex-col justify-between bg-white p-5'>
          <div className='flex flex-col gap-14'>
            <SheetClose asChild>
              <CloseButton
                width={28}
                height={28}
                color='#9D9DAF'
                onClick={() => setShowNavigation(false)}
              />
            </SheetClose>
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
      </SheetContent>
    </Sheet>
  );
};
