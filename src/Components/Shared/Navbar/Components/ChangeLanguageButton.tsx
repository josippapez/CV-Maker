import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Translate } from '../../../../Styles/Assets/Images/translate.svg';

interface Props {
  dropdownPosition?: 'left' | 'right';
  className?: string;
  iconStrokeColor?: string;
}

const ChangeLanguageButton = (props: Props) => {
  const { dropdownPosition, className, iconStrokeColor } = props;
  const { t, i18n } = useTranslation('Navbar');

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
          className={`w-fit p-3 rounded-md bg-slate-300 dark:bg-slate-800 text-zinc-900 dark:text-zinc-100`}
        >
          <div
            className='cursor-pointer px-1 py-[2px] rounded-md hover:dark:bg-slate-600 hover:bg-gray-400'
            onClick={() => {
              i18n.changeLanguage('en-US');
              setDisplayLanguageDropdown(false);
            }}
          >
            {t('English')}
          </div>
          <div
            className='cursor-pointer px-1 py-[2px] rounded-md hover:dark:bg-slate-600 hover:bg-gray-400'
            onClick={() => {
              i18n.changeLanguage('hr');
              setDisplayLanguageDropdown(false);
            }}
          >
            {t('Croatian')}
          </div>
        </div>
      </div>
    </div>
  );
};

ChangeLanguageButton.defaultProps = {
  dropdownPosition: 'left',
};

export default ChangeLanguageButton;
