import style from './PageLoader.module.scss';
interface Props {
  children?: React.ReactNode;
  isLoading: boolean;
}

const PageLoader = ({ children, isLoading }: Props) => {
  return isLoading ? (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 dark:bg-neutral-700 w-full h-full flex justify-center items-center z-50`}
    >
      <div className={`${style.loader}`} />
    </div>
  ) : (
    <>{children}</>
  );
};

export default PageLoader;
