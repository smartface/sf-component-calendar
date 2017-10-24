import DateService from "./DateWrapper";

function notValidDateThrowanError(moment, date) {
	if(moment(date)
		.isValid()) {
		throw new Error("Specified date is not valid.");
	}
}

export default class HijriDateService extends DateService {
	constructor(moment, date, format="DD-MM-YYYY"){
		super(moment, date, format);
	}
	
	weekOfYear() {
		return this._moment.week();
	}

	clone() {
		return this._moment.clone();
	}
	
	month() {
		return this._date.format("iM");
	}
	
	year() {
		return this._date.format("iYYYY");
	}
	
	day() {
		return this._date.format("iD");
	}
	
	localeDate(){
		var now = this._date.clone();
		var self = this;
		const localeDate = {day: now.format("iD"), month: now.format("iM"), year: now.format("iYYYY")};
		const moment = this._moment;
		
		return {
			setDay(day) {
				localeDate.day = now.month(0).date(day).format("D");
				return this;
			},
			setMonth(month) {
				localeDate.month = now.month(month).format("iM");
				return this;
			},
			setYear(year) {
				localeDate.month = now.year(year).format("iYYYY");
				return this;
			},
			getDate(){
				return {...localeDate};
			},
		};
		// return this._date.format("D-M-YYYY").toObject();
	}
	
	startDayOfMonth() {
		return this._date.clone().iDate(1).weekday() + 1;
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
			month: this._date.iMonth() + 1
		};
	}
}
