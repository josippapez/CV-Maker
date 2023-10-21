'use client';

import { Routes } from 'consts/Routes';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className='flex h-full flex-col items-center justify-center space-y-6 px-8 font-mono'>
      <p className='font-mono text-4xl font-bold'>{t('notFound')}</p>
      <div className='text-lg'>
        {t.rich('message', {
          // @ts-ignore
          homepage: (
            <Link
              href={Routes.LANDING_PAGE}
              className='text-[length:inherit] underline underline-offset-4'
            >
              {t('homePage')}
            </Link>
          ),
          // @ts-ignore
          createCV: (
            <Link
              href={Routes.CREATE}
              className='text-[length:inherit] underline underline-offset-4'
            >
              {t('createCVPage')}
            </Link>
          ),
        })}
      </div>
    </div>
  );
}
