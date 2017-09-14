/* 
		Smarface Calendar Component
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const CalendarWeekRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const createService = require("../services/CalendarService");
const CalendarContext = require("./CalendarContext");

function buildCalendar(view){
	return extend(view)(Calendar, function(proto){
		CalendarPrototype(proto);
	});
}

function Calendar(_super){
	// initalizes super class for this scope
	_super(this);
	
	this._specialDays = {};
	this.buildRows();
	this.init();
}

function CalendarPrototype(proto){
	var currentMonth;
	const weeks = [];
	
	proto.init = function() {
		this.children.navbar.onNext = function(){
			this.nextMonth();
		}.bind(this);
		
		this.children.navbar.onPrev = function(){
			this.prevMonth();
		}.bind(this);
	}
	
	function updateRows(days, date) {
		weeks.forEach(function(row, index){
			row.setDays(days[index], date);
		}.bind(this));
	}
	
	// when a day is selected by user
	function onDaySelected(row, index){
		const selectedDay = Object.assign({}, currentMonth.days[row][index]);
		const dayData = {};
		
		dayData.dayInfo = {
			weekDay: index,
			longName: currentMonth.daysLong[index],
			shortName: currentMonth.daysShort[index],
			specialDay: selectedDay.specialDay,
		};
		
		dayData.date = {
      day: selectedDay.day
    };
		
  	dayData.localeDate = {
  	  day: currentMonth.days[row][index].localeDay,
  		month: currentMonth.localeDate.month,
			year: currentMonth.localeDate.year,
		};
  	
		switch (selectedDay.month) {
			// if selected day is in the current month.
			case 'current':
				dayData.monthInfo = {
					longName: currentMonth.longName,
					shortName: currentMonth.shortName,
				};
				
				dayData.date.month = currentMonth.date.month;
				dayData.date.year = currentMonth.date.year;
				break;
			// if selected day is in the next month.
			case 'next':
				dayData.monthInfo = {
					longName: currentMonth.nextMonth.longName,
					shortName: currentMonth.nextMonth.shortName,
				};
				
			  dayData.localeDate.month = currentMonth.nextMonth.localeDate.month;
			  dayData.localeDate.year = currentMonth.nextMonth.localeDate.year;
				dayData.date.month = currentMonth.nextMonth.month;
				dayData.date.year = currentMonth.nextMonth.date.year;
				break;
			// if selected day is in the previous month.
			case 'previous':
				dayData.monthInfo = {
					longName: currentMonth.previousMonth.longName,
					shortName: currentMonth.previousMonth.shortName,
				};
				
			  dayData.localeDate.month = currentMonth.previousMonth.localeDate.month;
			  dayData.localeDate.year = currentMonth.previousMonth.localeDate.year;
				dayData.date.month = currentMonth.previousMonth.month;
				dayData.date.year = currentMonth.previousMonth.date.year;
				break;
				
				default:
					throw new Error('Selected day has invalid data');
		}
		
		this.onChanged && this.onChanged(dayData);
	}
	
	// to inject a context dispatcher
	proto.setContextDispatcher = function(dispatcher){
		this.dispatch = dispatcher;
	};
	
	proto.buildRows = function(){
		weeks.push(this.children.body.children.week1);
		weeks.push(this.children.body.children.week2);
		weeks.push(this.children.body.children.week3);
		weeks.push(this.children.body.children.week4);
		weeks.push(this.children.body.children.week5);
		weeks.push(this.children.body.children.week6);
		
		weeks.forEach(function(row, index){
			row.onDaySelected = onDaySelected.bind(this, index);
		}.bind(this));
		
		this.styleContext = CalendarContext.createContext(this);
	};
	
	proto.now = function(){
		this.updateCalendar(this._calendarService.getCalendarMonth());
		this._selectDay();
	};
	
	proto.addStyles = function(styles) {
		this.styleContext(styles);
	};
	
	proto.setSelectedDate = function(date){
		this.dispatch({
			type: "resetDays"
		});
		const newDate = Object.assign({}, date);
		newDate.month = date.month;
		const dateData = this._calendarService.getCalendarMonth(newDate);
		this.updateCalendar(dateData);
		this._selectDay(dateData);
	};
	
	proto._selectDay = function(){
    const start = currentMonth.startDayOfMonth - 1;
    const day = currentMonth.date.day - 1;
		const index = (start + day) % 7;
		const row = Math.ceil((start + day + 1) / 7);
		
		weeks[row-1].setSelectedIndex(index);
	};
	
	proto.updateCalendar = function(month){
		updateRows.call(this, month.days, month.date);
		this.children.navbar.setLabel(month.longName);
		this.children.calendarYear.setYear(month.localeDate.year);
		currentMonth = month;

		month.daysMin.forEach(function(day, index) {
			this.children.calendarDays.children["dayName_"+index].text = day;
		}.bind(this));
	};
	
	proto.onShow = function(){
		this.updateCalendar(currentMonth);
	};
	
	proto.nextMonth = function(){
		if(currentMonth){
			this.dispatch({
				type: "resetDays"
			});
			
			this.updateCalendar(this._calendarService.getCalendarMonth(currentMonth.nextMonth.normalizedDate));
		}
	};
	
	proto.changeCalendar = function(lang="en", type="gregorian", specialDays=null){
		this.dispatch({
			type: "resetDays"
		});
		
		this.dispatch({
			type: "changeCalendar",
			lang: lang,
		});
		
	  this._specialDays = specialDays || this._specialDays;
  	this._calendarService = createService({lang: lang, type: type, specialDays: specialDays});
		
		this._calendarService = createService({lang: lang, type: type, specialDays: this._specialDays});
		this.updateCalendar(this._calendarService.getCalendarMonth());
		this.applyLayout();
	};
	
	proto.dispose = function(){
		weeks = [];
		this.styleContext(null);
		this.dispatch = null;
		this.styleContext = null;
		this._calendarService = null;
		currentMonth = null;
		this.onChanged = null;
	};
	
	proto.prevMonth = function(){
		if(currentMonth){
			this.dispatch({
				type: "resetDays"
			});
			
			this.updateCalendar(this._calendarService.getCalendarMonth(currentMonth.previousMonth.normalizedDate));
		}
	};
};

module && (module.exports = buildCalendar(CalendarDesign));
