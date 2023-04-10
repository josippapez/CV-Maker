import { useChangeLanguage } from '@modules/Navbar/hooks';
import { useCloseOnClickOutside } from '@modules/Shared/Hooks/useCloseOnClickOutside';
import Translate from '@public/Styles/Assets/Images/translate.svg';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useRef, useState } from 'react';

interface Props {
  dropdownPosition?:
    | 'left'
    | 'right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  onChangeLanguage?: () => void;
  className?: string;
}

export const ChangeLanguageButton: FC<Props> = ({
  dropdownPosition = 'left',
  className,
  onChangeLanguage,
}) => {
  const { t, i18n } = useTranslation('Navbar');
  const { changeLanguage } = useChangeLanguage();

  const [displayLanguageDropdown, setDisplayLanguageDropdown] =
    useState<boolean>(false);
  const component: { current: null | HTMLDivElement } = useRef(null);

  useCloseOnClickOutside(component, () => setDisplayLanguageDropdown(false));

  const handleSelectLanguage = useCallback(
    (language: string) => {
      changeLanguage(language, onChangeLanguage);
      setDisplayLanguageDropdown(false);
    },
    [changeLanguage]
  );

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
    if (i18n.language === language) {
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
        <div className={`w-fit rounded-md border py-3`}>
          <button
            className={`${selectedLanguageClass('en-US')}`}
            onClick={() => {
              handleSelectLanguage('en-US');
            }}
          >
            {t('English')}
          </button>
          <button
            className={`${selectedLanguageClass('hr')}`}
            onClick={() => {
              handleSelectLanguage('hr');
            }}
          >
            {t('Croatian')}
          </button>
        </div>
      </div>
    </div>
  );
};
