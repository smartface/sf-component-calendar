import * as DateWrapper from './DateWrapper';

export function getMonth(num=1){
  const month = DateWrapper.date(num);
  
  return {
    longName: DateWrapper.monthsLong(month),
    shortName: DateWrapper.monthsShort(month),
    daysInMonth: DateWrapper.daysInMonth(month),
    daysLong: DateWrapper.weekdaysLong(),
    daysShort: DateWrapper.weekdaysShort(),
    startDayOfMonth: DateWrapper.startDayOfMonth(),
  };
}

export function getWeek(){
}

export function changeGlobalLang(lang){
  DateWrapper.locale(lang);
}
