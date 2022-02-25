import style from './PageLoader.module.scss';

type Props = {};

const PageLoader = (props: Props) => {
  return (
    <div
      className={`dark:bg-neutral-700 w-full h-full flex justify-center items-center z-50`}
    >
      <div className={`${style.loader}`} />
    </div>
  );
};

export default PageLoader;
