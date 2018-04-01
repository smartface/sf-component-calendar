/* 
		Smarface Calendar Component
*/

const CalendarDesign = require('library/Calendar');
const CalendarCore = require("./CalendarCore");
const extend = require('js-base/core/extend');
const calendarContext = require("./calendarContext");
const themeFile = require("../theme.json");

function getOptions({
			useRangeSelection=true,
			theme=null,
			justCurrentDays=false,
			lang="en",
			calendarType="georgian",
			specialDays={},
			calendarCore=null,
			context=null,
			useDaySelection=true
		}){
	
	return {
		justCurrentDays,
		useRangeSelection,
		theme,
		lang,
		calendarType,
		specialDays,
		calendarCore,
		context,
		useDaySelection
	};
}

function Calendar(_super, options){
	_super(this);
	
	this.__options = getOptions(options || {});
	
	const {
		useRangeSelection,
		justCurrentDays,
		theme,
		calendarCore,
		context,
		useDaySelection
	} = this.__options;
	
	this.styleContext = context || calendarContext(this, "calendar", theme || themeFile);
	this.calendarCore = calendarCore || new CalendarCore();
	this._updateCalendar = this._updateCalendar.bind(this);
	this._unsubsciber = this.calendarCore.subscribe(this._updateCalendar);
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
		if(useDaySelection !== false){
			row.onDaySelected = this.selectDay.bind(this, weekIndex);
		}
		if(useRangeSelection !== false){
			row.onRangeSelect = this._onRangeSelect.bind(this, weekIndex);
		}
	});
}

// Calendar.$$styleContext = {
// 	'no-context': true
// };

module.exports = extend(CalendarDesign)(
	Calendar,
	function(proto){
		function updateRows(days, date) {
			this.weeks.forEach((row, index) => {
				row.setDays(days[index], this.__options.justCurrentDays);
			});
		}
		
		proto._onRangeSelect = function (weekIndex, weekDayIndex) {
			// this.onBeforeRangeSelectStart && this.onBeforeRangeSelectStart(weekIndex, weekDayIndex);
			// this.isRangeSelection !== true && activateRangeSelection.call(this);
			this.calendarCore.rangeSelection(weekIndex, weekDayIndex);
			const state = this.calendarCore.getState();
			
			if(state.rangeSelectionMode === 0){
				this.onRangeSelectionStart 
					&& this.onRangeSelectionStart(Object.assign({}, state.rangeSelection.start));
			} else if(state.rangeSelectionMode === 1){
				this.onRangeSelectionComplete 
					&& this.onRangeSelectionComplete(Object.assign({}, state.rangeSelection.start), Object.assign({}, state.rangeSelection.end));
			}
		};
		
		proto.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
			this.dispatch({
				type: "changeCalendar",
				lang: lang
			});
			
			this.calendarCore.changeCalendar(lang, type, specialDays);
		};
		
		/**
		 * Subscribes to calendar-core and renders calendar when state is changed
		 * @param {object} newState
		 * @param {object} oldState
		 */
		proto._updateCalendar = function(newState, oldState){
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
				this.children.navbar.setLabel(newState.month.longName+" "+newState.month.localeDate.year);
				
				let itemsCount = 0;
				
				this.weeks.forEach((weekItem, index) => {
					if(weekItem.isEmpty() === false){
						itemsCount++;
					}
				});
				
				const height = itemsCount*this.weeks[0].height;
				
				// this.children.body.visible = false;
				this.children.body.dispatch({
					type: "updateUserStyle",
					userStyle: {
						maxHeight: height,
						height,
					}
				});
				
				this.applyLayout();
			}
			
			newState.selectedDaysByIndex.map(newState.rangeSelectionMode === -1 
				? this._selectDay.bind(this)
				: this._selectDayasRange.bind(this)
			);
	
			newState.month.daysMin.forEach((day, index) => {
				this.children.calendarDays.children["dayName_" + index].text = day;
			});
		};
		
		/**
		 * Changes calendar styles
		 * @param {object} styles
		 */
		proto.addStyles = function(styles) {
			this.styleContext(styles);
		};
		
		proto._selectDay = function({weekIndex, weekDayIndex}) {
			weekIndex >= 0 && weekDayIndex != null
				&& this.weeks[weekIndex].setSelectedIndex(weekDayIndex);
		};
		
		proto._selectDayasRange = function({weekIndex, weekDayIndexes}) {
			if(this.weeks[weekIndex] === undefined)
				throw new TypeError(`${weekIndex} Week cannot be undefined`);
			this.weeks[weekIndex].setRangeIndex(weekDayIndexes);
		};
		
		/**
		 * Set calendar day without the day selection
		 * @param {{month:number, year:number, day:number}} date
		 */
		proto.setDate = function(date) {
			this.dispatch({
				type: "deselectDays"
			});
			const newDate = Object.assign({}, date);
			this.calendarCore.setDate(newDate);
		};
		
		proto.setRangeDates = function(start, end) {
			this.dispatch({
				type: "deselectDays"
			});
			this.calendarCore.setRangeSelection(start, end);
		};
		
		/**
		 * Set calendar date and highlight the day
		 * @param {{month:number, year:number, day:number}} date
		 */
		proto.setSelectedDate = function(date) {
			this.dispatch({
				type: "deselectDays"
			});
			this.calendarCore.setSelectedDate(date);
		};
		
		/**
		 * Disposes the Component instance
		 */
		proto.dispose = function() {
			this._unsubsciber();
			this._unsubsciber = null;
			this.calendarCore = null;
			this.weeks = [];
			this.styleContext(null);
			this.dispatch = null;
			this.styleContext = null;
			this._calendarService = null;
			this.currentMonth = null;
			this.onChanged = null;
		};
		
		/**
		 * Changes current to next month
		 *
		 */
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
		
		/**
		 * Changes selected date to now
		 *
		 */
		proto.now = function(){
			this.calendarCore.now();
		};
		
		/**
		 * Changes current to previous month
		 *
		 */
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
				this.calendarCore.prevMonth();
				this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
			}
		};
		
		proto.selectDay = function(weekIndex, weekDayIndex){
			this.calendarCore.selectDay(weekIndex, weekDayIndex);
			this.onDaySelect && this.onDaySelect(this.calendarCore.getState().selectedDays || []);
		};
	}
);

