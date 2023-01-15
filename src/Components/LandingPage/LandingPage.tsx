import { motion, useInView } from 'framer-motion';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import useAnimation from '../../Hooks/useAnimation';
import Images from '../../Styles/Assets/Images/Images';
import style from './LandingPage.module.scss';
import LandingPageScrollNavigation from './LandingPageScrollNavigation';
import LandingPageSections from './LandingPageSections';

const LandingPage = () => {
  const { t } = useTranslation('LandingPage');
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const horizontalAnimation = useAnimation({
    amountX: 10,
  });

  const LandingHeader = forwardRef((props: any, ref: any) => {
    const inview = useInView(ref, {
      once: true,
      amount: 0.75,
    });

    return (
      <div ref={ref} className='flex justify-center items-center h-full'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-center items-center'>
            <motion.header
              initial={combinedStyleInitial}
              animate={inview ? combinedStyleFinal : combinedStyleInitial}
              transition={{ duration: 0.2 }}
              className='w-2/6 text-6xl text-center font-bold text-blue-900 dark:text-white'
            >
              {t('pageName')}
            </motion.header>
            <motion.img
              initial={combinedStyleInitial}
              animate={inview ? combinedStyleFinal : combinedStyleInitial}
              transition={{ duration: 0.2, delay: 0.1 }}
              src={Images.PagesImage}
              alt='Page Logo'
              className='w-2/6'
            />
          </div>
          <motion.div
            className='text-center'
            initial={combinedStyleInitial}
            animate={inview ? combinedStyleFinal : combinedStyleInitial}
            transition={{ duration: 0.2, delay: 0.7 }}
          >
            <NavLink to='/create' className={style.createYourCVLink}>
              {t('createYourCV')}
            </NavLink>
          </motion.div>
        </div>
      </div>
    );
  });
  LandingHeader.displayName = 'LandingHeader';

  const LandingPageInfoSection = forwardRef((props: any, ref: any) => {
    const inview = useInView(ref, {
      amount: 0.75,
    });

    return (
      <div
        ref={ref}
        className='flex justify-center items-center h-full bg-[#fbe5c4] dark:bg-[#c0ad8f]'
      >
        <motion.img
          src={Images.Desk}
          alt='Page Logo'
          className='w-3/5 m-5 rounded-lg shadow-lg'
          initial={horizontalAnimation.combinedStyleInitialReverse}
          animate={
            inview
              ? horizontalAnimation.combinedStyleFinal
              : horizontalAnimation.combinedStyleInitialReverse
          }
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className='w-2/6 text-xl text-blue-900 dark:text-white'
          initial={horizontalAnimation.combinedStyleInitial}
          animate={
            inview
              ? horizontalAnimation.combinedStyleFinal
              : horizontalAnimation.combinedStyleInitial
          }
          transition={{ duration: 0.2 }}
        >
          {t('createYourCVDescription')}
        </motion.div>
      </div>
    );
  });
  LandingPageInfoSection.displayName = 'LandingPageInfoSection';

  const LandingPageTemplatesSection = forwardRef((props: any, ref: any) => {
    const inview = useInView(ref, {
      amount: 0.75,
    });

    return (
      <div
        ref={ref}
        className='flex justify-center items-center h-full bg-[#e6cfad] dark:bg-[#a08e72]'
      >
        <motion.div
          className='w-2/6 text-xl text-blue-900 dark:text-white'
          initial={horizontalAnimation.combinedStyleInitialReverse}
          animate={
            inview
              ? horizontalAnimation.combinedStyleFinal
              : horizontalAnimation.combinedStyleInitialReverse
          }
          transition={{ duration: 0.2 }}
        >
          {t('templatesDescription')}
        </motion.div>
        <motion.img
          src={Images.Notebook}
          alt='Page Logo'
          className='w-3/5 m-5 rounded-lg shadow-lg'
          initial={horizontalAnimation.combinedStyleInitial}
          animate={
            inview
              ? horizontalAnimation.combinedStyleFinal
              : horizontalAnimation.combinedStyleInitial
          }
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  });
  LandingPageTemplatesSection.displayName = 'LandingPageTemplatesSection';

  const landingPageSections = [
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
