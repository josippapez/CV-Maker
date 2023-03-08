import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    opera: any;
  }
}

export const useMobileView = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const [isMobileView, setIsMobileView] = useState(
    userAgent.includes('Mobile') || window.innerWidth <= 768
  );

  const handleResize = useCallback(() => {
    setIsMobileView(userAgent.includes('Mobile') || window.innerWidth <= 768);
  }, [userAgent]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobileView;
};
