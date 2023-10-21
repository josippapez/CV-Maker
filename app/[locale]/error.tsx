'use client';

import { useTranslations } from 'next-intl';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ErrorPage');

  return (
    <div className='m-auto flex h-full w-fit flex-col justify-center space-y-8 font-mono'>
      <p className='text-3xl'>{t('errorTitle')}</p>
      <p>
        <div className='flex flex-col space-y-3'>
          <p className='text-lg'>{t('errorDescription')}</p>
          <button
            onClick={reset}
            className='rounded-xl border border-gray-300 px-8 py-4 text-base outline outline-transparent transition-all hover:outline-2 hover:outline-gray-200'
          >
            {t('retry')}
          </button>
        </div>
        <br />
        {error.digest}
        <br />
        Error message: {error.message}
      </p>
    </div>
  );
}
