import * as DateWrapper from './DateWrapper';

export function getMonth(dt) {
  var date = DateWrapper.date(dt);
  
  return {
    longName: date.monthLong(),
    shortName: date.monthShort(),
    daysCount: date.daysCount(),
    startDayOfMonth: date.startDayOfMonth(),
  };
}

export function getCalendarMonth(dt){
  const currentMonth = DateWrapper.date(dt);
  const prevMonth = currentMonth.prevMonth();
  const nextMonth = currentMonth.nextMonth();
  
	const days = [];
	var prev = prevMonth.daysCount() - currentMonth.startDayOfMonth() + 1;
	var next = 1;
	var row = [];
	days.push(row);
	
	var maxCol = 7;
	var maxRow = 5;
	var cellCount = maxRow*maxCol;
	
	for(var i = 1; i <= cellCount; i++){
		if(i <= currentMonth.startDayOfMonth()){
			row.push(prev++);
		} else if(i > currentMonth.daysCount()+1){
			row.push(next++);
		} else {
			row.push(i - currentMonth.startDayOfMonth());
		}

		if(i % 7 == 0 && cellCount !== i){
			row = [];
			days.push(row);
		}
	}
	
	return {
    longName: currentMonth.monthLong(),
    shortName: currentMonth.monthShort(),
    daysCount: currentMonth.daysCount(),
    startDayOfMonth: currentMonth.startDayOfMonth(),
    daysLong: DateWrapper.weekdaysLong(),
    daysShort: DateWrapper.weekdaysShort(),
	  days,
    date: currentMonth.toObject(),
    previousMonth: {
      longName: prevMonth.monthLong(),
      shortName: prevMonth.monthShort(),
      daysCount: prevMonth.daysCount(),
      date: prevMonth.toObject()
    },
    nextMonth: {
      longName: nextMonth.monthLong(),
      shortName: nextMonth.monthShort(),
      daysCount: nextMonth.daysCount(),
      date: nextMonth.toObject()
    }
	}
}

export function getWeek(){
}

export function changeGlobalLang(lang){
  DateWrapper.locale(lang);
}
