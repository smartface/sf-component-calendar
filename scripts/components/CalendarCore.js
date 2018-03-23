const createService = require("../services/CalendarService").default;
const extend = require('js-base/core/extend');
const merge = require("@smartface/styler/lib/utils/merge");
const moment = require("moment");

//Private methods
/**
 * Returns initial state
 * @return {object}
 */
function getInitialState(){
	return {
	    month: {},
	    day: {},
	    rangeSelection: null,
	    rangeSelectionMode: -1,
	    selectedDays: [],
	    selectedDaysByIndex: []
	};
}

/**
 * Notifies subscibers
 *
 */
function notify(newState, oldState){
	this.subscribers.forEach((cb) => {
		cb(newState, oldState);
	});
}

/**
 * Calcucalte given day's week and weekday index
 * 
 * @param {number} startDayOfMonth
 * @param {number} day
 */
function calculateDatePosinCurrent(startDayOfMonth, day){
	const start = startDayOfMonth - 1;
	day = day - 1;
	const weekDayIndex = (start + day) % WEEKDAYS;
	const weekIndex = Math.ceil((start + day + 1) / WEEKDAYS) - 1;
	return {
		weekIndex,
		weekDayIndex
	};
}

const WEEKDAYS = 7;
const COLCOUNT = WEEKDAYS;
const ROWCOUNT = 6;

function calculateDatePosinNext(startDayOfCurrentMonth, daysCountofCurrentMonth, day){
	const start = daysCountofCurrentMonth - 1 + startDayOfCurrentMonth;
	const weekDayIndex = (start + day - 1) % WEEKDAYS;
	const weekIndex = Math.round((start + day + 1) / WEEKDAYS) - 1;

	return {
		weekIndex,
		weekDayIndex
	};
}

function calculateDatePosinPrev(startDayOfMonth, daysCountPrevMonth, day){
	const weekDayIndex = startDayOfMonth - daysCountPrevMonth - day - 1;
	
	return {
		weekIndex: 0,
		weekDayIndex: weekDayIndex < 0 ? 0 : weekDayIndex
	};
}

function getDatePos(date, currentMonth){
	const monthPos = (date.month === currentMonth.date.month && 'current')
		 || (date.month === currentMonth.nextMonth.date.month && 'next')
		 || (date.month === currentMonth.previousMonth.date.month && 'prev');
		 
	switch (monthPos) {
		case 'current':
			return calculateDatePosinCurrent(currentMonth.startDayOfMonth, date.day);
		case 'prev':
			if(currentMonth.days[0][0].day < date.day)
				return {
					weekIndex: -1,
					weekDayIndex: -1
				};
			return calculateDatePosinPrev(
				currentMonth.startDayOfMonth, 
				currentMonth.previousMonth.daysCount, 
				date.day
			);
		case 'next':
			if(currentMonth.days[ROWCOUNT-1][COLCOUNT-1].day < date.day)
				return {
					weekIndex: -1,
					weekDayIndex: -1
				};
			return calculateDatePosinNext(
				currentMonth.startDayOfMonth, 
				currentMonth.daysCount, 
				date.day
			);
		
		default:
			return {
					weekIndex: -2,
					weekDayIndex: -2
				}
	}	 
}

/**
 * @constructor
 */
const CalendarCore = function CalendarCore() {
	this._specialDays = {};
	
	//subclass initializer
	this.init && this.init();
	this._state = getInitialState();
	this.subscribers = [];
	this.changeCalendar("en-us", "gregorian");
	this.__locked = false;
};

CalendarCore.prototype.reset = function() {
	this.setState(getInitialState());
};

CalendarCore.prototype.selectDay = function(weekIndex, weekDayIndex) {
	if(this._state.rangeSelectionMode === 0) {
		this.completeRangeSelection(weekIndex, weekDayIndex);
	} else if(this._state.rangeSelectionMode === -1 || this._state.rangeSelectionMode === 1) {
		this.setState({
			rangeSelection: null,
			rangeSelectionMode: -1,
			selectedDays: [this._getDayData(weekIndex, weekDayIndex)],
			selectedDaysByIndex: [{weekIndex, weekDayIndex}]
		});
	}
};

/**
 * Select specified day
 * @private
 */
CalendarCore.prototype._getDayData = function(weekIndex, weekDayIndex) {
	const dayData = {};
	const currentMonth = this._state.month;
	
	if(currentMonth.days[weekIndex] === undefined) {
		throw new TypeError("WeekIndex : "+weekIndex+", weekDayIndex "+weekDayIndex+" selected day cannot be undefined");
	}

	const selectedDay = currentMonth.days[weekIndex][weekDayIndex];
	
	dayData.dayInfo = {
		weekDay: weekDayIndex,
		longName: currentMonth.daysLong[weekDayIndex],
		shortName: currentMonth.daysShort[weekDayIndex],
		specialDay: selectedDay.specialDay,
	};

	dayData.date = {
		day: selectedDay.day
	};

	dayData.localeDate = {
		day: currentMonth.days[weekIndex][weekDayIndex].localeDay,
		month: currentMonth.localeDate.month,
		year: currentMonth.localeDate.year,
	};

	switch(selectedDay.month) {
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
			dayData.date.month = currentMonth.nextMonth.date.month;
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
			dayData.date.month = currentMonth.previousMonth.date.month;
			dayData.date.year = currentMonth.previousMonth.date.year;
			break;

		default:
			throw new Error('Selected day has invalid data');
	}
	
    Object.seal(dayData);
	return dayData;
};

CalendarCore.prototype.clearRangeSelection = function() {
	if(this._state.rangeSelection !== null){
		this.setState({
			rangeSelection: null,
			rangeSelectionMode: -1,
			selectedDaysByIndex: [],
			selectedDays: []
		});
	}
};

/**
 * @private
 * @param {{start:object, end:object, current:object}} start
 */
CalendarCore.prototype._getRange = function({start, end, current}) {
	const days = [];
	const selectedDaysByIndex = [];
	const {month, year} = current && current.date || this._state.month.date;
	const startPos = getDatePos(start, this._state.month)
	const endPos = getDatePos(end, this._state.month)
	let startWeekIndex = startPos.weekIndex, endWeekIndex = endPos.weekIndex;
	
	if(this._state.rangeSelectionMode == 1 
		|| (this._state.rangeSelectionMode == 0 && start !== end)
	){
		if(start.month === end.month && start.month === month) {
			startWeekIndex = startPos.weekIndex;
			endWeekIndex = endPos.weekIndex;
		} else if(month === end.month && start.month < end.month) {
			startWeekIndex = -1;
			endWeekIndex = endPos.weekDayIndex < 0 ? ROWCOUNT-1 : endPos.weekIndex;
		} else if(month === start.month && month !== end.month) {
			startWeekIndex = startPos.weekIndex;
			endWeekIndex = endPos.weekDayIndex < 0 ? ROWCOUNT-1 : endPos.weekIndex;
		} else if(month !== end.month && month !== start.month) {
			const startDate = new Date(start.year, start.month, start.day)
			const endDate = new Date(end.year, end.month, end.day)
			const currentDate = new Date(year, month, 1);
			
			if(currentDate - startDate > 0 
				&& endDate - currentDate > 0
			){
				endPos.weekIndex = endWeekIndex = ROWCOUNT - 1;
				endPos.weekDayIndex = COLCOUNT - 1;
			} else {
				return {
					selectedDays: [],
					selectedDaysByIndex: []
				};
			}
		}
	} else if(this._state.rangeSelectionMode == 0){
		if(start.month !== month) {
			return {
				selectedDays: [],
				selectedDaysByIndex: []
			};
		} 
	}
	
	for(let i = startWeekIndex < 0 ? 0 : startWeekIndex; i <= endWeekIndex; i++){
		let startDayIndex = 0;
		let endDayIndex = COLCOUNT-1;

		if(startWeekIndex === i){
			startDayIndex = startPos.weekDayIndex;
		}
		
		if(endWeekIndex === i && endPos.weekDayIndex >= 0) {
			endDayIndex = endPos.weekDayIndex;
		}

		selectedDaysByIndex.push({weekIndex:i, weekDayIndexes: []});
		let weekDayIndexes = selectedDaysByIndex[selectedDaysByIndex.length-1].weekDayIndexes;
		
		for(let j = startDayIndex; j <= endDayIndex; j++){
			days.push(this._getDayData(i, j));
			weekDayIndexes.push(j);
		}
	}
	
	return {
		selectedDays: days,
		selectedDaysByIndex: selectedDaysByIndex
	};
};

CalendarCore.prototype.nextWeek = function(){
	const weekIndex = this._state.selectedDaysByIndex[0].weekIndex + 1;
	const weekDayIndex = null;
	
	this.setState({
		rangeSelection: null,
		rangeSelectionMode: -1,
		selectedDaysByIndex: [{weekIndex, weekDayIndex}]
	});
};

CalendarCore.prototype.prevWeek = function(){
	const weekIndex = this._state.selectedDaysByIndex[0].weekIndex - 1;
	const weekDayIndex = null;
	
	this.setState({
		rangeSelection: null,
		rangeSelectionMode: -1,
		selectedDaysByIndex: [{weekIndex, weekDayIndex}]
	});
};

CalendarCore.prototype.rangeSelection = function(weekIndex, weekDayIndex){
	if(this._state.rangeSelectionMode === -1)
		this.startRangeSelection(weekIndex, weekDayIndex);
	else if(this._state.rangeSelectionMode === 0)
		this.completeRangeSelection(weekIndex, weekDayIndex);
	else {
		this.clearRangeSelection();
		this.startRangeSelection(weekIndex, weekDayIndex);
	}
};

CalendarCore.prototype.startRangeSelection = function(weekIndex, weekDayIndex) {
	if(this._state.rangeSelectionMode === -1){
		const day = this._getDayData(weekIndex, weekDayIndex);

		const state = {
			rangeSelection: {
				start: day.date,
				end: day.date
			},
			rangeSelectionMode: 0
		};
		
		Object.assign(state, this._getRange(state.rangeSelection));
		this.setState(state);
	}
};

CalendarCore.prototype.completeRangeSelection = function(weekIndex, weekDayIndex) {
	if(this._state.rangeSelection.start.weekIndex >= weekIndex
		&& this._state.rangeSelection.start.weekDayIndex > weekDayIndex
	)
		return false;
	if(this._state.rangeSelectionMode === 0){
		const day = this._getDayData(weekIndex, weekDayIndex);

		const state = {
			rangeSelection: {
				start: this._state.rangeSelection.start, 
				end: day.date
			},
			rangeSelectionMode: 1
		};
		Object.assign(state, this._getRange(state.rangeSelection));
		this.setState(state);
	}
	
	return true;
};

CalendarCore.prototype.subscribe = function(cb){
	this.subscribers.push(cb);
	return () => this.unsubscribe(cb);
};

CalendarCore.prototype.unsubscribe = function(cb){
	this.subscribers = this.filter(_cb => cb != _cb);
};

// to inject a context dispatcher
CalendarCore.prototype.now = function() {
	this.setDate(new Date());
	this._selectDay();
};

CalendarCore.prototype.getWeekDay = function(){
	return calculateDatePosinCurrent(this._state.month.startDayOfMonth, this._state.month.date.day);
};

/**
 * @private
 *
 */
CalendarCore.prototype._selectDay = function() {
	const {weekIndex, weekDayIndex} = this.getWeekDay();
    this.setState({
    	selectedDays: [this._getDayData(weekIndex, weekDayIndex)],
        selectedDaysByIndex: [{
		    weekIndex: weekIndex,
		    weekDayIndex: weekDayIndex
		}]
    });
};

CalendarCore.prototype.getState = function(){
    return this._state;
};

CalendarCore.prototype.nextMonth = function() {
	if(this._state.month) {
		const state = getInitialState();
		state.rangeSelection = this._state.rangeSelection;
		state.rangeSelectionMode = this._state.rangeSelectionMode;
		state.month = this._calendarService.getCalendarMonth(this._state.month.nextMonth.normalizedDate);

		this.setState(state);
		
		if(this._state.rangeSelectionMode !== -1){
			const {start, end} = state.rangeSelection;
			const rangeState = Object.assign({}, state, this._getRange({start, end }));
			this.setState(rangeState);
		}

	}
};

CalendarCore.prototype.setState = function(state, canNotify=true){
	const oldState = this._state;
	const newState = Object.assign({}, this._state, state);
    Object.freeze(newState);
    this._state = newState;
	!this.__locked && notify.call(this, newState, oldState);
};

CalendarCore.prototype.setDate = function(date) {
	let dateObj = date;
	
	if(date instanceof Date){
		dateObj = {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
	}
	
	const month = this._calendarService.getCalendarMonth(dateObj);
	const selectedDaysByIndex = [ getDatePos(
		dateObj,
		month
	)];
	
	this.setState({
	    month,
	    rangeSelection: [],
	    rangeSelectionMode: -1,
	    selectedDays: [],
	    selectedDaysByIndex
	});
};

CalendarCore.prototype.setSelectedDate = function(date) {
	this.setDate(date);
	this._selectDay();
};

CalendarCore.prototype.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
	this._specialDays = specialDays || this._specialDays;
	this._calendarService = createService({
		lang: lang,
		type: type,
		specialDays: specialDays
	});
	
	const state = getInitialState();
	state.month = this._calendarService.getCalendarMonth();
	
	this.setState(state);
};

CalendarCore.prototype.prevMonth = function() {
	if(this._state.month) {
		const state = getInitialState();
		state.month = this._calendarService.getCalendarMonth(this._state.month.previousMonth.normalizedDate);

		state.rangeSelection = this._state.rangeSelection;
		state.rangeSelectionMode = this._state.rangeSelectionMode;
		this.setState(state);

		if(this._state.rangeSelectionMode !== -1){
			const {start, end} = state.rangeSelection;
			Object.assign(state, this._getRange({start, end}));
		}
		
		this.setState(state);
	}
};

module.exports = CalendarCore;
