import useDarkMode from '../../../../Hooks/useDarkMode';
import MoonIcon from '@public/Styles/Assets/Images/moon.svg';
import SunIcon from '@public/Styles/Assets/Images/sun.svg';

type Props = {
  className?: string;
};

const DarkModeButton = (props: Props) => {
  const { className } = props;

  const darkTheme = useDarkMode();

  return (
    <button
      className={`${className} flex items-center justify-center`}
      type='button'
      onClick={darkTheme.toggle}
    >
      {darkTheme.enabled ? (
        <SunIcon className='h-8 w-8' fill='white' stroke='white' />
      ) : (
        <MoonIcon className='h-8 w-8' />
      )}
    </button>
  );
};

export default DarkModeButton;
