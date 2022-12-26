import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import useAnimation from '../../Hooks/useAnimation';
import Images from '../../Styles/Assets/Images/Images';
import style from './LandingPage.module.scss';
import LandingPageScrollNavigation from './LandingPageScrollNavigation';
import LandingPageSections from './LandingPageSections';

/* type Props = {}; */

const LandingPage = (/* props: Props */) => {
  const { t } = useTranslation('LandingPage');
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });

  const LandingHeader = () => {
    const componentRef = useRef(null);
    const inview = useInView(componentRef);

    return (
      <div
        ref={componentRef}
        className='flex justify-center items-center h-full p-5'
      >
        <div className='flex-col w-full'>
          <div className='flex justify-center items-center'>
            <motion.header
              initial={combinedStyleInitial}
              animate={inview ? combinedStyleFinal : combinedStyleInitial}
              transition={{ duration: 0.5 }}
              className='w-2/6 text-6xl text-center font-bold text-blue-900 dark:text-white'
            >
              {t('pageName')}
            </motion.header>
            <motion.img
              initial={combinedStyleInitial}
              animate={inview ? combinedStyleFinal : combinedStyleInitial}
              transition={{ duration: 0.5, delay: 0.5 }}
              src={Images.PagesImage}
              alt='Page Logo'
              className='w-2/6'
            />
          </div>
          <motion.div
            className='w-full text-center'
            initial={combinedStyleInitial}
            animate={inview ? combinedStyleFinal : combinedStyleInitial}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <NavLink to='/create' className={style.createYourCVLink}>
              {t('createYourCV')}
            </NavLink>
          </motion.div>
        </div>
      </div>
    );
  };

  const LandingPageInfoSection = () => {
    const componentRef = useRef(null);
    const inview = useInView(componentRef);
    return (
      <div
        ref={componentRef}
        className='flex justify-center items-center h-full p-5 bg-[#fbe5c4] dark:bg-[#c0ad8f]'
      >
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
    const componentRef = useRef(null);
    const inview = useInView(componentRef);
    return (
      <div
        ref={componentRef}
        className='flex justify-center items-center h-full p-5 bg-[#e6cfad] dark:bg-[#a08e72]'
      >
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

  const landingPageSections: React.FC[] = [
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
