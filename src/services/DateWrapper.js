function notValidDateThrowanError(moment, date) {
	if(moment(date)
		.isValid()) {
		throw new Error("Specified date is not valid.");
	}
}

export default class DateService {
	constructor(moment, date){
		this._moment = moment;
		this._date = moment(date);
		// notValidDateThrowanError(moment, date);
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
		return this._date().year();
	}
	
	day(day, date) {
		return this._date().day();
	}
	
	startDayOfMonth() {
		return this._date.clone().date(1).weekday();
	}
	
	monthsShort() {
		return this._moment.monthsShort();
	}
	
	monthShort() {
		return this._moment.monthsShort(this._date.month());
	}
	
	monthLong() {
		return this._moment.months(this._date.month());
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
		return this._date.daysInMonth();
	}
	
	nextMonth(moment, date) {
		return new DateService(this._moment, this._date.clone().add(1, 'month'))
	}
	
	prevMonth(date) {
		return new DateService(this._moment, this._date.clone().subtract(1, 'month'));
	}
	
	prevYear(date) {}
	
	nextYear(date) {}
	
	dateLang(sh = "en") {
		this._moment.updateLocale(sh);
	}

	toObject() {
		var dateObject = this._date.toObject();
		return {
			year: dateObject.years,
			day: dateObject.date,
			month: dateObject.months
		};
	}
	
	toNormalizedObject() {
		var dateObject = this._date.toObject();
		
		return {
			year: dateObject.years,
			day: dateObject.date,
			month: dateObject.months
		};
	}
	
	dispose(){
		this._date = null;
		this._moment = null;
	}
}
