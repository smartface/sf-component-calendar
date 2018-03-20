const createService = require("../services/CalendarService");
const extend = require('js-base/core/extend');
const merge = require("@smartface/styler/lib/utils/merge");

function getInitialState(){
	return {
	    // selectedWeekDay: {weekIndex: 0, weekDayIndex: 0},
	    month: {},
	    day: {},
	    rangeSelection: null,
	    rangeSelectionMode: -1,
	    days: [],
	    daysByIndex: []
	};
}

const CalendarCore = extend(function(){})(
	function CalendarCore(onStateChange) {
		this._specialDays = {};
		this.init();
		this.onStateChange = onStateChange;
		this._state = getInitialState();
		this.subscribers = [];
		this.changeCalendar("en-us", "gregorian");
		this.__locked = false;
	},
	function(proto) {
		proto.init = function() {
		};
		
		proto.reset = function() {
			this.setState(getInitialState());
		};
		
		proto.selectWeekDay = function(weekIndex, weekDayIndex) {
			if(this._state.rangeSelectionMode === 0){
				this.completeRangeSelection(weekIndex, weekDayIndex);
			} else if(this._state.rangeSelectionMode === -1 || this._state.rangeSelectionMode === 1){
				this.setState({
					rangeSelection: null,
					rangeSelectionMode: -1,
					days: [this._getSelectedWeekDay(weekIndex, weekDayIndex)], 
					daysByIndex: [{weekIndex, weekDayIndex}]
				});
			}
		};
		// 
		/**
		 * Select specified day
		 * @private
		 */
		proto._getSelectedWeekDay = function(weekIndex, weekDayIndex) {
			const dayData = {};
			const currentMonth = this._state.month;
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
		
		proto.clearRangeSelection = function() {
			if(this._state.rangeSelection !== null)
				this.setState({
					rangeSelection: null,
					rangeSelectionMode: -1
				});
		};

		proto._getRange = function({start, end}) {
			const days = [];
			const daysByIndex = [];
			
			for(let i = start.weekIndex; i <= end.weekIndex; i++){
				let startDayIndex = 0;
				let endDayIndex = 6;
				
				if(start.weekIndex === i){
					startDayIndex = start.weekDayIndex;
				}
				
				if(end.weekIndex === i) {
					endDayIndex = start.weekDayIndex;
				}

				daysByIndex.push({weekIndex:i, weekDayIndexes: []});
				let weekDayIndexes = daysByIndex[daysByIndex.length-1].weekDayIndexes;
				
				for(let j = startDayIndex; j <= endDayIndex; j++){
					days.push(this._getSelectedWeekDay(i, j));
					weekDayIndexes.push(j);
				}
			}
			
			return {
				days: days,
				daysByIndex: daysByIndex
			};
		};
		
		proto.rangeSelection = function(weekIndex, weekDayIndex){
			if(this._state.rangeSelectionMode === -1)
				this.startRangeSelection(weekIndex, weekDayIndex);
			else if(this._state.rangeSelectionMode === 0)
				this.completeRangeSelection(weekIndex, weekDayIndex);
			else {
				this.clearRangeSelection();
				this.startRangeSelection(weekIndex, weekDayIndex);
			}
		};
		
		proto.startRangeSelection = function(weekIndex, weekDayIndex) {
			if(this._state.rangeSelectionMode === -1){
				const state = {
					rangeSelection: {
						start: {weekIndex, weekDayIndex},
						end: {weekIndex, weekDayIndex}
					},
					rangeSelectionMode: 0
				};
				
				Object.assign(state, this._getRange(state.rangeSelection));
				this.setState(state);
			}
		};
		
		proto.completeRangeSelection = function(weekIndex, weekDayIndex) {
			if(this._state.rangeSelectionMode === 0){
				const state = {
					rangeSelection: {
						start: this._state.rangeSelection.start, 
						end: {weekIndex, weekDayIndex}
					},
					rangeSelectionMode: 1
				};
				Object.assign(state, this._getRange(state.rangeSelection));
				this.setState(state);
			}
		};
		
		proto.subscribe = function(cb){
			this.subscribers.push(cb);
			return () => this.unsubscribe(cb);
		};
		
		proto.unsubscribe = function(cb){
			this.subscribers = this.filter(_cb => cb != _cb);
		};
	
		// to inject a context dispatcher
		proto.now = function() {
			this.setDate(new Date())
			this._selectDay();
		};
	
		proto._selectDay = function() {
			const start = this._state.month.startDayOfMonth - 1;
			const day = this._state.month.date.day - 1;
			const index = (start + day) % 7;
			const row = Math.ceil((start + day + 1) / 7) - 1;
	        this.setState({
	        	days: [this._getSelectedWeekDay(row, index)],
	            daysByIndex: [{
	    		    weekIndex: row,
	    		    weekDayIndex: index
	    		}]
	        });
		};
		
		proto.getState = function(){
		    return this._state;
		};
	
		proto.nextMonth = function() {
			if(this._state.month) {
				const state = getInitialState();
				state.month = this._calendarService.getCalendarMonth(this._state.month.nextMonth.normalizedDate);
				this.setState(state);
			}
		};
		
		proto.setState = function(state, canNotify=true){
			const oldState = this._state;
			const newState = Object.assign({}, this._state, state);
		    Object.freeze(newState);
		    this._state = newState;
			!this.__locked && notify.call(this, newState, oldState);
		};
		
		proto.setDate = function(date) {
			this.setState({
			    month: this._calendarService.getCalendarMonth(date),
			    days: [],
			    daysByIndex: []
			});
		};
		
		proto.setSelectedDate = function(date) {
			this.setDate(date);
			this._selectDay();
		};
	
		proto.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
			this._specialDays = specialDays || this._specialDays;
			this._calendarService = createService({
				lang: lang,
				type: type,
				specialDays: specialDays
			});
			
			const state = getInitialState();
			state.month = this._calendarService.getCalendarMonth();
			// state.selectedWeekDay = {weekIndex: 0, weekDayIndex: -1};
			
			this.setState(state);
		};
		
		function notify(newState, oldState){
			this.subscribers.forEach((cb) => {
				cb(newState, oldState);
			});
			// this.onTick && this.onTick();
		}
		
		proto.prevMonth = function() {
			if(this._state.month) {
				const state = getInitialState();
				state.month = this._calendarService.getCalendarMonth(this._state.month.previousMonth.normalizedDate);
				this.setState(state);
			}
		};
	}
);

module.exports = CalendarCore;
