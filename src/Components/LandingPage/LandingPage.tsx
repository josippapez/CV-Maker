import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Images from '../../Styles/Assets/Images/Images';
import style from './LandingPage.module.scss';
import LandingPageScrollNavigation from './LandingPageScrollNavigation';
import LandingPageSections from './LandingPageSections';

/* type Props = {}; */

const LandingPage = (/* props: Props */) => {
  const { t } = useTranslation();
  const LandingHeader = () => {
    return (
      <div className='flex justify-center items-center h-full p-5'>
        <div className='flex-col w-full'>
          <div className='flex justify-center items-center'>
            <header className='w-2/6 text-6xl text-center font-bold text-blue-900 dark:text-white'>
              {t('pageName')}
            </header>
            <img src={Images.PagesImage} alt='Page Logo' className='w-2/6' />
          </div>
          <div className='w-full text-center'>
            <NavLink to='/create' className={style.createYourCVLink}>
              {t('createYourCV')}
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  const LandingPageInfoSection = () => {
    return (
      <div className='flex justify-center items-center h-full p-5 bg-[#fbe5c4] dark:bg-[#c0ad8f]'>
        <img
          src={Images.Desk}
          alt='Page Logo'
          className='w-3/5 m-5 rounded-lg shadow-lg'
        />
        <div className='w-2/6 text-xl text-blue-900 dark:text-white'>
          {t('createYourCVDescription')}
        </div>
      </div>
    );
  };

  const LandingPageTemplatesSection = () => {
    return (
      <div className='flex justify-center items-center h-full p-5 bg-[#e6cfad] dark:bg-[#a08e72]'>
        <div className='w-2/6 text-xl text-blue-900 dark:text-white'>
          {t('templatesDescription')}
        </div>
        <img
          src={Images.Notebook}
          alt='Page Logo'
          className='w-3/5 m-5 rounded-lg shadow-lg'
        />
      </div>
    );
  };

  const landingPageSections: { (): React.ReactNode }[] = [
    LandingHeader,
    LandingPageInfoSection,
    LandingPageTemplatesSection,
  ];

  return (
    <div className='overflow-y-hidden h-screen transition-colors bg-[#f0f0f0] dark:bg-[#3a3836]'>
      <LandingPageSections landingPageSections={landingPageSections} />
      <LandingPageScrollNavigation landingPageSections={landingPageSections} />
    </div>
  );
};

export default LandingPage;
