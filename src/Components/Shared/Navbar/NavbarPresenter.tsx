import { NavLink } from 'react-router-dom';

type Props = {
  darkTheme: { toggle(): void; enabled: string | null };
};

const NavbarPresenter = (props: Props) => {
  const { darkTheme } = props;
  return (
    <div className='w-full transition-colors px-4 py-2 z-10 shadow-md dark:drop-shadow-md dark:bg-gray-700/95'>
      <button
        className='text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={darkTheme.toggle}
      >
        Toggle
      </button>
      <NavLink
        to='/create'
        className='text-pink-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
      >
        Create
      </NavLink>
    </div>
  );
};

export default NavbarPresenter;
