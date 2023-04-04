import { LandingPageSection } from '@modules/LandingPage/LandingPageSection';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { RoutesWithLocale } from 'consts/Routes';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { FC, useRef } from 'react';
import Google from '@public/Styles/Assets/Images/google.svg';
import styles from './LandingPage.module.scss';

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
      className='page-container desktop_col-32 mobile_col-16 gap-y-10 pb-20 drop-shadow-md'
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
      <LandingPageSection sectionClass='min-h-[calc(100vh_-_81px)]'>
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
      <LandingPageSection
        sectionClass={`desktop_col-24 min-h-[50vh] justify-center ${styles.diagonalLRline} before:bg-almost-black dark:before:bg-almost-white`}
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
          <div className='flex h-[20vh] flex-col justify-between'>
            <motion.p
              initial={combinedStyleInitial}
              animate={
                isInView
                  ? combinedStyleFinal
                  : {
                      opacity: 0,
                    }
              }
              transition={{ duration: 0.2 }}
              className='text-lg'
            >
              {t('templatesDescription')}
            </motion.p>
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
          </div>
        )}
      </LandingPageSection>
      {/* <motion.div
        className='text-center'
        initial={combinedStyleInitial}
        animate={combinedStyleFinal}
        transition={{ duration: 0.2, delay: 0.7 }}
      >
        <Link href={routesWithLocale.CREATE} className={style.createYourCVLink}>
          {t('createYourCV')}
        </Link>
      </motion.div> */}

      {/* Creating a CV with CV Maker is simple and straightforward. Just choose a template that suits your needs, fill in your personal and professional details, and download your finished CV in PDF format. We offer a range of templates to choose from, including modern, traditional, creative, and minimalist designs. Whether you're a recent graduate or an experienced professional, our templates will help you create a standout CV that highlights your skills and achievements.

With CV Maker, you can also log in with your Google account to save your data and access it from anywhere. This means you can work on your CV whenever and wherever you want, without having to worry about losing your progress. And when you're finished, you can easily share your CV with others by simply sending them the link to your online CV.

At CV Maker, we understand the importance of having a professional-looking CV that stands out from the crowd. That's why we've designed our web app to be easy to use, intuitive, and flexible. Whether you're a job seeker, a freelancer, or a student, CV Maker has everything you need to create a CV that showcases your skills and accomplishments in the best possible light.

So why wait? Sign up for CV Maker today and start creating your perfect CV in minutes. With our user-friendly interface, wide selection of templates, and Google account integration, you'll be able to create a standout CV that gets you noticed by employers and recruiters alike. */}

      {/*
Welcome to CV Maker – the easiest way to create and download professional CVs. Choose a template, fill in your details, and download your finished CV in PDF format.

We offer a variety of templates to choose from, including modern, traditional, creative, and minimalist designs. Whether you're a recent graduate or an experienced professional, our templates will help you create a standout CV that highlights your skills and achievements.

With our Google account integration, you can save your data and work on your CV anytime, anywhere. Plus, you can easily share your online CV with others by sending them the link.

Sign up for CV Maker today and create a standout CV that gets you noticed by employers and recruiters. Our user-friendly interface and wide selection of templates make it easy to create a professional-looking CV in just a few minutes. */}
    </div>
  );
};
