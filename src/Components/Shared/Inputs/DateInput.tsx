import { DateTime, DateTimeFormatOptions } from 'luxon';
import { useState } from 'react';
import DatePicker from '../DatePicker/DatePicker';

type Props = {
  type?: 'date' | 'month' | 'year';
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
    type = 'date',
  } = props;

  const isOnlyYear = value.length === 4;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onlyYearFormat = {
    year: 'numeric',
  } satisfies DateTimeFormatOptions;

  const newFormat = isOnlyYear ? onlyYearFormat : format;

  console.log(type);


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
        className='w-ful flex h-10
        flex-row items-center justify-between rounded-md bg-white
        px-4 ring-0 transition-all duration-300 ease-in-out hover:cursor-pointer
        focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500'
        onClick={() => setShowDatePicker(true)}
        defaultValue={
          value ? DateTime.fromISO(value).toLocaleString(newFormat) : ''
        }
      />
      <DatePicker
        type={type}
        startYear={startYear}
        initialDate={value}
        showDatePicker={showDatePicker}
        closeDatePicker={() => setShowDatePicker(false)}
        resetData={resetData}
        setDate={setData}
      />
    </div>
  );
};
