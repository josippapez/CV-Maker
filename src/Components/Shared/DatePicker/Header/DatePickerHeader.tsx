import useMobileView from '../../../../Hooks/useMobileView';
import { ReactComponent as ArrowLeft } from '../../../../Styles/Assets/Images/left-arrow.svg';
import { ReactComponent as ArrowRight } from '../../../../Styles/Assets/Images/right-arrow.svg';

type Props = {
  setSelectedYear?: (year: number) => void;
  setSelectedMonth?: (month: number) => void;
  selectedYear?: number;
  selectedMonth?: number;
  className?: string;
  hideMonth?: boolean;
  hideYear?: boolean;
};

const DatePickerHeader = (props: Props) => {
  const {
    setSelectedYear,
    setSelectedMonth,
    selectedMonth,
    selectedYear,
    className,
    hideMonth,
    hideYear,
  } = props;

  const mobileView = useMobileView();

  return (
    <div
      className={`flex justify-center select-none gap-3 drop-shadow-md ${className}`}
    >
      {!hideMonth && setSelectedMonth && selectedMonth ? (
        <div
          className={`flex items-center ${
            mobileView ? 'w-[165px]' : 'w-36'
          } rounded-md h-10`}
        >
          <button
            onClick={() => {
              if (selectedMonth === 1) {
                setSelectedMonth(12);
                if (!hideYear && setSelectedYear && selectedYear) {
                  setSelectedYear(selectedYear - 1);
                }
                return;
              }
              setSelectedMonth(selectedMonth - 1);
            }}
            className='hover:bg-stone-200 p-2 transition-all rounded-l-md'
          >
            <ArrowLeft height={30} />
          </button>
          <h2 className='w-full text-center px-5 select-none font-bold'>
            {selectedMonth}
          </h2>
          <button
            onClick={() => {
              if (selectedMonth === 12) {
                setSelectedMonth(1);
                if (!hideYear && setSelectedYear && selectedYear) {
                  setSelectedYear(selectedYear + 1);
                }
                return;
              }
              setSelectedMonth(selectedMonth + 1);
            }}
            className='hover:bg-stone-200 p-2 transition-all rounded-r-md'
          >
            <ArrowRight height={30} />
          </button>
        </div>
      ) : null}
      {!hideYear && setSelectedYear && selectedYear ? (
        <div className='flex items-center w-[165px] rounded-md h-10'>
          <button
            onClick={() => {
              setSelectedYear(selectedYear - 1);
            }}
            className='hover:bg-stone-200 p-2 transition-all rounded-l-md'
          >
            <ArrowLeft height={30} />
          </button>
          <h2 className='w-full text-center px-5 select-none font-bold'>
            {selectedYear}
          </h2>
          <button
            onClick={() => {
              setSelectedYear(selectedYear + 1);
            }}
            className='hover:bg-stone-200 p-2 transition-all rounded-r-md'
          >
            <ArrowRight height={30} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DatePickerHeader;
