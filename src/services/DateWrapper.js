function notValidDateThrowanError(date, strDate) {
	if(!date.isValid()) {
		throw new Error(`[${strDate}] Specified date is not valid.`);
	}
}

function sortDays(days){
	return (num) => days[num]
}

export default class DateService {
	constructor(moment, date, format="DD-MM-YYYY"){
		this._moment = moment;
		
		if(moment.isMoment(date)){
			this._date = date.clone();
		} else {
			if(date instanceof Object){
				// date.month--;
				date.day = date.day || 1;
				date = `${date.day}-${date.month}-${date.year}`;
			}
			
			if(date){
				this._date = moment(date, format);
				notValidDateThrowanError(this._date, date);
			} else {
				this._date = moment();
			}
		}
		
		const firstDay = this.firstDayOfWeek();
		this.daysMap = [0, 1, 2, 3, 4, 5, 6].reduce((acc, num, index) => {
			if(index >= firstDay){
				acc[index - firstDay] = num;
			} else {
				acc[7 - firstDay + index] = num;
			}
			
			return acc;
		}, []);
	}
	
	weekOfYear() {
		return this._moment.week();
	}

	clone() {
		return this._moment.clone();
	}
	
	localeDate(){
		var now = this._date.clone();
		// const localeDate = {dayName: now.dayName(),day: now.format("D"), month: now.format("M"), year: now.format("YYYY")};
		const localeDate = {day: now.format("D"), month: now.format("M"), year: now.format("YYYY")};
		return {
			setDay(day) {
				localeDate.day = now.month(0).date(day).format("D");
				return this;
			},
			setMonth(month) {
				localeDate.month = now.month(month).format("M");
				return this;
			},
			setYear(year) {
				localeDate.year = now.year(year).format("YYYY");
				return this
			},
			getDate(){
				return {...localeDate};
			}
		}
		// return this._date.format("D-M-YYYY").toObject();
	}
	
	nextDay(){
		var newdate = this._date.clone()
		newdate.add(1, 'day');
		return new DateService(this._moment, newdate);	
	}
	
	prevDay(){
		var newdate = this._date.clone();
		newdate.subtract(1, 'day');
		return new DateService(this._moment, newdate);
	}
	
	fromDay(day){
		var newdate = this._date.clone().date(day);
		return new DateService(this._moment, newdate);	
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
	
	day() {
		return this._date().day();
	}
	
	startDayOfMonth() {
		return this._date.clone().date(1).weekday() + 1;
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
		return this.daysMap.map(sortDays(this._moment.localeData().weekdaysShort()));
	}
	
	weekdaysMin() {
		return this.daysMap.map(sortDays(this._moment.localeData().weekdaysMin()));
	}
	
	weekdaysLong() {
		return this.daysMap.map(sortDays(this._moment.localeData().weekdays()));
	}
	
	firstDayOfWeek() {
		return this._moment.localeData().firstDayOfWeek();
	}
	
	daysCount() {
		return this._date.daysInMonth();
	}
	
	nextMonth() {
		var newdate = this._date.clone()
		newdate.add(1, 'month');
		return new DateService(this._moment, newdate)
	}
	
	prevMonth() {
		var newdate = this._date.clone();
		newdate.subtract(1, 'month');
		return new DateService(this._moment, newdate);
	}
	
	prevYear() {}
	
	nextYear() {}
	
	isWeekend(day){
	  const wd = this._date.clone().date(day).day();
	  
	  return wd === 0 || wd === 6;
	}
	
	dateLang(sh = "en") {
		this._moment.updateLocale(sh);
	}

	toObject() {
		var dateObject = this._date.toObject();
		return {
			year: dateObject.years,
			day: dateObject.date,
			month: ++dateObject.months
		};
	}
	
	toNormalizedObject() {
		var dateObject = this._date.toObject();
		
		return {
			year: dateObject.years,
			day: dateObject.date,
			month: ++dateObject.months
		};
	}
	
	dispose(){
		this._date = null;
		this._moment = null;
	}
}
