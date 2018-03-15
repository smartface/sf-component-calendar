/* 
		Smarface Calendar Component
*/

const CalendarDesign = require('library/Calendar');
const CalendarCore = require("./CalendarCore");
const extend = require('js-base/core/extend');
const calendarContext = require("./calendarContext");

/*function buildCalendar(view) {
	return extend(view)(Calendar, function(proto) {
		CalendarPrototype(proto);
	});
}
*/

const Calendar = extend(CalendarDesign)(
	function Calendar(_super){
		_super(this);
		
		this.styleContext = calendarContext(this, "calendar");
		this.calendarCore = new CalendarCore();
		this.updateCalendar = this.updateCalendar.bind(this);
		this.calendarCore.subscribe(this.updateCalendar);
		this.weeks = [];
		
		this.children.navbar.onNext = this.nextMonth.bind(this);
		this.children.navbar.onPrev = this.prevMonth.bind(this);
		
		this.weeks.push(this.children.body.children.week1);
		this.weeks.push(this.children.body.children.week2);
		this.weeks.push(this.children.body.children.week3);
		this.weeks.push(this.children.body.children.week4);
		this.weeks.push(this.children.body.children.week5);
		this.weeks.push(this.children.body.children.week6);

		this.weeks.forEach((row, weekIndex) => {
			row.onDaySelected = this.selectWeekDay.bind(this, weekIndex);
		});
	},
	function(proto){
		function updateRows(days, date) {
			this.weeks.forEach(function(row, index) {
				row.setDays(days[index], date);
			}.bind(this));
		}
		
		proto.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
			this.dispatch({
				type: "changeCalendar",
				lang: lang
			});
			
			this.calendarCore.changeCalendar(lang, type, specialDays);
		};
		
		proto.updateCalendar = function(state){
			this.currentMonth = state.month;
			updateRows.call(this, state.month.days, state.month.date);
			this.children.navbar.setLabel(state.month.longName);
			this.children.calendarYear.setYear(state.month.localeDate.year);
	
			state.month.daysMin.forEach(function(day, index) {
				this.children.calendarDays.children["dayName_" + index].text = day;
			}.bind(this));
		};
		
		proto.addStyles = function(styles) {
			this.styleContext(styles);
		};
		
		proto._selectDay = function(row, index) {
			this.weeks[row - 1].setSelectedIndex(index);
		};
		
		// move core
		proto.setDate = function(date) {
			this.dispatch({
				type: "resetDays"
			});
			const newDate = Object.assign({}, date);
			this.calendarCore.setDate(date);
			// const dateData = this._calendarService.getCalendarMonth(newDate);
			// this.updateCalendar(dateData);
		};
	
		//move core
		proto.setSelectedDate = function(date) {
			this.setDate(date);
			const state = this.calendarCore.getState();
			this._selectDay(state.selectedWeekDay.weekIndex, state.selectedWeekDay.weekDayIndex);
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
				
				this.calendarCore.nextMonth();
				this.onMonthChange && this.onMonthChange(this.currentMonth.nextMonth.normalizedDate);
			}
		};
		
		proto.nextWeek = function(){
			
		}
		
		proto.prevWeek = function(){
			
		}
		
		proto.prevMonth = function() {
			if(this.onBeforeMonthChange &&
				 this.onBeforeMonthChange(this.currentMonth.previousMonth.normalizedDate) === false
			){
				return;
			}
			
			if(this.currentMonth) {
				// this.updateCalendar(this._calendarService.getCalendarMonth(this.currentMonth.previousMonth.normalizedDate));
				this.dispatch({
					type: "resetDays"
				});
				this.calendarCore.prevMonth();
				this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
			}
		};
		
		proto.selectWeekDay = function(weekIndex, weekDayIndex){
			this.calendarCore.selectWeekDay(weekIndex, weekDayIndex);
			this.onDaySelect && this.onDaySelect(this.calendarCore.getState().day);
		};
	}
);

module && (module.exports = Calendar);
