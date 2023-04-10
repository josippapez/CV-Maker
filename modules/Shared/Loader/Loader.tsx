import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import style from './PageLoader.module.scss';

type Props = { isLoading?: boolean; inline?: boolean };

export const Loader: FC<Props> = ({ isLoading, inline }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  return loading || isLoading ? (
    <div
      className={`${
        !inline ? 'fixed' : ''
      }  bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white dark:bg-neutral-700`}
    >
      <div className={`${style.loader}`} />
    </div>
  ) : null;
};
