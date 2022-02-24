import style from './PageLoader.module.scss';

type Props = {};

const PageLoader = (props: Props) => {
  return (
    <div
      className={`dark:bg-slate-600 w-screen h-screen flex justify-center items-center z-50`}
    >
      <div className={`${style.loader}`} />
    </div>
  );
};

export default PageLoader;
