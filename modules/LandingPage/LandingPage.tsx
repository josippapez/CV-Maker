import {
  LandingPageScrollNavigation,
  LandingPageSections,
} from '@modules/LandingPage';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { RoutesWithLocale } from 'consts/Routes';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC, forwardRef } from 'react';
import style from './LandingPage.module.scss';

type Props = {
  routesWithLocale: typeof RoutesWithLocale;
};

export const LandingPage: FC<Props> = ({ routesWithLocale }) => {
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
      <div ref={ref} className='flex h-full items-center justify-center'>
        <div className='flex w-full flex-col'>
          <div className='flex items-center justify-center'>
            <motion.header
              initial={combinedStyleInitial}
              animate={inview ? combinedStyleFinal : combinedStyleInitial}
              transition={{ duration: 0.2 }}
              className='w-2/6 text-center text-6xl font-bold text-blue-900 dark:text-white'
            >
              {t('pageName')}
            </motion.header>
            <motion.img
              initial={combinedStyleInitial}
              animate={inview ? combinedStyleFinal : combinedStyleInitial}
              transition={{ duration: 0.2, delay: 0.1 }}
              src={'./Styles/Assets/Images/pages.svg'}
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
            <Link
              href={routesWithLocale.CREATE}
              className={style.createYourCVLink}
            >
              {t('createYourCV')}
            </Link>
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
        className='flex h-full items-center justify-center bg-[#fbe5c4] dark:bg-[#c0ad8f]'
      >
        <motion.img
          src={'./Styles/Assets/Images/Desk.jpg'}
          alt='Page Logo'
          className='m-5 w-3/5 rounded-lg shadow-lg'
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
        className='flex h-full items-center justify-center bg-[#e6cfad] dark:bg-[#a08e72]'
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
          src={'./Styles/Assets/Images/Notebook.jpg'}
          alt='Page Logo'
          className='m-5 w-3/5 rounded-lg shadow-lg'
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
    <div className='h-screen overflow-y-hidden bg-[#f0f0f0] transition-colors dark:bg-[#3a3836]'>
      <LandingPageSections landingPageSections={landingPageSections} />
      <LandingPageScrollNavigation landingPageSections={landingPageSections} />
    </div>
  );
};
