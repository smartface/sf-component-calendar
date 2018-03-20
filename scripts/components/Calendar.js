/* 
		Smarface Calendar Component
*/

const CalendarDesign = require('library/Calendar');
const CalendarCore = require("./CalendarCore");
const extend = require('js-base/core/extend');
const calendarContext = require("./calendarContext");

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
			row.onRangeSelect = this._onRangeSelectStart.bind(this, weekIndex);
		});
	},
	function(proto){
		function updateRows(days, date) {
			this.weeks.forEach(function(row, index) {
				row.setDays(days[index], date);
			}.bind(this));
		}
		
		// function activateRangeSelection(){
		// 	this.isRangeSelection = true;
		// }
		
		// function deactivateRangeSelection(){
		// 	this.isRangeSelection = false;
		// }
		
		proto._onRangeSelectStart = function (weekIndex, weekDayIndex) {
			this.onRangeSelectStart && this.onRangeSelectStart(weekIndex, weekDayIndex);
			// this.isRangeSelection !== true && activateRangeSelection.call(this);
			this.calendarCore.rangeSelection(weekIndex, weekDayIndex);
		};
		
		proto._onRangeSelectComplete = function (weekIndex, weekDayIndex) {
			this.onRangeSelectComplete && this.onRangeSelectComplete(this.calendarCore.getState().days);
			// deactivateRangeSelection.call(this);
		};
		
		proto.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
			this.dispatch({
				type: "changeCalendar",
				lang: lang
			});
			
			this.calendarCore.changeCalendar(lang, type, specialDays);
		};
		
		proto.updateCalendar = function(newState, oldState){
			if((oldState.rangeSelectionMode === -1 && newState.rangeSelectionMode === 0)
				|| (oldState.rangeSelectionMode === 1 && newState.rangeSelectionMode === -1)
			){
				this.dispatch({
					type: "deselectDays"
				});
			}
			
			if(newState.month !== oldState.month){
				this.currentMonth = newState.month;
				updateRows.call(this, newState.month.days, newState.month.date);
				this.children.navbar.setLabel(newState.month.longName);
				this.children.calendarYear.setYear(newState.month.localeDate.year);
			}
			
			// if(state.daysByIndex.length > 0)
			newState.daysByIndex.map(newState.rangeSelectionMode === -1 
				? this._selectDay.bind(this)
				: this._selectDayasRange.bind(this)
			);
	
			newState.month.daysMin.forEach(function(day, index) {
				this.children.calendarDays.children["dayName_" + index].text = day;
			}.bind(this));
		};
		
		proto.addStyles = function(styles) {
			this.styleContext(styles);
		};
		
		proto._selectDay = function({weekIndex, weekDayIndex}) {
			this.weeks[weekIndex].setSelectedIndex(weekDayIndex);
		};
		
		proto._selectDayasRange = function({weekIndex, weekDayIndexes}) {
			this.weeks[weekIndex].setRangeIndex(weekDayIndexes);
		};
		
		// move core
		proto.setDate = function(date) {
			const newDate = Object.assign({}, date);
			this.calendarCore.setDate(date);
		};
	
		//move core
		proto.setSelectedDate = function(date) {
			// this.setDate(date);
			this.calendarCore.setSelectedDate(date);
			// const state = this.calendarCore.getState();
			
			// state.selectedWeekDay.weekDayIndex > -1 
			// 	&& this._selectDay(state.selectedWeekDay.weekIndex, state.selectedWeekDay.weekDayIndex);
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
		};
		
		proto.prevWeek = function(){
		};
		
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
			this.onDaySelect && this.onDaySelect(this.calendarCore.getState().days);
		};
	}
);

module && (module.exports = Calendar);
