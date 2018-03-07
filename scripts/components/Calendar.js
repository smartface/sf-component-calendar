/* 
		Smarface Calendar Component
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const CalendarWeekRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const createService = require("../services/CalendarService");
const calendarContext = require("./calendarContext");

function buildCalendar(view) {
	return extend(view)(Calendar, function(proto) {
		CalendarPrototype(proto);
	});
}

function Calendar(_super) {
	// initalizes super class for this scope
	_super(this);

	this._specialDays = {};
	this.currentMonth;
	this.weeks = [];
	this.buildRows();
	this.init();
}

function CalendarPrototype(proto) {
	proto.init = function() {
		this.styleContext = calendarContext(this, "calendar");
		
		this.children.navbar.onNext = () => {
			this.nextMonth();
		};

		this.children.navbar.onPrev = () => {
			this.prevMonth();
		};
	}

	function updateRows(days, date) {
		// console.log(JSON.stringify(days)+"  :::  "+JSON.stringify(date));
		this.weeks.forEach(function(row, index) {
			row.setDays(days[index], date);
		}.bind(this));
	}

	// when a day is selected by user
	function onDaySelected(row, index) {
		const selectedDay = Object.assign({}, this.currentMonth.days[row][index]);
		const dayData = {};

		dayData.dayInfo = {
			weekDay: index,
			longName: this.currentMonth.daysLong[index],
			shortName: this.currentMonth.daysShort[index],
			specialDay: selectedDay.specialDay,
		};

		dayData.date = {
			day: selectedDay.day
		};

		dayData.localeDate = {
			day: this.currentMonth.days[row][index].localeDay,
			month: this.currentMonth.localeDate.month,
			year: this.currentMonth.localeDate.year,
		};

		switch(selectedDay.month) {
			// if selected day is in the current month.
			case 'current':
				dayData.monthInfo = {
					longName: this.currentMonth.longName,
					shortName: this.currentMonth.shortName,
				};

				dayData.date.month = this.currentMonth.date.month;
				dayData.date.year = this.currentMonth.date.year;
				break;
				// if selected day is in the next month.
			case 'next':
				dayData.monthInfo = {
					longName: this.currentMonth.nextMonth.longName,
					shortName: this.currentMonth.nextMonth.shortName,
				};

				dayData.localeDate.month = this.currentMonth.nextMonth.localeDate.month;
				dayData.localeDate.year = this.currentMonth.nextMonth.localeDate.year;
				dayData.date.month = this.currentMonth.nextMonth.date.month;
				dayData.date.year = this.currentMonth.nextMonth.date.year;
				break;
				// if selected day is in the previous month.
			case 'previous':
				dayData.monthInfo = {
					longName: this.currentMonth.previousMonth.longName,
					shortName: this.currentMonth.previousMonth.shortName,
				};

				dayData.localeDate.month = this.currentMonth.previousMonth.localeDate.month;
				dayData.localeDate.year = this.currentMonth.previousMonth.localeDate.year;
				dayData.date.month = this.currentMonth.previousMonth.date.month;
				dayData.date.year = this.currentMonth.previousMonth.date.year;
				break;

			default:
				throw new Error('Selected day has invalid data');
		}

		this.onDaySelect && this.onDaySelect(dayData);
	}

	// to inject a context dispatcher
	proto.buildRows = function() {
		this.weeks.push(this.children.body.children.week1);
		this.weeks.push(this.children.body.children.week2);
		this.weeks.push(this.children.body.children.week3);
		this.weeks.push(this.children.body.children.week4);
		this.weeks.push(this.children.body.children.week5);
		this.weeks.push(this.children.body.children.week6);

		this.weeks.forEach(function(row, index) {
			row.onDaySelected = onDaySelected.bind(this, index);
		}.bind(this));
	};

	proto.now = function() {
		this.updateCalendar(this._calendarService.getCalendarMonth());
		this._selectDay();
	};

	proto.addStyles = function(styles) {
		this.styleContext(styles);
	};
	
	proto.setDate = function(date) {
		this.dispatch({
			type: "resetDays"
		});
		const newDate = Object.assign({}, date);
		const dateData = this._calendarService.getCalendarMonth(newDate);
		this.updateCalendar(dateData);
	};

	proto.setSelectedDate = function(date) {
		this.setDate(date);
		const newDate = Object.assign({}, date);
		const dateData = this._calendarService.getCalendarMonth(newDate);
		this.updateCalendar(dateData);
		this._selectDay(dateData);
	};

	proto._selectDay = function() {
		const start = this.currentMonth.startDayOfMonth - 1;
		const day = this.currentMonth.date.day - 1;
		const index = (start + day) % 7;
		const row = Math.ceil((start + day + 1) / 7);

		this.weeks[row - 1].setSelectedIndex(index);
	};

	proto.updateCalendar = function(month) {
		updateRows.call(this, month.days, month.date);
		this.children.navbar.setLabel(month.longName);
		this.children.calendarYear.setYear(month.localeDate.year);
		this.currentMonth = month;

		month.daysMin.forEach(function(day, index) {
			this.children.calendarDays.children["dayName_" + index].text = day;
		}.bind(this));
	};

	proto.onShow = function() {
		this.updateCalendar(this.currentMonth);
	};

	proto.nextMonth = function() {
		if(this.onBeforeMonthChange &&
			 this.onBeforeMonthChange(this.currentMonth.nextMonth.normalizedDate) === false
		){
			return;
		}
		
		if(this.currentMonth) {
			this.dispatch({
				type: "resetDays"
			});

			this.updateCalendar(this._calendarService.getCalendarMonth(this.currentMonth.nextMonth.normalizedDate));
			this.onMonthChange && this.onMonthChange(this.currentMonth.nextMonth.normalizedDate);
		}
	};
	
	proto.subcribeContext = function(e){
		alert(JSON.stringify(e));
	};

	proto.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
		this.dispatch({
			type: "resetDays"
		});

		this.dispatch({
			type: "changeCalendar",
			lang: lang,
		});

		this._specialDays = specialDays || this._specialDays;
		this._calendarService = createService({
			lang: lang,
			type: type,
			specialDays: specialDays
		});

		// this._calendarService = createService({lang: lang, type: type, specialDays: this._specialDays});
		this.updateCalendar(this._calendarService.getCalendarMonth());
	};
	
	/**
	 * Disposes the Component instance
	 */
	proto.dispose = function() {
		this.weeks = [];
		this.styleContext(null);
		this.dispatch = null;
		this.styleContext = null;
		this._calendarService = null;
		this.currentMonth = null;
		this.onChanged = null;
	};
	
	proto.prevMonth = function() {
		if(this.onBeforeMonthChange &&
			 this.onBeforeMonthChange(this.currentMonth.previousMonth.normalizedDate) === false
		){
			return;
		}
		
		if(this.currentMonth) {
			this.dispatch({
				type: "resetDays"
			});

			this.updateCalendar(this._calendarService.getCalendarMonth(this.currentMonth.previousMonth.normalizedDate));
			this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
		}
	};
};

module && (module.exports = buildCalendar(CalendarDesign));
