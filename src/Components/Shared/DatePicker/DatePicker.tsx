import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Day,
  useCalculateEachDayOfMonth,
} from '../../../Hooks/calculateEachDayOfMonth';
import Modal from '../Modal/Modal';
import DatePickerDates from './Dates/DatePickerDates';
import DatePickerHeader from './Header/DatePickerHeader';

type Props = {
  showDatePicker: boolean;
  closeDatePicker: () => void;
  initialDate?: string;
  startYear?: number;
  setDate: (date: string) => void;
  resetData: () => void;
  disabledCondition?: boolean;
  customDisplayDate?: (day: Day, index: number) => JSX.Element;
};

const DatePicker = (props: Props) => {
  const {
    showDatePicker,
    closeDatePicker,
    initialDate,
    setDate,
    resetData,
    disabledCondition,
    startYear,
  } = props;
  const { t } = useTranslation('DatePicker');

  const eachDayOfMonth = useCalculateEachDayOfMonth({
    startYear: startYear || DateTime.local().year,
    startMonth: DateTime.local().month,
  });

  const { month, year, setmonth, setyear } = eachDayOfMonth;

  useEffect(() => {
    if (initialDate) {
      setmonth(DateTime.fromISO(initialDate).month);
      setyear(DateTime.fromISO(initialDate).year);
    }
  }, [initialDate]);

  return (
    <Modal
      animation='fade'
      show={showDatePicker}
      closeModal={closeDatePicker}
      zindex={10}
    >
      <div className='p-4 bg-white rounded-md relative'>
        <DatePickerHeader
          selectedMonth={month}
          selectedYear={year}
          setSelectedMonth={setmonth}
          setSelectedYear={setyear}
        />
        <div className='my-4'>
          <DatePickerDates
            dates={eachDayOfMonth}
            initialDate={initialDate}
            setDate={setDate}
            disabledCondition={disabledCondition}
          />
        </div>
        <div className='flex justify-end'>
          <button
            className='hover:bg-slate-200 font-bold py-2 px-4 rounded'
            onClick={() => {
              closeDatePicker();
              resetData();
            }}
          >
            {t('cancel')}
          </button>
          <button
            className='hover:bg-slate-200 font-bold py-2 px-4 rounded'
            onClick={() => {
              resetData();
            }}
          >
            {t('clear')}
          </button>
          <button
            className='hover:bg-slate-200 font-bold py-2 px-4 rounded'
            onClick={() => {
              closeDatePicker();
            }}
          >
            {t('done')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DatePicker;
