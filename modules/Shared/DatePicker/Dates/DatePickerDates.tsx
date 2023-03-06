import { Day, useCalculateEachDayOfMonth } from '@/Hooks';
import { DateTime, Info } from 'luxon';
import style from './DatePickerDates.module.scss';

type Props = {
  dates: ReturnType<typeof useCalculateEachDayOfMonth>;
  showNextMonth?: boolean;
  showPreviousMonth?: boolean;
  initialDate?: string;
  setDate?: (date: string) => void;
  disabledCondition?: boolean;
  customDisplayDate?: (day: Day, index: number) => JSX.Element;
};

export const DatePickerDates = (props: Props) => {
  const {
    initialDate,
    setDate,
    disabledCondition,
    customDisplayDate,
    dates,
    showNextMonth,
    showPreviousMonth,
  } = props;

  const displayDate = (day: Day, index: number) => {
    if (customDisplayDate) {
      return customDisplayDate(day, index);
    }
    return defaultDisplayDate(day, index);
  };

  const defaultDisplayDate = (day: Day, index: number) => {
    const isToday = DateTime.local().hasSame(DateTime.fromISO(day.date), 'day');
    const disabled = disabledCondition;

    return (
      <div
        key={index}
        className={`cursor-pointer transition-all hover:rounded-md hover:bg-blue-200
        ${initialDate === day.date && style.selectedDate}
        ${isToday && 'border-2 border-blue-500'}
        ${style['dateRange-Day']} select-none font-bold
        ${
          ['Saturday', 'Sunday'].includes(day.name)
            ? 'bg-opacity-60 text-neutral-500'
            : day.lastMonth
            ? 'font-normal opacity-30'
            : ''
        }`}
        onMouseUp={() => {
          if (!disabled && setDate) {
            setDate(day.date);
          }
        }}
      >
        {day.day}
      </div>
    );
  };

  const daysHeader = (month: number, year: number) => {
    return (
      <div>
        <div className='flex gap-2 px-2 pb-2 text-xl font-extrabold drop-shadow-md'>
          {DateTime.local().set({ month, year }).toFormat('LLLL yyyy')}
        </div>
        <div className={style.calendarGridHeader}>
          {Info.weekdaysFormat('short').map((day, index) => (
            <div
              key={index}
              className={`${style.dayName} select-none font-semibold`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    dates && (
      <>
        {showPreviousMonth && (
          <div className='rounded-md bg-gray-100 p-4 shadow-inner'>
            {daysHeader(dates.lastMonth, dates.lastMonthYear)}
            <div className={`${style.calendarGrid}`}>
              {dates.lastMonthDates.map((day, index) =>
                displayDate(day, index)
              )}
            </div>
          </div>
        )}
        <div className='rounded-md bg-gray-100 p-4 shadow-inner'>
          {daysHeader(dates.month, dates.year)}
          <div className={`${style.calendarGrid}`}>
            {dates.dates.map((day, index) => displayDate(day, index))}
          </div>
        </div>
        {showNextMonth && (
          <div className='rounded-md bg-gray-100 p-4 shadow-inner'>
            {daysHeader(dates.nextMonth, dates.nextMonthYear)}
            <div className={`${style.calendarGrid}`}>
              {dates.nextMonthDates.map((day, index) =>
                displayDate(day, index)
              )}
            </div>
          </div>
        )}
      </>
    )
  );
};
