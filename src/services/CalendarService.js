import DateService from "./DateWrapper";
import DateServiceHijri from "./DateWrapperHijri";
import createSpecialDaysService from "./SpecialDaysService";
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
 * @param {integer} dow - Day of week
 * 
 * @returns {Object}
 */
export default function createService({lang="en", type="gregorian", specialDays={}, dayOfWeek=0}){
	var service;
	
	var current;
			service = DateService;
			current = moment;
	
	switch (type) {
		case 'hijri':
			service = DateServiceHijri;
			current = momentHijri;

			break;
	}
	
	current.updateLocale(lang);
	const weekdays = current.localeData().weekdays();
	
	current.updateLocale(lang, {
		week : {
      dow : dayOfWeek,
      doy: 6
    }
	});
	
	const specialDaysService = createSpecialDaysService(specialDays);
	
	return {
		/**
		 * Returns current calendar month data
		 */
		getCalendarMonth: getCalendarMonth.bind(
			null, 
			current, 
			service, 
			(args) => {
				args.lang = lang;
				args.calendar = type;
				return specialDaysService.getSpecialDay(args);
			}),
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
function getCalendarMonth(moment, service, specialDaysService, dt){
	const currentMonth = new service(moment, dt);

  const prevMonth = currentMonth.prevMonth();
  const nextMonth = currentMonth.nextMonth();
  
	const days = [];
	const daysCount = currentMonth.daysCount();
	const startDay = currentMonth.startDayOfMonth() - 1;
	
	const startNext = daysCount + startDay;
	// 31 -> 1
	var prev = prevMonth.daysCount() - startDay;
	var next = 1;
	var row = [];
	days.push(row);
	
	var maxCol = 7;
	var maxRow = 6;
	var cellCount = maxRow*maxCol;
	var localeDays = [];
	
	for(var i = 1; i <= cellCount; i++){
	  let isWeekend = false;
		let day;
		
		if(i <= startDay) {
			day = {
			  day: ++prev,
			  month: 'previous',
			};
	    
	    isWeekend = prevMonth.isWeekend(day.day);
			day.specialDay = specialDaysService({...prevMonth.fromDay(day.day).toNormalizedObject()});
			day.localeDay  = prevMonth.localeDate().setDay(day.day).getDate().day;
		} else if(i > startNext) {
			day = {
			  day: next++,
			  month: 'next',
			};
      isWeekend = nextMonth.isWeekend(day.day);
			day.specialDay = specialDaysService({...nextMonth.fromDay(day.day).toNormalizedObject()});
			day.localeDay  = nextMonth.localeDate().setDay(day.day).getDate().day;
		} else {
			day = {
			  day: i - startDay,
			  month: 'current',
			};
			
			isWeekend = currentMonth.isWeekend(day.day);
			day.specialDay = specialDaysService({...currentMonth.fromDay(day.day).toNormalizedObject()});
			day.localeDay  = currentMonth.localeDate().setDay(day.day).getDate().day;
		}
		
		isWeekend && (day.isWeekend = isWeekend);

		row.push(day);
		
		// if(row.length === 1 || row.length === 7) {
			
		// }

		if(i > 0 && i % 7 == 0 && i !== cellCount) {
			row = [];
			days.push(row);
		}
	}
	
	return {
    // firstDayOfWeek: currentMonth.firstDayOfWeek(),
    longName: currentMonth.monthLong(),
    shortName: currentMonth.monthShort(),
    daysCount: currentMonth.daysCount(),
    startDayOfMonth: currentMonth.startDayOfMonth(),
    daysLong: currentMonth.weekdaysLong(),
    daysShort: currentMonth.weekdaysShort(),
    daysMin: currentMonth.weekdaysMin(),
	  days,
    date: currentMonth.toObject(),
    localeDate: currentMonth.localeDate().getDate(),
    normalizedDate: currentMonth.toNormalizedObject(),
    previousMonth: {
      longName: prevMonth.monthLong(),
      shortName: prevMonth.monthShort(),
      daysCount: prevMonth.daysCount(),
      date: prevMonth.toObject(),
      normalizedDate: prevMonth.toNormalizedObject(),
	    localeDate: prevMonth.localeDate().getDate(),
    },
    nextMonth: {
      longName: nextMonth.monthLong(),
      shortName: nextMonth.monthShort(),
      daysCount: nextMonth.daysCount(),
      date: nextMonth.toObject(),
      normalizedDate: nextMonth.toNormalizedObject(),
	    localeDate: nextMonth.localeDate().getDate(),
    }
	};
}
