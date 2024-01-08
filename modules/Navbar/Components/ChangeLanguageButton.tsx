import { usePathname, useRouter } from '@/translations/navigation';
import { useCloseOnClickOutside } from '@modules/Shared/Hooks/useCloseOnClickOutside';
import Translate from '@public/Styles/Assets/Images/translate.svg';
import { useLocale, useTranslations } from 'next-intl';
import { FC, MouseEvent, useRef, useState } from 'react';

interface Props {
  dropdownPosition?:
    | 'left'
    | 'right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  onChangeLanguage?: () => void | Promise<void>;
  className?: string;
}

export const ChangeLanguageButton: FC<Props> = ({
  dropdownPosition = 'left',
  className,
  onChangeLanguage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navbar');

  const [displayLanguageDropdown, setDisplayLanguageDropdown] =
    useState<boolean>(false);
  const component: { current: null | HTMLDivElement } = useRef(null);

  useCloseOnClickOutside(component, () => setDisplayLanguageDropdown(false));

  const handleSelectLanguage = async (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    e.preventDefault();
    if (onChangeLanguage) {
      if (!target.dataset.locale) return;
      localStorage.setItem('locale', target.dataset.locale);
      await onChangeLanguage?.();
    }
    router.push(pathname, {
      locale: target.dataset.locale,
    });
  };

  const dropdownPositionProperty = {
    left: 'right-12',
    right: 'left-20',
    bottom: 'top-12',
    'bottom-left': 'top-12 right-0',
    'bottom-right': 'top-12 left-0',
  };

  const selectedLanguageClass = (language: string) => {
    const classNames =
      'w-full cursor-pointer px-6 py-1 hover:bg-gray-200 hover:dark:bg-gray-200 hover:dark:text-almost-black';
    if (locale === language) {
      return `${classNames} bg-gray-600 text-slight-gray hover:bg-gray-600 hover:text-slight-gray`;
    }
    return classNames;
  };

  return (
    <div
      ref={component}
      className={` ${
        displayLanguageDropdown ? 'bg-gray-100 dark:bg-almost-black-input' : ''
      } relative flex items-center justify-center ${className}`}
      onClick={() => setDisplayLanguageDropdown(!displayLanguageDropdown)}
    >
      <Translate height={30} width={35} />
      <div
        className={`absolute top-0 z-10 bg-white dark:bg-almost-black ${dropdownPositionProperty[dropdownPosition]}`}
        hidden={!displayLanguageDropdown}
      >
        <div className={`flex w-fit flex-col rounded-md border py-3`}>
          <button
            data-locale='en-US'
            className={`${selectedLanguageClass('en-US')}`}
            onClick={handleSelectLanguage}
          >
            {t('English')}
          </button>
          <button
            data-locale='hr'
            className={`${selectedLanguageClass('hr')}`}
            onClick={handleSelectLanguage}
          >
            {t('Croatian')}
          </button>
        </div>
      </div>
    </div>
  );
};
