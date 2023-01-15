import { DateTime, Info } from 'luxon';
import { useTranslation } from 'react-i18next';
import {
  useCalculateEachDayOfMonth,
  Day,
} from '../../../../Hooks/calculateEachDayOfMonth';
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

const Months = (props: Props) => {
  const {
    initialDate,
    setDate,
    disabledCondition,
    customDisplayDate,
    dates,
    showNextYear,
    showPreviousYear,
  } = props;

  const { i18n } = useTranslation();

  const displayMonths = (year: number, index: number) => {
    if (customDisplayDate) {
      return customDisplayDate(year, index);
    }
    return defaultMonthDisplay(year, index);
  };

  const defaultMonthDisplay = (year: number, gridIndex: number) => {
    const thisMonth = DateTime.local().set({ day: 1 }).toISODate();

    const disabled = disabledCondition;

    return Info.months(undefined, { locale: i18n.language }).map(
      (month, index) => (
        <div
          key={gridIndex + index}
          className={`transition-all text-center cursor-pointer hover:bg-indigo-200 hover:rounded-md
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
          font-bold select-none p-3 text-sm
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
      )
    );
  };

  return (
    dates && (
      <>
        {showPreviousYear && (
          <div>
            <div className={`${style.calendarGrid}`}>
              {displayMonths(dates.year - 1, 0)}
            </div>
          </div>
        )}
        <div>
          <div className={`${style.calendarGrid}`}>
            {displayMonths(dates.year, 0)}
          </div>
        </div>
        {showNextYear && (
          <div>
            <div className={`${style.calendarGrid}`}>
              {displayMonths(dates.year + 1, 0)}
            </div>
          </div>
        )}
      </>
    )
  );
};

export default Months;
