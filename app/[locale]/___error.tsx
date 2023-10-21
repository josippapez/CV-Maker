'use client';

import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  return (
    <div>
      <h1>{t('title')}</h1>
      <button onClick={reset}>{t('retry')}</button>
    </div>
  );
}
