function notValidDateThrowanError(moment, date) {
	if(moment(date)
		.isValid()) {
		throw new Error("Specified date is not valid.");
	}
}

/*export function date(moment, dt = null) {
	moment = moment || require("moment");

	const _date = dt !== null ?
		typeof dt === "string" || dt instanceof Object ?
		moment(dt) :
		clone(dt) :
		moment();

	const dateObject = _date.toObject();

	class DateWrapper {
		month(num) {
			return num ? month.call(null, moment, num, _date) : dateObject.months;
		}

		day(num) {
			return num ? day.call(null, moment, num, _date) : dateObject.dates;
		}

		year(num) {
			return num ? year.call(null, moment, num, _date) : dateObject.years;
		}

		startDayOfMonth() {
			return startDayOfMonth(_date.clone()
				.date(1));
		}

		monthShort() {
			return monthsShort.call(null, moment, _date);
		}

		monthLong() {
			return monthsLong.call(null, moment, _date);
		}

		daysCount() {
			return daysCount(_date);
		}

		nextMonth() {
			return date(nextMonth(_date));
		}

		prevMonth() {
			return date.call(null, moment, prevMonth(_date));
		}

		toString() {
			return _date.toString();
		}

		toObject() {
			return {
				year: dateObject.years,
				day: dateObject.date,
				month: dateObject.months
			};
		}
	}

	return new DateWrapper();
}*/

/*export function dateScope(moment) {
  return function dateCaller(fn, dt=null){
    const _date = dt !== null
      ? typeof dt === "string" || dt instanceof Object
    		? moment(dt)
    		: clone(dt)
  		: moment();
		
		const args = arguments.length > 1 ? [moment, ...Array.prototype.slice.call(arguments, 2), _date] : [moment];
    return fn.apply(null, args);
  };
}
*/
// export function 

export default class DateService {
	constructor(moment, date){
		moment.lang("ar-sa");
		this._moment = moment;
		this._date = moment(date);
		// this._date.startOf("iYear");
		
		if(!this._date.isValid()){
			throw new Error("Invalid date");
		}
	}
	
	weekOfYear() {
		return this._moment.week();
	}

	clone() {
		return this._moment.clone();
	}
	
	month() {
// 	date !== undefined 
// 	  ? date.month(month)
// 	  : month 
	   // ? 
  return this._date.toObject().months;
  // month ? moment().month(month) : moment.toObject().months;
	   // : date.toObject().monts;
	}
	
	year() {
		return this._date().iYear();
	}
	
	day(day, date) {
		return this._date().iDay();
	}
	
	startDayOfMonth() {
		return this._date.clone().iDate(1).weekday();
	}
	
	monthsShort() {
		return this._moment.monthsShort();
	}
	
	monthShort() {
		return this._moment.monthsShort(this._date.iMonth());
	}
	
	monthLong() {
		return this._moment.months(this._date.iMonth());
	}
	
	monthsLong() {
		return this._moment.months();
	}
	
	weekdaysShort() {
		return this._moment.weekdaysMin();
	}
	
	weekdaysLong() {
		return this._moment.weekdays();
	}
	
	daysCount() {
		return this._date.iDaysInMonth();
	}
	
	nextMonth() {
		return new DateService(this._moment, this._date.clone().add(1, 'iMonth'))
	}
	
	prevMonth() {
		return new DateService(this._moment, this._date.clone().subtract(1, 'iMonth'));
	}
	
	prevYear() {
		return new DateService(this._moment, this._date.clone().subtract(1, 'iYear'))
	}
	
	nextYear() {
		return new DateService(this._moment, this._date.clone().add(1, 'iYear'))
	}
	
	dateLang(sh = "en") {
		// this._moment = this._moment.localeData(sh);
		return this._moment.lang(sh)
	}

	toObject(format) {
		// var dateObject = this._date.toObject();
		return {
			year: this._date.iYear(),
			day: this._date.iDate(),
			month: this._date.iMonth()
		};
	}
	
	dispose(){
		this._date = null;
		this._moment = null;
	}
}

/*
export function month(month, date){
  return date !== undefined ? date.month(month) : moment().month(month);
}

export function year(year, date){
  return date !== undefined ? date.year(year) : moment().year(year);
}

export function day(year, date){
  return date !== undefined ? date.day(year) : moment().day(year);
}

export function startDayOfMonth(date){
  return date.weekday();
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

export function daysCount(date) {
  return date.daysInMonth();
}

export function nextMonth(date){
  return date.clone().add(1, 'month');
}

export function prevMonth(date){
  return date.clone().subtract(1, 'month');
}

export function prevYear(date){
}

export function nextYear(date){
}

export function dateLang(sh="en"){
  return moment.locale(sh);
}

*/