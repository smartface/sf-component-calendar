export type CalendarDayType = {
    day: number;
    month: 'previous' | 'next' | 'current',
    specialDay: {
        text: string;
        className: string;
    }[],
    localeDay: string;
    isWeekend: boolean;
}