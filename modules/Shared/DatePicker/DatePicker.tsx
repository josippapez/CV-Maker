import { DatePickerHeader } from '@modules/Shared/DatePicker';
import { DatePickerDates } from '@modules/Shared/DatePicker/Dates/DatePickerDates';
import { Months } from '@modules/Shared/DatePicker/Dates/Months';
import { Years } from '@modules/Shared/DatePicker/Dates/Years';
import {
  Day,
  useCalculateEachDayOfMonth,
} from '@modules/Shared/Hooks/calculateEachDayOfMonth';
import { Modal } from '@modules/Shared/Modal/Modal';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  type: 'date' | 'month' | 'year';
  showDatePicker: boolean;
  closeDatePicker: () => void;
  initialDate?: string;
  startYear?: number;
  setDate: (date: string) => void;
  resetData: () => void;
  disabledCondition?: boolean;
  customDisplayDate?: (day: Day, index: number) => JSX.Element;
};

export const DatePicker = (props: Props) => {
  const {
    showDatePicker,
    closeDatePicker,
    initialDate,
    setDate,
    resetData,
    disabledCondition,
    startYear,
    type = 'date',
  } = props;

  const t = useTranslations('DatePicker');
  const [tempDate, setTempDate] = useState(initialDate || '');
  const [showYearPicker, setShowYearPicker] = useState(
    initialDate?.length === 4
  );

  const eachDayOfMonth = useCalculateEachDayOfMonth({
    startYear: startYear || DateTime.local().year,
    startMonth: DateTime.local().month,
  });

  const { month, year, setmonth, setyear } = eachDayOfMonth;

  const selectedType = showYearPicker ? 'year' : type;

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
      <div className='relative rounded-md bg-white p-4 text-almost-black'>
        <DatePickerHeader
          type={selectedType}
          hideMonth={selectedType === 'year' || selectedType === 'month'}
          selectedMonth={month}
          selectedYear={year}
          setSelectedMonth={setmonth}
          setSelectedYear={setyear}
          setShowYearPicker={() => {
            setShowYearPicker(prev => !prev);
            if (!showYearPicker) {
              setTempDate(year.toString());
            }
          }}
        />
        <div className='my-4'>
          {selectedType === 'year' && (
            <Years
              initialYear={year.toString()}
              selectedYear={DateTime.fromISO(tempDate).year.toString()}
              setDate={setTempDate}
              disabledCondition={disabledCondition}
            />
          )}
          {selectedType === 'month' && (
            <Months
              dates={eachDayOfMonth}
              initialDate={tempDate}
              setDate={setTempDate}
              disabledCondition={disabledCondition}
            />
          )}
          {selectedType === 'date' && (
            <DatePickerDates
              dates={eachDayOfMonth}
              initialDate={tempDate}
              setDate={setTempDate}
              disabledCondition={disabledCondition}
            />
          )}
        </div>
        <div className='flex justify-end'>
          <button
            className='rounded px-4 py-2 font-bold hover:bg-slate-200'
            onClick={() => {
              closeDatePicker();
              resetData();
            }}
          >
            {t('cancel')}
          </button>
          <button
            className='rounded px-4 py-2 font-bold hover:bg-slate-200'
            onClick={() => {
              closeDatePicker();
              resetData();
            }}
          >
            {t('clear')}
          </button>
          <button
            className='rounded px-4 py-2 font-bold hover:bg-slate-200'
            onClick={() => {
              setDate(tempDate);
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
