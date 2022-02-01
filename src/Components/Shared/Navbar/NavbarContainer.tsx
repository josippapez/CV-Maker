import useDarkMode from '../../../Hooks/useDarkMode';
import NavbarPresenter from './NavbarPresenter';

const NavbarContainer = () => {
  const darkTheme = useDarkMode();
  return <NavbarPresenter darkTheme={darkTheme} />;
};

export default NavbarContainer;
