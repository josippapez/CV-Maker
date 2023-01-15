import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Day,
  useCalculateEachDayOfMonth,
} from '../../../Hooks/calculateEachDayOfMonth';
import DatePickerHeader from '../DatePicker/Header/DatePickerHeader';
import Modal from '../Modal/Modal';
import Months from './Dates/Months';

type Props = {
  showMonthsPicker: boolean;
  closeMonthsPicker: () => void;
  initialDate?: string;
  startYear?: number;
  setDate: (date: string) => void;
  resetData: () => void;
  disabledCondition?: boolean;
  customDisplayDate?: (day: Day, index: number) => JSX.Element;
};

const MonthsPicker = (props: Props) => {
  const {
    showMonthsPicker,
    closeMonthsPicker,
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

  const { year, setyear } = eachDayOfMonth;

  useEffect(() => {
    if (initialDate) {
      setyear(DateTime.fromISO(initialDate).year);
    }
  }, [initialDate]);

  return (
    <Modal
      animation='fade'
      show={showMonthsPicker}
      closeModal={closeMonthsPicker}
      zindex={10}
    >
      <div className='p-4 bg-white rounded-md relative'>
        <DatePickerHeader
          hideMonth
          selectedYear={year}
          setSelectedYear={setyear}
        />
        <div className='my-4'>
          <Months
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
              closeMonthsPicker();
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
              closeMonthsPicker();
            }}
          >
            {t('done')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MonthsPicker;
