import { useRouter } from 'next/router';
import ChangeLanguageButton from './Components/ChangeLanguageButton';
import DarkModeButton from './Components/DarkModeButton';

const NavbarPresenter = () => {
  const { asPath } = useRouter();

  return (
    <div className='sticky right-2 top-2 z-40 float-right h-0 w-fit transition-colors'>
      <div className='relative flex-col'>
        <DarkModeButton
          className='focus:shadow-outline
          mt-3 h-10 w-10
          cursor-pointer select-none rounded-full bg-[#b8b8b8] text-sm
          font-bold shadow-md transition-all
          focus:outline-none dark:bg-[#616161]'
        />
        {asPath === '/' && (
          <ChangeLanguageButton
            iconStrokeColor={'dark:stroke-white stroke-black'}
            dropdownPosition='left'
            className='focus:shadow-outline mt-3 h-10 w-10 cursor-pointer select-none rounded-full
            bg-[#b8b8b8] p-[5px]
            text-sm font-bold
            transition-all focus:outline-none dark:bg-[#616161]'
          />
        )}
      </div>
    </div>
  );
};

export default NavbarPresenter;
