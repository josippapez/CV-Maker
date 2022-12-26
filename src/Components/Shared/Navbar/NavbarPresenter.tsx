import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TemplatesModal from '../../PDFView/CVTemplates/TemplatesModal';
import style from './NavbarPresenter.module.scss';
import { ReactComponent as Sun } from '../../../Styles/Assets/Images/sun.svg';
import { ReactComponent as Moon } from '../../../Styles/Assets/Images/moon.svg';

type Props = {
  darkTheme: { toggle(): void; enabled: boolean };
  pathname: string;
};

const NavbarPresenter = (props: Props) => {
  const { darkTheme, pathname } = props;
  const { t, i18n } = useTranslation('Navbar');

  const [displayLanguageDropdown, setDisplayLanguageDropdown] =
    useState<boolean>(false);
  const [displayTemplateChooseModal, setDisplayTemplateChooseModal] =
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
    <div className='sticky float-right right-2 top-2 w-fit transition-colors h-0 z-40'>
      <div className='relative flex-col'>
        <button
          className={`${style.darkModeButton} ${
            !darkTheme.enabled ? style.lightMode : style.darkMode
          } rounded-full shadow-md flex items-center transition-all`}
          type='button'
          onClick={darkTheme.toggle}
        >
          {darkTheme.enabled ? (
            <Sun className='w-8 h-8' fill='white' stroke='white' />
          ) : (
            <Moon className='w-8 h-8' />
          )}
        </button>
        <div ref={component} className='relative flex-row-reverse flex'>
          <div
            className={`${style.translateButton} ${
              !darkTheme.enabled ? style.lightMode : style.darkMode
            } mt-3 rounded-full shadow-md relative transition-all`}
            onClick={() => setDisplayLanguageDropdown(!displayLanguageDropdown)}

          />
          <div className='relative' hidden={!displayLanguageDropdown}>
            <div className='w-fit p-3 rounded-md shadow-md bg-slate-300 dark:bg-slate-800 text-zinc-900 dark:text-zinc-100 absolute top-3 right-2'>
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
        {pathname === '/create' && (
          <button
            className={`${style.templateModalButton} ${
              !darkTheme.enabled ? style.lightMode : style.darkMode
            } rounded-full shadow-md mt-3 transition-all`}
            type='button'
            onClick={() => setDisplayTemplateChooseModal(true)}
          />
        )}
        <TemplatesModal
          closeModal={() => setDisplayTemplateChooseModal(false)}
          show={displayTemplateChooseModal}
        />
      </div>
    </div>
  );
};

export default NavbarPresenter;
