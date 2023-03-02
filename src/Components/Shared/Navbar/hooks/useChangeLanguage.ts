import { saveDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch } from '@/store/hooks';
import { Settings } from 'luxon';
import { i18n } from 'next-i18next';
import { useRouter } from 'next/router';

export const useChangeLanguage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const navigateToSameRoute = (language: string) => {
    const routeComponents = router.asPath.split('/');
    if (routeComponents.length === 2) {
      router.push(`/${language}`);
    } else {
      const newRoute = `/${language}/${routeComponents.slice(2).join('/')}`;
      router.push(newRoute);
    }
  };

  const changeLanguage = async (language: string) => {
    await i18n?.changeLanguage(language).then(async () => {
      await dispatch(saveDataForUser());
      localStorage.setItem('i18nextLng', language);
      Settings.defaultLocale = language;
    });
    navigateToSameRoute(language);
  };

  return { changeLanguage };
};
