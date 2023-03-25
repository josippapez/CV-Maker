import style from './PageLoader.module.scss';
interface Props {
  children?: React.ReactNode;
  isLoading: boolean;
  inline?: boolean;
}

export const PageLoader = ({ children, isLoading, inline }: Props) => {
  return (
    <>
      <div
        className={`${!inline ? 'fixed' : ''} ${
          isLoading ? '' : 'hidden'
        } top-0 hi right-0 left-0 bottom-0 z-50 flex h-full w-full items-center justify-center bg-white dark:bg-neutral-700`}
      >
        <div className={`${style.loader}`} />
      </div>
      {children}
    </>
  );
};
