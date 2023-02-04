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
      className={`flex select-none justify-center gap-3 drop-shadow-md ${className}`}
    >
      {!hideMonth && setSelectedMonth && selectedMonth ? (
        <div
          className={`flex items-center ${
            mobileView ? 'w-[165px]' : 'w-36'
          } h-10 rounded-md`}
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
            className='rounded-l-md p-2 transition-all hover:bg-stone-200'
          >
            <ArrowLeft height={30} />
          </button>
          <h2 className='w-full select-none px-5 text-center font-bold'>
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
            className='rounded-r-md p-2 transition-all hover:bg-stone-200'
          >
            <ArrowRight height={30} />
          </button>
        </div>
      ) : null}
      {!hideYear && setSelectedYear && selectedYear ? (
        <div className='flex h-10 items-center rounded-md'>
          <button
            onClick={() => {
              setSelectedYear(selectedYear - 1);
            }}
            className='rounded-l-md p-2 transition-all hover:bg-stone-200'
          >
            <ArrowLeft height={30} />
          </button>
          <h2 className='w-full select-none px-5 text-center font-bold'>
            {selectedYear}
          </h2>
          <button
            onClick={() => {
              setSelectedYear(selectedYear + 1);
            }}
            className='rounded-r-md p-2 transition-all hover:bg-stone-200'
          >
            <ArrowRight height={30} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DatePickerHeader;
