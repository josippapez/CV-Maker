import { DateTime } from 'luxon';
import { useState } from 'react';
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
  const [displayedDate, setDisplayedDate] = useState<string | undefined>(value);
  console.log(value, displayedDate);

  const handleReset = () => {
    setDisplayedDate(undefined);
    resetData();
  };

  const handleSetData = (date: string) => {
    setDisplayedDate(date);
    setData(date);
  };

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
        className='flex h-10 w-full
        flex-row items-center justify-between rounded-md bg-white
        px-4 ring-0 transition-all duration-300 ease-in-out hover:cursor-pointer
        focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500'
        onClick={() => setShowDatePicker(true)}
        defaultValue={
          displayedDate
            ? DateTime.fromISO(displayedDate).toLocaleString(format)
            : ''
        }
      />
      {monthsPicker ? (
        <MonthsPicker
          startYear={startYear}
          initialDate={displayedDate}
          showMonthsPicker={showDatePicker}
          closeMonthsPicker={() => setShowDatePicker(false)}
          resetData={handleReset}
          setDate={handleSetData}
        />
      ) : (
        <DatePicker
          startYear={startYear}
          initialDate={displayedDate}
          showDatePicker={showDatePicker}
          closeDatePicker={() => setShowDatePicker(false)}
          resetData={handleReset}
          setDate={handleSetData}
        />
      )}
    </div>
  );
};
