import { useLocation } from 'react-router-dom';
import ChangeLanguageButton from './Components/ChangeLanguageButton';
import DarkModeButton from './Components/DarkModeButton';

const NavbarPresenter = () => {
  const {pathname} = useLocation();

  return (
    <div className='sticky float-right right-2 top-2 w-fit transition-colors h-0 z-40'>
      <div className='relative flex-col'>
        <DarkModeButton
          className='dark:bg-[#616161]
          bg-[#b8b8b8] rounded-full shadow-md
          mt-3 transition-all h-10 w-10 font-bold
          text-sm cursor-pointer select-none
          focus:outline-none focus:shadow-outline'
        />
        {pathname === '/' && (
          <ChangeLanguageButton
            iconStrokeColor={'dark:stroke-white stroke-black'}
            dropdownPosition='left'
            className='p-[5px] mt-3 h-10 w-10 font-bold rounded-full text-sm
            cursor-pointer select-none
            focus:outline-none focus:shadow-outline
            transition-all bg-[#b8b8b8] dark:bg-[#616161]'
          />
        )}
      </div>
    </div>
  );
};

export default NavbarPresenter;
