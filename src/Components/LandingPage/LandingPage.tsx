import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import PagesImage from '../../Styles/Assets/Images/pages.svg';
import style from './LandingPage.module.scss';
import LandingPageScrollNavigation from './LandingPageScrollNavigation';
import LandingPageSections from './LandingPageSections';

/* type Props = {}; */

const LandingPage = (/* props: Props */) => {
  const { t } = useTranslation();
  const LandingHeader = () => {
    return (
      <div className='flex-col w-full'>
        <div className='flex justify-center items-center'>
          <header className='w-2/6 text-6xl font-bold text-blue-900 dark:text-white'>
            {t('pageName')}
          </header>
          <img src={PagesImage} alt='Page Logo' className='w-2/6' />
        </div>
        <div className='w-full text-center '>
          <NavLink to='/create' className={style.createYourCVLink}>
            {t('createYourCV')}
          </NavLink>
        </div>
      </div>
    );
  };

  const LandingPageInfoSection = () => {
    return (
      <>
        <div className='w-2/6 text-6xl text-blue-900 dark:text-white'>
          CV Generator
        </div>
        <img src={PagesImage} alt='Page Logo' className='w-2/6' />
      </>
    );
  };

  const landingPageSections: { (): React.ReactNode }[] = [
    LandingHeader,
    LandingPageInfoSection,
  ];

  return (
    <div className='overflow-y-hidden h-screen transition-colors dark:bg-neutral-700'>
      <LandingPageSections landingPageSections={landingPageSections} />
      <LandingPageScrollNavigation landingPageSections={landingPageSections} />
    </div>
  );
};

export default LandingPage;
