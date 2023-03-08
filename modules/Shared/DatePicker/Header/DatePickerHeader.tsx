import { useMobileView } from '@modules/Shared/Hooks/useMobileView';
import ArrowLeft from '@public/Styles/Assets/Images/left-arrow.svg';
import ArrowRight from '@public/Styles/Assets/Images/right-arrow.svg';
import { DateTime } from 'luxon';
import { useTranslation } from 'next-i18next';

type Props = {
  type?: 'date' | 'month' | 'year';
  setSelectedYear?: (year: number) => void;
  setSelectedMonth?: (month: number) => void;
  selectedYear?: number;
  selectedMonth?: number;
  className?: string;
  hideMonth?: boolean;
  hideYear?: boolean;
  setShowYearPicker: () => void;
};

export const DatePickerHeader = (props: Props) => {
  const {
    type = 'date',
    setSelectedYear,
    setSelectedMonth,
    selectedMonth,
    selectedYear,
    className,
    hideMonth,
    hideYear,
    setShowYearPicker,
  } = props;
  const { t } = useTranslation('DatePicker');
  const mobileView = useMobileView();

  const shouldShowSelectMonth =
    !hideMonth && setSelectedMonth && !!selectedMonth;
  const shouldShowSelectYear = !hideYear && setSelectedYear && !!selectedYear;

  return (
    <div>
      <div className='flex pb-3'>
        <button
          onClick={() => {
            setShowYearPicker();
          }}
          className='rounded-md bg-gray-200 px-3 py-2 text-xs drop-shadow-sm hover:drop-shadow-md'
        >
          {t(type === 'year' ? 'date-selector' : 'year-only')}
        </button>
      </div>
      <div
        className={`flex select-none justify-center gap-3 drop-shadow-md ${className}`}
      >
        {shouldShowSelectMonth ? (
          <div
            className={`flex items-center ${
              mobileView ? 'w-[165px]' : 'w-36'
            } h-10 rounded-md`}
          >
            <button
              onClick={() => {
                if (selectedMonth === 1) {
                  setSelectedMonth(12);
                  if (shouldShowSelectYear) {
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
                  if (shouldShowSelectYear) {
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
        <YearHeaderDisplay
          type={type}
          shouldShowSelectYear={shouldShowSelectYear}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
    </div>
  );
};

const YearHeaderDisplay = ({
  type,
  shouldShowSelectYear,
  selectedYear = DateTime.now().year,
  setSelectedYear = () => {
    return;
  },
}: {
  type: 'date' | 'month' | 'year';
  shouldShowSelectYear?: boolean;
  selectedYear?: number;
  setSelectedYear?: (year: number) => void;
}) => {
  if (!shouldShowSelectYear) return null;

  return type === 'year' ? (
    <YearRangeHeader
      setSelectedYear={setSelectedYear}
      selectedYear={selectedYear}
    />
  ) : (
    <YearHeader setSelectedYear={setSelectedYear} selectedYear={selectedYear} />
  );
};

const YearRangeHeader = ({
  setSelectedYear,
  selectedYear,
}: {
  setSelectedYear: (year: number) => void;
  selectedYear: number;
}) => {
  return (
    <div className='flex h-10 items-center rounded-md'>
      <button
        onClick={() => {
          setSelectedYear(selectedYear - 8);
        }}
        className='rounded-l-md p-2 transition-all hover:bg-stone-200'
      >
        <ArrowLeft height={30} />
      </button>
      <h2 className='w-full select-none px-5 text-center font-bold'>
        {selectedYear - 8} - {selectedYear}
      </h2>
      <button
        onClick={() => {
          setSelectedYear(selectedYear + 8);
        }}
        className='rounded-r-md p-2 transition-all hover:bg-stone-200'
      >
        <ArrowRight height={30} />
      </button>
    </div>
  );
};

const YearHeader = ({
  setSelectedYear,
  selectedYear,
}: {
  setSelectedYear: (year: number) => void;
  selectedYear: number;
}) => {
  return (
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
  );
};
