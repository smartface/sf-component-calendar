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
	const daysCount = currentMonth.daysCount();
	const startDay = currentMonth.startDayOfMonth();
	const startNext = daysCount + startDay;
	// 31 -> 1
	var prev = prevMonth.daysCount() - startDay;
	var next = 1;
	var row = [];
	days.push(row);
	
	var maxCol = 7;
	var maxRow = 6;
	var cellCount = maxRow*maxCol;
	
	for(var i = 0; i < cellCount; i++){
		let day;
		if(i < currentMonth.startDayOfMonth()) {
			day = {
			  day: ++prev,
			  month: 'previous',
			  isSpecialDay: false,
			};
		} else if(i >= startNext) {
			day = {
			  day: next++,
			  month: 'next',
			  isSpecialDay: false,
			};
		} else {
			day = {
			  day: i - startDay + 1,
			  month: 'current',
			  isSpecialDay: false,
			};
		}
		
		row.push(day);
		
		if(row.length === 1 || row.length === 7){
			day.isWeekend = true;
		}

		if(i > 0 && (i+1) % 7 == 0 && i !== cellCount-1){
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
