import DateService from "./DateWrapper";

function notValidDateThrowanError(moment, date) {
	if(moment(date)
		.isValid()) {
		throw new Error("Specified date is not valid.");
	}
}

export default class HijriDateService extends DateService {
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
	
	day() {
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
