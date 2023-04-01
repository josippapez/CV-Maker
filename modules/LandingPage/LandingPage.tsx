import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { RoutesWithLocale } from 'consts/Routes';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC } from 'react';
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

  return (
    <div className='h-screen overflow-y-hidden bg-jacarta-white text-jacarta-purple transition-colors dark:bg-jacarta-purple dark:text-jacarta-white'>
      <div className='flex h-full items-center justify-center'>
        <div className='flex w-full flex-col'>
          <div className='flex items-center justify-center'>
            <motion.header
              initial={combinedStyleInitial}
              animate={combinedStyleFinal}
              transition={{ duration: 0.2 }}
              className='w-2/6 text-center text-6xl font-bold text-blue-900 dark:text-white'
            >
              {t('pageName')}
            </motion.header>
            <motion.img
              initial={combinedStyleInitial}
              animate={combinedStyleFinal}
              transition={{ duration: 0.2, delay: 0.1 }}
              src={'./Styles/Assets/Images/pages.svg'}
              alt='Page Logo'
              className='w-2/6'
            />
          </div>
          <motion.div
            className='text-center'
            initial={combinedStyleInitial}
            animate={combinedStyleFinal}
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
    </div>
  );
};
