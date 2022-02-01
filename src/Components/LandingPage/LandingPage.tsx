import PagesImage from '../../Styles/Assets/Images/pages.svg';

/* type Props = {}; */

const LandingPage = (/* props: Props */) => {
  return (
    <div className='px-1 py-1 h-[calc(100%_-_54px)] transition-colors dark:bg-gray-700'>
      <div className='flex justify-center h-full items-center'>
        <header className='w-2/6 text-6xl text-blue-900 dark:text-white'>
          CV Generator
        </header>
        <img src={PagesImage} alt='Page Logo' className='w-2/6' />
      </div>
    </div>
  );
};

export default LandingPage;
