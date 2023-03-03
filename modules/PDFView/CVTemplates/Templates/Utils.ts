import { DateTime, DateTimeFormatOptions } from 'luxon';

export const displayDate = (
  date: string,
  format: DateTimeFormatOptions | 'default' = {
    month: 'short',
    year: 'numeric',
  }
) => {
  if (date.length === 4) return date;
  return DateTime.fromISO(date).toLocaleString(
    format === 'default' ? undefined : format
  );
};
