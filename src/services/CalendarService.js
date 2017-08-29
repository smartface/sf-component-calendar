import DateService from "./DateWrapper";
import DateServiceHijri from "./DateWrapperHijri";

import moment from "moment";
import 'moment/locale/ar-sa';
import momentHijri from "moment-hijri";
// momentHijri().format('iYYYY/iM/iD');

// moment.locale(["en", "ar-sa", "ar", "tr"]);
// momentHijri.locale("en");

/**
 * Creates a service by specified parameters
 * 
 * @param {string} lang - Calendar language
 * @param {string} type - Calendar type
 * @param {Object} specialDays - Special days data
 * 
 * @returns {Object}
 */
export default function createService(lang="en", type="gregorian", specialDays={}){
	var service
	
	var current;
			service = DateService;
			current = moment;
	
	switch (type) {
		case 'hijri':
			service = DateServiceHijri;
			current = momentHijri;

			break;
	}
	
	current.locale(lang);
	current.updateLocale(lang, {
		week : {
      dow : 0,
      doy: 6
    }
	});
	
	return {
		/**
		 * Returns current calendar month data
		 */
		getCalendarMonth: getCalendarMonth.bind(null, current, service),
		/**
		 * Returns current month data
		 */
		getMonth: getMonth.bind(null, current, service)
	};
}

/**
 * Returns current month data
 * 
 * @private
 * @returns {Object}
 */
function getMonth(moment, service, dt) {
	const dateService = new service(moment, dt);
  
  return {
    longName: dateService.monthLong(),
    shortName: dateService.monthShort(),
    daysCount: dateService.daysCount(),
    startDayOfMonth: dateService.startDayOfMonth(),
  };
}

/**
 * Returns current calendar month data
 * 
 * @private
 * @returns {Object}
 */
function getCalendarMonth(moment, service, dt){
	const currentMonth = new service(moment, dt);

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
    daysLong: currentMonth.weekdaysLong(),
    daysShort: currentMonth.weekdaysShort(),
    daysMin: currentMonth.weekdaysMin(),
	  days,
    date: currentMonth.toObject(),
    normalizedDate: currentMonth.toNormalizedObject(),
    previousMonth: {
      longName: prevMonth.monthLong(),
      shortName: prevMonth.monthShort(),
      daysCount: prevMonth.daysCount(),
      date: prevMonth.toObject(),
      normalizedDate: prevMonth.toNormalizedObject()
    },
    nextMonth: {
      longName: nextMonth.monthLong(),
      shortName: nextMonth.monthShort(),
      daysCount: nextMonth.daysCount(),
      date: nextMonth.toObject(),
      normalizedDate: nextMonth.toNormalizedObject()
    }
	};
}

export function getWeek(){
}

export function changeGlobalLang(dateService, lang){
  dateService.locale(lang);
}
