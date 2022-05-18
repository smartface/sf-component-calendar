export type CalendarDayType = {
  day: number;
  month: 'previous' | 'next' | 'current';
  specialDay: {
    text: string;
    className: string;
  }[];
  today: boolean;
  localeDay: string;
  isWeekend: boolean;
};
