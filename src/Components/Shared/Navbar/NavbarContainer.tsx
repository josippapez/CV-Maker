import { useLocation } from 'react-router-dom';
import useDarkMode from '../../../Hooks/useDarkMode';
import NavbarPresenter from './NavbarPresenter';

const NavbarContainer = () => {
  const darkTheme = useDarkMode();
  const location = useLocation();
  return <NavbarPresenter darkTheme={darkTheme} pathname={location.pathname} />;
};

export default NavbarContainer;
