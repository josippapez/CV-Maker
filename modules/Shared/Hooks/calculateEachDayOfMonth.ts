import { DateTime } from "luxon";
import { useMemo, useState } from "react";

type Props = {
  startMonth: number;
  startYear: number;
};

export type Day = {
  day: number;
  date: string;
  name: string;
  year: string;
  lastMonth: boolean;
  weekNumber: number;
};

export const useCalculateEachDayOfMonth = (
  props: Props
): {
  month: number;
  year: number;
  setmonth: (month: number) => void;
  setyear: (year: number) => void;
  lastMonth: number;
  lastMonthYear: number;
  nextMonth: number;
  nextMonthYear: number;
  dates: Day[];
  lastMonthDates: Day[];
  nextMonthDates: Day[];
} => {
  const { startMonth, startYear } = props;
  const [month, setmonth] = useState(startMonth);
  const [year, setyear] = useState(startYear);

  let lastMonth = month - 1;
  let lastMonthYear = year;
  if (lastMonth === 0) {
    lastMonthYear--;
    lastMonth = 12;
  }
  let nextMonth = month + 1;
  let nextMonthYear = year;
  if (nextMonth === 13) {
    nextMonthYear++;
    nextMonth = 1;
  }
  const calculateDates = (
    start: DateTime,
    end: DateTime,
    lastOrNextMonth: boolean
  ): Day[] => {
    const monthDates: Day[] = [];
    const daysInMonth = end.diff(start, "days");
    for (let i = 0; i <= daysInMonth.days; i++) {
      const day = start.plus({ days: i });

      if (i === 0 && !lastOrNextMonth) {
        for (let index = start.get("weekday") - 1; index > 0; index--) {
          const dayOfLastMonth = start.minus({ days: index });
          monthDates.push({
            day: dayOfLastMonth.day,
            date: dayOfLastMonth.toFormat("yyyy-MM-dd"),
            name: dayOfLastMonth.toFormat("EEEE"),
            year: dayOfLastMonth.toFormat("yyyy"),
            lastMonth: true,
            weekNumber: dayOfLastMonth.weekNumber,
          });
        }
      }
      monthDates.push({
        day: day.day,
        date: day.toFormat("yyyy-MM-dd"),
        name: day.toFormat("EEEE"),
        year: day.toFormat("yyyy"),
        lastMonth: false,
        weekNumber: day.weekNumber,
      });
    }
    return monthDates;
  };

  return {
    month,
    year,
    setmonth,
    setyear,
    lastMonth,
    lastMonthYear,
    nextMonth,
    nextMonthYear,
    lastMonthDates: useMemo(() => {
      const start = DateTime.local(lastMonthYear, lastMonth).startOf("month");
      const end = DateTime.local(lastMonthYear, lastMonth).endOf("month");

      return calculateDates(start, end, true);
    }, [lastMonth, lastMonthYear]),
    dates: useMemo(() => {
      const start = DateTime.local(year, month).startOf("month");
      const end = DateTime.local(year, month).endOf("month");

      return calculateDates(start, end, false);
    }, [month, year]),
    nextMonthDates: useMemo(() => {
      const start = DateTime.local(nextMonthYear, nextMonth).startOf("month");
      const end = DateTime.local(nextMonthYear, nextMonth).endOf("month");

      return calculateDates(start, end, true);
    }, [nextMonth, nextMonthYear]),
  };
};
