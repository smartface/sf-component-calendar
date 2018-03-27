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
	    rangeSelectionMode: RangeSelection.IDLE,
	    selectedDays: [],
	    selectedDaysByIndex: [],
	    weekIndex: 0
	};
}

function createDate({year, month, day}){
	return new Date(year, month, day);
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
function calculateDatePos(startDayOfMonth, day){
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
const COLCOUNT = WEEKDAYS - 1;
const ROWCOUNT = 5;

const RangeSelection = {
	IDLE: -1,
	STARTED: 0,
	COMPLETED: 1
}

function calculateDatePosinNext(startDayOfCurrentMonth, daysCountofCurrentMonth, day){
	const start = daysCountofCurrentMonth - 1 + startDayOfCurrentMonth;
	const weekDayIndex = (start + day - 1) % WEEKDAYS;
	const weekIndex = Math.round((start + day + 1) / WEEKDAYS) - 1;

	return {
		weekIndex: weekIndex > ROWCOUNT ? -2: weekIndex,
		weekDayIndex: weekIndex > ROWCOUNT ? -2: weekDayIndex
	};
}

function calculateDatePosinPrev(startDayOfMonth, daysCountPrevMonth, day){
	const weekDayIndex = startDayOfMonth - 2 - (daysCountPrevMonth - day);
	return {
		weekIndex: weekDayIndex < 0 ? -2: 0,
		weekDayIndex: weekDayIndex < 0 ? 0 : weekDayIndex
	};
}

function getDatePos(date, currentMonth, notValue=null){
	const monthPos = (date.month === currentMonth.date.month && 'current')
		 || (date.month === currentMonth.nextMonth.date.month && 'next')
		 || (date.month === currentMonth.previousMonth.date.month && 'prev');
	switch (monthPos) {
		case 'current':
			return calculateDatePos(currentMonth.startDayOfMonth, date.day);
		case 'prev':
			return calculateDatePosinPrev(
				currentMonth.startDayOfMonth, 
				currentMonth.previousMonth.daysCount, 
				date.day
			);
		case 'next':
			const posNext = calculateDatePosinNext(
				currentMonth.startDayOfMonth, 
				currentMonth.daysCount, 
				date.day
			);
			
			return posNext;
		
		default:
			return notValue;
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
	if(this._state.rangeSelectionMode === RangeSelection.STARTED) {
		this.completeRangeSelection(weekIndex, weekDayIndex);
	} else if(this._state.rangeSelectionMode === RangeSelection.IDLE || this._state.rangeSelectionMode === RangeSelection.COMPLETED) {
		this.setState({
			rangeSelection: null,
			rangeSelectionMode: RangeSelection.IDLE,
			selectedDays: [this._getDayData(weekIndex, weekDayIndex)],
			selectedDaysByIndex: [{weekIndex, weekDayIndex}]
		});
	}
};

/**
 * Select specified day
 * @private
 */
CalendarCore.prototype._getDayData = function(weekIndex, weekDayIndex, state) {
	const currentState = state || this._state;
	const dayData = {};
	const currentMonth = currentState.month;
	
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

CalendarCore.prototype.clearSelection = function() {
	if(this._state.rangeSelection !== null){
		this.setState({
			rangeSelection: null,
			rangeSelectionMode: RangeSelection.IDLE,
			selectedDaysByIndex: [{weekIndex:0, weekDayIndex: null}],
			selectedDays: []
		});
	}
};

function isValid(value, notvalue=false){
	return (value === false || value === undefined || value === null) 
			? notvalue 
			: value;
}

function isNotValid(value, notvalue=false){
	return isValid(value, notvalue) === notvalue ? value : notvalue;
}

function hasSameMonth(date1, date2){
	return date1.month === date2.month && date1.year === date2.year;
}

function inSameYear(date1, date2){
	return date1.year === date2.year;
}

function isMonthGreater(date1, date2){
	return (date1.month < date2.month && date1.year === date2.year) ? date1 : date2;
}

function monthMin(date1, date2){
	return date1.year < date2.year || 
		(date1.year === date2.year && date1.month <= date2.month)
			? date1 
			: date2;
}

function monthMax(date1, date2){
	return monthMin(date1, date2) === date1 ? date2: date1;
}

function notValidRangePoint(){
	return {
		weekIndex: -2,
		weekDayIndex: -2
	};
}

function validateRangePoint(point, month){
	return inSameYear(point, month.date) 
		? isValid(
			getDatePos(point, month),
			notValidRangePoint()
  		  )
		: notValidRangePoint();
}

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

/**
 * @private
 * @param {{start:object, end:object, current:object}} start
 */
CalendarCore.prototype._getRange = function({start, end, state=null}) {
	const days = [];
	const selectedDaysByIndex = [];
	const currentState = state || this._state;
	const currentMonth = currentState.month;
	const currentDate = currentMonth.date;
	const {month, year} = currentDate;
	const startPos = validateRangePoint(start, currentMonth);
	const endPos = validateRangePoint(end, currentMonth);
	let startWeekIndex = startPos.weekIndex, endWeekIndex = endPos.weekIndex;
	const currentMonthintheSelection = monthMin(end, currentDate) === currentDate 
		&& monthMax(start, currentDate) === currentDate;
	const startInCurrentPage = startPos.weekIndex !== -2;
	const endInCurrentPage = endPos.weekIndex !== -2;
	const startorEndareinCurrentPage = startInCurrentPage && endInCurrentPage;
	
	if(currentState.rangeSelectionMode === RangeSelection.COMPLETED
		|| (currentState.rangeSelectionMode === RangeSelection.STARTED && start !== end)
	){
		if(currentMonthintheSelection || startorEndareinCurrentPage) {
			startWeekIndex = startPos.weekIndex;
			endWeekIndex = endPos.weekDayIndex < 0 ? ROWCOUNT : endPos.weekIndex;
		} else if( currentMonthintheSelection 
				   && monthMin(end, currentDate) === currentDate 
				   && monthMin(start, currentDate) === start
			   ) {
			endPos.weekIndex = endWeekIndex = ROWCOUNT;
			endPos.weekDayIndex = COLCOUNT;
		} 
	} 
	
	for(let i = startWeekIndex < 0 ? 0 : startWeekIndex; i <= endWeekIndex; i++){
		let startDayIndex = 0;
		let endDayIndex = COLCOUNT;

		if(startWeekIndex === i){
			startDayIndex = startPos.weekDayIndex;
		}
		
		if(endWeekIndex === i && endPos.weekDayIndex >= 0) {
			endDayIndex = endPos.weekDayIndex;
		}

		selectedDaysByIndex.push({weekIndex:i, weekDayIndexes: []});
		let weekDayIndexes = selectedDaysByIndex[selectedDaysByIndex.length-1].weekDayIndexes;
		
		for(let j = startDayIndex; j <= endDayIndex; j++){
			days.push(this._getDayData(i, j, currentState));
			weekDayIndexes.push(j);
		}
	}
	
	// alert(startWeekIndex+" "+endWeekIndex+" "+JSON.stringify(startPos)+" "+JSON.stringify(endPos));
	// console.log(JSON.stringify(start)+" "+JSON.stringify(end));
	
	return {
		selectedDays: days,
		selectedDaysByIndex: selectedDaysByIndex
	};
};

CalendarCore.prototype.nextWeek = function(){
	if(this._state.weekIndex + 1 === ROWCOUNT){
		const state = this._nextMonth();
		state.weekIndex = 0;

		this.setState(state);
	} else {
		this.setState({
			weekIndex: this._state.weekIndex + 1
		});
	}
};

CalendarCore.prototype.prevWeek = function(){
	if(this._state.weekIndex === 0){
		const state = this._prevMonth();
		state.weekIndex = ROWCOUNT-1;

		this.setState(state);
	} else {
		this.setState({
			weekIndex: this._state.weekIndex - 1
		});
	}
};

CalendarCore.prototype.setRangeSelection = function(start, end){
	const state = this._setDate(Object.assign({}, start));
	state.rangeSelection = {
		start: Object.assign({}, start),
		end: Object.assign({}, end)
	};
	state.rangeSelectionMode = RangeSelection.STARTED;
	Object.assign(state, this._getRange({start, end, state}));
	state.rangeSelectionMode = RangeSelection.COMPLETED;
	this.setState(state);
};

CalendarCore.prototype.rangeSelection = function(weekIndex, weekDayIndex){
	if(this._state.rangeSelectionMode === RangeSelection.IDLE){
		this.startRangeSelection(weekIndex, weekDayIndex);
	} else if(this._state.rangeSelectionMode === RangeSelection.STARTED){
		this.completeRangeSelection(weekIndex, weekDayIndex);
	} else {
		this.clearSelection();
		this.startRangeSelection(weekIndex, weekDayIndex);
	}
};

CalendarCore.prototype.startRangeSelection = function(weekIndex, weekDayIndex) {
	if(this._state.rangeSelectionMode === RangeSelection.IDLE){
		const day = this._getDayData(weekIndex, weekDayIndex);
		const state = {
			rangeSelection: {
				start: day.date,
				end: day.date
			},
			rangeSelectionMode: RangeSelection.STARTED
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
	if(this._state.rangeSelectionMode === RangeSelection.STARTED){
		const day = this._getDayData(weekIndex, weekDayIndex);

		const state = {
			rangeSelection: {
				start: this._state.rangeSelection.start, 
				end: day.date
			},
			rangeSelectionMode: RangeSelection.COMPLETED
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
	return calculateDatePos(this._state.month.startDayOfMonth, this._state.month.date.day);
};

CalendarCore.prototype.getState = function(){
    return this._state;
};

/**
 * @private
 *
 */
CalendarCore.prototype._nextMonth = function() {
	const state = getInitialState();
	if(this._state.month) {
		state.rangeSelection = this._state.rangeSelection;
		state.rangeSelectionMode = this._state.rangeSelectionMode;
		state.selectedDays = this._state.selectedDays;
		state.month = this._calendarService.getCalendarMonth(this._state.month.nextMonth.normalizedDate);

		if(this._state.rangeSelectionMode === RangeSelection.IDLE && this._state.selectedDays.length === 1)
			state.selectedDaysByIndex = [getDatePos(this._state.selectedDays[0].date, state.month, {weekIndex:-2, weekDayIndex: null})];

		if(this._state.rangeSelectionMode !== RangeSelection.IDLE){
			const {start, end} = state.rangeSelection;
			Object.assign(state, this._getRange({start, end, state }));
		}
	}
	
	return state;
};

CalendarCore.prototype.nextMonth = function() {
	this.setState(this._nextMonth());
};

CalendarCore.prototype.setState = function(state, canNotify=true){
	const oldState = this._state;
	const newState = Object.assign({}, this._state, state);
    Object.freeze(newState);
    this._state = newState;
	!this.__locked && notify.call(this, newState, oldState);
};

CalendarCore.prototype._setDate = function(date) {
	let dateObj = date;
	
	if(date instanceof Date){
		dateObj = {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
	}
	
	const month = this._calendarService.getCalendarMonth(dateObj);
	const selectedDaysByIndex = getDatePos(
		dateObj,
		month
	);
	
	return {
	    month,
	    weekIndex: selectedDaysByIndex !== null ? selectedDaysByIndex.weekIndex : 0
	};
};

CalendarCore.prototype.setDate = function(date) {
	this.setState(this._setDate(date));
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

/**
 * @private
 *
 */
CalendarCore.prototype._prevMonth = function() {
	const state = getInitialState();

	if(this._state.month) {
		state.month = this._calendarService.getCalendarMonth(this._state.month.previousMonth.normalizedDate);
		state.selectedDays = this._state.selectedDays;
		state.rangeSelection = this._state.rangeSelection;
		state.rangeSelectionMode = this._state.rangeSelectionMode;
		
		if(this._state.rangeSelectionMode === RangeSelection.IDLE && this._state.selectedDays.length === 1)
			state.selectedDaysByIndex = [getDatePos(this._state.selectedDays[0].date, state.month, {weekIndex:-2, weekDayIndex: null})];
		
		if(this._state.rangeSelectionMode !== RangeSelection.IDLE){
			const {start, end} = state.rangeSelection;
			Object.assign(state, this._getRange({start, end, state}));
		}
	}
	
	return state;
};

CalendarCore.prototype.prevMonth = function() {
	this.setState(this._prevMonth());
};

module.exports = CalendarCore;
