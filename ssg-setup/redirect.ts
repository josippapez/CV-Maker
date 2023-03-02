import { useRouter } from 'next/router';
import { useEffect } from 'react';
import lngDetector from 'ssg-setup/lngDetector';

export const useRedirect = (to?: string) => {
  const router = useRouter();
  let routeTo = router.asPath;
  if (typeof to === 'string') routeTo = to;

  // language detection
  useEffect(() => {
    const detectedLng = lngDetector.detect([
      'querystring',
      'localStorage',
      'htmlTag',
    ]);
    if (!detectedLng) return;

    if (routeTo.startsWith('/' + detectedLng) && router.route === '/404') {
      router.replace('/' + detectedLng + router.route);
      return;
    }

    lngDetector.cache?.(detectedLng);
    router.replace('/' + detectedLng + routeTo);
  }, [routeTo, router]);

  return null;
};

export const Redirect = () => {
  useRedirect();
};

export const getRedirect = (to?: string) => () => {
  useRedirect(to);
};
