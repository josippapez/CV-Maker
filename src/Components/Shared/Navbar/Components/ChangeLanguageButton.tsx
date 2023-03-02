import { useChangeLanguage } from '@/Components/Shared/Navbar/hooks';
import Translate from '@public/Styles/Assets/Images/translate.svg';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  dropdownPosition?: 'left' | 'right';
  onChangeLanguage?: () => void;
  className?: string;
  iconStrokeColor?: string;
}

const ChangeLanguageButton: FC<Props> = ({
  dropdownPosition = 'left',
  className,
  iconStrokeColor,
  onChangeLanguage,
}) => {
  const { t } = useTranslation('Navbar');
  const { changeLanguage } = useChangeLanguage();

  const [displayLanguageDropdown, setDisplayLanguageDropdown] =
    useState<boolean>(false);
  const component: { current: null | HTMLDivElement } = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        component.current &&
        !component.current.contains(event.target as Node)
      ) {
        setDisplayLanguageDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [component]);

  const handleSelectLanguage = useCallback(
    (language: string) => {
      changeLanguage(language, onChangeLanguage);
      setDisplayLanguageDropdown(false);
    },
    [changeLanguage]
  );

  return (
    <div
      ref={component}
      className={` ${
        displayLanguageDropdown ? 'bg-gray-100' : ''
      } relative flex items-center justify-center ${className}`}
      onClick={() => setDisplayLanguageDropdown(!displayLanguageDropdown)}
    >
      <Translate
        height={30}
        width={35}
        className={`${iconStrokeColor ?? 'stroke-gray-700'}`}
      />
      <div
        className={`absolute top-0 drop-shadow-md ${
          dropdownPosition === 'left' ? 'right-12' : 'left-20'
        }`}
        hidden={!displayLanguageDropdown}
      >
        <div
          className={`w-fit rounded-md bg-slate-300 p-3 text-zinc-900 dark:bg-slate-800 dark:text-zinc-100`}
        >
          <button
            className={`cursor-pointer rounded-md px-1 py-[2px] hover:bg-gray-400 hover:dark:bg-slate-600`}
            onClick={() => {
              handleSelectLanguage('en-US');
            }}
          >
            {t('English')}
          </button>
          <button
            className='cursor-pointer rounded-md px-1 py-[2px] hover:bg-gray-400 hover:dark:bg-slate-600'
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

export default ChangeLanguageButton;
