import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import style from './NavbarPresenter.module.scss';
type Props = {
  darkTheme: { toggle(): void; enabled: string | null };
};

const NavbarPresenter = (props: Props) => {
  const { darkTheme } = props;
  const { t, i18n } = useTranslation();
  return (
    <div className='absolute right-2 top-2 w-fit transition-colors px-4 py-2 z-100'>
      <button
        className={`${style.darkModeButton} ${
          darkTheme.enabled !== 'enabled' ? style.darkMode : style.lightMode
        } rounded-full shadow-md`}
        type='button'
        onClick={darkTheme.toggle}
      />
      {/* <NavLink
        to='/create'
        className='text-pink-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
      >
        Create
      </NavLink> */}
      {/* i18n change language dropdown */}
      <div className='relative'>
        <button
          className='block text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900'
          aria-haspopup='true'
          aria-expanded='false'
          onClick={() => {
            i18n.changeLanguage('eng');
          }}
        >
          Hrvatski
        </button>
      </div>
    </div>
  );
};

export default NavbarPresenter;
