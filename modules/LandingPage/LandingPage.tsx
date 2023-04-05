import { LandingPageSection } from '@modules/LandingPage/LandingPageSection';
import {
  BlobBottomLeft,
  BlobBottomRight,
  BlobTopLeft,
  BlobTopRight,
  LayeredWaves,
} from '@modules/PDFView/CVTemplates/Images';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import Google from '@public/Styles/Assets/Images/google.svg';
import { RoutesWithLocale, useRoutesWithLocale } from 'consts/Routes';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { FC, useRef } from 'react';
import styles from './LandingPage.module.scss';

import Link from 'next/link';

type Props = {
  routesWithLocale: typeof RoutesWithLocale;
};

export const LandingPage: FC<Props> = () => {
  const { t } = useTranslation('LandingPage');
  const container = useRef(null);
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const horizontalAnimation = useAnimation({
    amountX: 10,
  });
  const horizontalAnimationMinus = useAnimation({
    amountX: -10,
  });

  return (
    <div
      ref={container}
      className='page-container desktop_col-32 mobile_col-16 gap-y-20 drop-shadow-md'
    >
      <LandingPageSection sectionClass='min-h-[calc(100vh_-_81px)]'>
        {isInView => (
          <div className='flex items-center gap-5'>
            <div className='flex flex-col gap-5'>
              <motion.p
                initial={combinedStyleInitial}
                animate={isInView ? combinedStyleFinal : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='text-left text-3xl font-semibold'
              >
                {t('welcome')}
              </motion.p>
              <motion.p
                initial={combinedStyleInitial}
                animate={isInView ? combinedStyleFinal : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='text-left text-xl'
              >
                {t('welcomeDescription')}
              </motion.p>
            </div>
            <motion.img
              initial={horizontalAnimation.combinedStyleInitial}
              animate={
                isInView
                  ? horizontalAnimation.combinedStyleFinal
                  : { opacity: 0 }
              }
              transition={{ duration: 0.2, delay: 0.1 }}
              src={'./Styles/Assets/Images/Template4.png'}
              width={'45%'}
              alt='Template4'
            />
          </div>
        )}
      </LandingPageSection>

      <LandingPageSection sectionClass='full-bleed overflow-visible'>
        <div className='absolute flex w-full flex-col items-end'>
          <BlobBottomRight height={180} />
          <BlobTopRight height={180} />
        </div>
      </LandingPageSection>

      <LandingPageSection sectionClass={`min-h-[calc(100vh_-_81px)]`}>
        {isInView => (
          <div className='flex items-center gap-5'>
            <motion.img
              initial={horizontalAnimationMinus.combinedStyleInitial}
              animate={
                isInView
                  ? horizontalAnimationMinus.combinedStyleFinal
                  : {
                      opacity: 0,
                    }
              }
              transition={{ duration: 0.2 }}
              src={'./Styles/Assets/Images/Template3.png'}
              width={'45%'}
              alt='Template3'
            />
            <motion.p
              initial={combinedStyleInitial}
              animate={
                isInView
                  ? combinedStyleFinal
                  : {
                      opacity: 0,
                    }
              }
              transition={{ duration: 0.2, delay: 0.1 }}
              className='text-left text-lg'
            >
              {t('offerDescription')}
            </motion.p>
          </div>
        )}
      </LandingPageSection>

      <LandingPageSection sectionClass='full-bleed overflow-visible'>
        <div className='absolute flex w-full flex-col items-start'>
          <BlobBottomLeft height={180} />
          <BlobTopLeft height={180} />
        </div>
      </LandingPageSection>

      <LandingPageSection
        sectionClass={`desktop_col-24 mobile_col-12 min-h-[50vh] justify-center`}
      >
        {isInView => (
          <div className='flex flex-col items-center gap-5'>
            <motion.div
              className='flex w-fit items-center justify-center'
              initial={combinedStyleInitial}
              animate={
                isInView
                  ? combinedStyleFinal
                  : {
                      opacity: 0,
                    }
              }
              transition={{ duration: 0.2 }}
            >
              <Google height={'50%'} width={'100%'} />
            </motion.div>
            <motion.p
              initial={combinedStyleInitial}
              animate={
                isInView
                  ? combinedStyleFinal
                  : {
                      opacity: 0,
                    }
              }
              transition={{ duration: 0.2, delay: 0.1 }}
              className='text-left text-lg'
            >
              {t('integrationDescription')}
            </motion.p>
          </div>
        )}
      </LandingPageSection>

      <LandingPageSection>
        {isInView => (
          <div className='flex min-h-[20vh] flex-col justify-between gap-10'>
            <motion.img
              initial={combinedStyleInitial}
              animate={
                isInView
                  ? combinedStyleFinal
                  : {
                      opacity: 0,
                    }
              }
              transition={{ duration: 0.2 }}
              src={'./Styles/Assets/Images/Templates.png'}
              width={'100%'}
              alt='Template3'
            />
            <motion.p
              initial={combinedStyleInitial}
              animate={
                isInView
                  ? combinedStyleFinal
                  : {
                      opacity: 0,
                    }
              }
              transition={{ duration: 0.2, delay: 0.1 }}
              className='text-lg'
            >
              {t('templatesDescription')}
            </motion.p>
          </div>
        )}
      </LandingPageSection>

      <LandingPageSection sectionClass='mt-40'>
        {isInView => (
          <motion.p
            initial={combinedStyleInitial}
            animate={
              isInView
                ? combinedStyleFinal
                : {
                    opacity: 0,
                  }
            }
            transition={{ duration: 0.2, delay: 0.1 }}
            className='text-lg'
          >
            {t('createYourCVDescription')}
          </motion.p>
        )}
      </LandingPageSection>

      <motion.div
        className='text-center'
        initial={combinedStyleInitial}
        animate={combinedStyleFinal}
        transition={{ duration: 0.2, delay: 0.7 }}
      >
        <Link
          href={useRoutesWithLocale().CREATE}
          className={styles.createYourCVLink}
        >
          {t('createYourCV')}
        </Link>
      </motion.div>

      <LandingPageSection sectionClass='full-bleed overflow-visible'>
        <div className='absolute flex w-full flex-col items-start'>
          <LayeredWaves width={'100%'} />
        </div>
      </LandingPageSection>
    </div>
  );
};
