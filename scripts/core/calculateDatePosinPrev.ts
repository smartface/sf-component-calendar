export function calculateDatePosinPrev(startDayOfMonth, daysCountPrevMonth, day) {
    const weekDayIndex = startDayOfMonth - 2 - (daysCountPrevMonth - day);
    return {
        weekIndex: weekDayIndex < 0 ? -2 : 0,
        weekDayIndex: weekDayIndex < 0 ? 0 : weekDayIndex
    };
}
