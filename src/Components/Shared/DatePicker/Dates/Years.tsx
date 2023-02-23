import { DateTime } from 'luxon';
import { FC } from 'react';
import style from './Months.module.scss';

type Props = {
  initialYear?: string;
  selectedYear?: string;
  setDate?: (date: string) => void;
  disabledCondition?: boolean;
  customDisplayDate?: (year: string) => JSX.Element;
};

export const Years: FC<Props> = ({
  initialYear,
  selectedYear,
  setDate,
  disabledCondition,
  customDisplayDate,
}) => {
  const displayYears = (year: string) => {
    if (customDisplayDate) {
      return customDisplayDate(year);
    }
    return defaultMonthDisplay(year);
  };

  const defaultMonthDisplay = (year: string) => {
    const initialYear = Number(year);
    const currentSelectedYear = Number(selectedYear);

    const disabled = disabledCondition;

    const years = Array.from(Array(9))
      .map((_, index) => {
        return initialYear - index;
      })
      .reverse();

    return years.map((year, index) => (
      <div
        key={year}
        className={`cursor-pointer text-center transition-all hover:rounded-md hover:bg-indigo-200
          ${initialYear === year && 'ring-2 ring-indigo-500'}
          ${currentSelectedYear === year && 'bg-indigo-500 text-white'}
          select-none p-3 text-sm font-bold
          `}
        onMouseUp={() => {
          if (!disabled && setDate) {
            setDate(year.toString());
          }
        }}
      >
        {year}
      </div>
    ));
  };

  return (
    <div>
      <div className={`${style.calendarGrid}`}>
        {displayYears(initialYear || DateTime.now().year.toString())}
      </div>
    </div>
  );
};
