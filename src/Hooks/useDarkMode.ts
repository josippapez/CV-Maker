import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    theme === 'dark' ? bodyClass.add(className) : bodyClass.remove(className);
  }, [theme]);

  return {
    theme,
    toggle: () => {
      if (theme === 'light') {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        setTheme('light');
        localStorage.setItem('theme', 'light');
      }
    },
  };
};

export default useDarkMode;
