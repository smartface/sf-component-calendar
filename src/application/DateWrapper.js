const moment = require("moment");

function notValidDateThrowanError(date){
  if(moment(date).isValid()){
    throw new Error("Specified date is not valid.");
  }
}

export function day(date){
  return date.week();
}

export function weekOfYear(date){
  return date.week();
}

export function date(str=null){
  return str ? moment(str) : moment();
}

export function monthsShort(date){
  return date ? moment.monthsShort(date.month()) : moment.monthsShort();
}

export function monthsLong(date){
  return date ? moment.months(date.month()) : moment.months();
}

export function weekdaysShort(date){
  return date ? moment.weekdaysMin(date.weekday()) : moment.weekdaysMin();
}

export function weekdaysLong(date) {
  return date ? moment.weekdays(date.weekday()) : moment.weekdays();
}

export function daysInMonth(date) {
  return date.daysInMonth();
}

export function nextMonth(date){
  return moment();
}

export function prevMonth(date){
}

export function prevYear(date){
}

export function nextYear(date){
}

export function dateLang(sh="en"){
  return moment.locale(sh);
}


