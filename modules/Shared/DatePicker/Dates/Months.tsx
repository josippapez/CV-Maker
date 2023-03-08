import { useCalculateEachDayOfMonth } from '@modules/Shared/Hooks/calculateEachDayOfMonth';
import { DateTime, Info } from 'luxon';
import style from './Months.module.scss';

type Props = {
  dates: ReturnType<typeof useCalculateEachDayOfMonth>;
  showNextYear?: boolean;
  showPreviousYear?: boolean;
  initialDate?: string;
  setDate?: (date: string) => void;
  disabledCondition?: boolean;
  customDisplayDate?: (year: number, index: number) => JSX.Element;
};

export const Months = (props: Props) => {
  const {
    initialDate,
    setDate,
    disabledCondition,
    customDisplayDate,
    dates,
    showNextYear,
    showPreviousYear,
  } = props;

  const displayMonths = (year: number, index: number) => {
    if (customDisplayDate) {
      return customDisplayDate(year, index);
    }
    return defaultMonthDisplay(year, index);
  };

  const defaultMonthDisplay = (year: number, gridIndex: number) => {
    const thisMonth = DateTime.local().set({ day: 1 }).toISODate();

    const disabled = disabledCondition;

    return Info.months().map((month, index) => (
      <div
        key={gridIndex + index}
        className={`cursor-pointer text-center transition-all hover:rounded-md hover:bg-indigo-200
          ${
            thisMonth ===
              DateTime.fromObject({
                day: 1,
                year,
                month: index + 1,
              }).toISODate() && 'ring-2 ring-indigo-500'
          }
          ${
            initialDate ===
              DateTime.fromObject({
                day: 1,
                year,
                month: index + 1,
              }).toISODate() && 'bg-indigo-500 text-white'
          }
          select-none p-3 text-sm font-bold
          `}
        onMouseUp={() => {
          if (!disabled && setDate) {
            setDate(
              DateTime.fromObject({
                day: 1,
                year,
                month: index + 1,
              }).toISODate()
            );
          }
        }}
      >
        {month}
      </div>
    ));
  };

  return (
    dates && (
      <>
        {showPreviousYear && (
          <div className='rounded-md bg-gray-100 p-4 shadow-inner'>
            <div className={`${style.calendarGrid}`}>
              {displayMonths(dates.year - 1, 0)}
            </div>
          </div>
        )}
        <div className='rounded-md bg-gray-100 p-4 shadow-inner'>
          <div className={`${style.calendarGrid}`}>
            {displayMonths(dates.year, 0)}
          </div>
        </div>
        {showNextYear && (
          <div className='rounded-md bg-gray-100 p-4 shadow-inner'>
            <div className={`${style.calendarGrid}`}>
              {displayMonths(dates.year + 1, 0)}
            </div>
          </div>
        )}
      </>
    )
  );
};
