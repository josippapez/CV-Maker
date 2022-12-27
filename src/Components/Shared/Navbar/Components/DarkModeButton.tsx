import useDarkMode from '../../../../Hooks/useDarkMode';
import { ReactComponent as MoonIcon } from '../../../../Styles/Assets/Images/moon.svg';
import { ReactComponent as SunIcon } from '../../../../Styles/Assets/Images/sun.svg';

type Props = {
  className?: string;
};

const DarkModeButton = (props: Props) => {
  const { className } = props;

  const darkTheme = useDarkMode();

  return (
    <button className={`${className} flex justify-center items-center`} type='button' onClick={darkTheme.toggle}>
      {darkTheme.enabled ? (
        <SunIcon className='w-8 h-8' fill='white' stroke='white' />
      ) : (
        <MoonIcon className='w-8 h-8' />
      )}
    </button>
  );
};

export default DarkModeButton;
