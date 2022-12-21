import style from './PageLoader.module.scss';
interface Props {
  children?: React.ReactNode;
  isLoading: boolean;
}

const PageLoader = ({ children, isLoading }: Props) => {
  return isLoading ? (
    <div
      className={`dark:bg-neutral-700 w-full h-full flex justify-center items-center z-50`}
    >
      <div className={`${style.loader}`} />
    </div>
  ) : (
    <>{children}</>
  );
};

export default PageLoader;
