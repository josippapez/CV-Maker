import { DateTime } from 'luxon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../DatePicker/DatePicker';
import MonthsPicker from '../MonthsPicker/MonthsPicker';

type Props = {
  monthsPicker?: boolean;
  disabled?: boolean;
  label?: string;
  inline?: boolean;
  value: string;
  fullWidth?: boolean;
  startYear?: number;
  setData: (data: string) => void;
  resetData: () => void;
  format?: {
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    day?: 'numeric' | '2-digit';
    year?: 'numeric' | '2-digit';
  };
};

export const DateInput = (props: Props) => {
  const { i18n } = useTranslation();
  const {
    label,
    value,
    setData,
    resetData,
    inline,
    fullWidth,
    startYear,
    format,
    disabled,
    monthsPicker,
  } = props;
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <div
      className={`flex ${inline ? 'flex-row items-center gap-4' : 'flex-col'} ${
        fullWidth ? 'w-full' : ''
      } drop-shadow-sm`}
    >
      {label && <label className='font-medium text-gray-700'>{label}</label>}
      <input
        disabled={disabled}
        type='button'
        className='disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
        flex flex-row items-center justify-between rounded-md
        h-10 px-4 ring-0 focus:ring-indigo-500 focus:ring-2 w-full
        transition-all duration-300 ease-in-out bg-white hover:cursor-pointer'
        onClick={() => setShowDatePicker(true)}
        value={
          value
            ? DateTime.fromISO(value)
                .setLocale(i18n.language)
                .toLocaleString(format)
            : ''
        }
      />
      {monthsPicker ? (
        <MonthsPicker
          startYear={startYear}
          initialDate={value}
          showMonthsPicker={showDatePicker}
          closeMonthsPicker={() => setShowDatePicker(false)}
          resetData={resetData}
          setDate={setData}
        />
      ) : (
        <DatePicker
          startYear={startYear}
          initialDate={value}
          showDatePicker={showDatePicker}
          closeDatePicker={() => setShowDatePicker(false)}
          resetData={resetData}
          setDate={setData}
        />
      )}
    </div>
  );
};
