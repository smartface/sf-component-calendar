import DateService from "./DateWrapper";

function notValidDateThrowanError(moment, date) {
	if(moment(date)
		.isValid()) {
		throw new Error("Specified date is not valid.");
	}
}

export default class HijriDateService extends DateService {
	constructor(moment, date){
		super(moment, date);
	}
	
	weekOfYear() {
		return this._moment.week();
	}

	clone() {
		return this._moment.clone();
	}
	
	month() {
  return this._date.toObject().months;
	}
	
	year() {
		return this._date().iYear();
	}
	
	day() {
		return this._date().iDay();
	}
	
	startDayOfMonth() {
		return this._date.clone().iDate(1).weekday();
	}
	
	monthsShort() {
		return this._date.localeData()._iMonthsShort;
	}
	
	monthShort() {
		return this._date.format("iMMM");
	}
	
	monthLong() {
		return this._date.format("iMMMM");
	}
	
	monthsLong() {
		return this._date.localeData()._iMonths;
	}
	
	weekdaysShort() {
		return this._moment.weekdaysShort();
	}
	
	weekdaysLong() {
		return this._moment.weekdays();
	}
	
	daysCount() {
		return this._moment(this._date).locale("en").iDaysInMonth();
	}
	
	nextMonth() {
		return new HijriDateService(this._moment, this._date.clone().add(1, 'iMonth'));
	}
	
	prevMonth() {
		return new HijriDateService(this._moment, this._date.clone().subtract(1, 'iMonth'));
	}
	
	prevYear() {
		return new HijriDateService(this._moment, this._date.clone().subtract(1, 'iYear'));
	}
	
	nextYear() {
		return new HijriDateService(this._moment, this._date.clone().add(1, 'iYear'));
	}
	
	toObject() {
		// var dateObject = this._date.toObject();
		return {
			year: this._date.iYear(),
			day: this._date.iDate(),
			month: this._date.iMonth()
		};
	}
}
