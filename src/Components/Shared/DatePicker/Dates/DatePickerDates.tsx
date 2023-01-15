import { DateTime, Info } from 'luxon';
import { useTranslation } from 'react-i18next';
import {
  useCalculateEachDayOfMonth,
  Day,
} from '../../../../Hooks/calculateEachDayOfMonth';
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

const DatePickerDates = (props: Props) => {
  const {
    initialDate,
    setDate,
    disabledCondition,
    customDisplayDate,
    dates,
    showNextMonth,
    showPreviousMonth,
  } = props;
  const { i18n } = useTranslation('DateRangePicker');

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
        className={`transition-all cursor-pointer hover:bg-blue-200 hover:rounded-md
        ${initialDate === day.date && style.selectedDate}
        ${isToday && 'border-2 border-blue-500'}
        ${style['dateRange-Day']} font-bold select-none
        ${
          ['Saturday', 'Sunday'].includes(day.name)
            ? 'bg-opacity-60 text-neutral-500'
            : day.lastMonth
            ? 'opacity-30 font-normal'
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
        <div className='font-extrabold text-xl px-2 pb-2 drop-shadow-md flex gap-2'>
          {DateTime.local()
            .set({ month, year })
            .setLocale(i18n.language)
            .toFormat('LLLL yyyy')}
        </div>
        <div className={style.calendarGridHeader}>
          {Info.weekdaysFormat('short', { locale: i18n.language }).map(
            (day, index) => (
              <div
                key={index}
                className={`${style.dayName} select-none font-semibold`}
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    dates && (
      <>
        {showPreviousMonth && (
          <div>
            {daysHeader(dates.lastMonth, dates.lastMonthYear)}
            <div className={`${style.calendarGrid}`}>
              {dates.lastMonthDates.map((day, index) =>
                displayDate(day, index)
              )}
            </div>
          </div>
        )}
        <div>
          {daysHeader(dates.month, dates.year)}
          <div className={`${style.calendarGrid}`}>
            {dates.dates.map((day, index) => displayDate(day, index))}
          </div>
        </div>
        {showNextMonth && (
          <div>
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

export default DatePickerDates;
