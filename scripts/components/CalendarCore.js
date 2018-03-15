const createService = require("../services/CalendarService");
const extend = require('js-base/core/extend');
const merge = require("@smartface/styler/lib/utils/merge");

const CalendarCore = extend(function(){})(
	function CalendarCore(onStateChange) {
		this._specialDays = {};
		this.init();
		this.onStateChange = onStateChange;
		this._state = {
		    selectedWeekDay: {weekIndex: 0, weekDayIndex: 0},
		    month: {},
		    day: {}
		};
		this.subscribers = [];
	},
	function(proto) {
		proto.init = function() {
		};
	
		// when a day is selected by user
		proto.selectWeekDay = function(weekIndex, weekDayIndex) {
			const dayData = {};
			const currentMonth = this.state.month;
			const selectedDay = Object.assign({}, currentMonth.days[weekIndex][weekDayIndex]);
	
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
	        
	        this.setState({day: dayData});
		};
		
		proto.subscribe = function(cb){
			this.subscribers.push(cb);
		};
		
		proto.unsubscribe = function(cb){
			this.subscribers = this.filter(_cb => cb != _cb);
		};
	
		// to inject a context dispatcher
		proto.now = function() {
			this._selectDay();
		};
	
		proto._selectDay = function() {
			const start = this.state.month.startDayOfMonth - 1;
			const day = this.state.month.date.day - 1;
			const index = (start + day) % 7;
			const row = Math.ceil((start + day + 1) / 7);
			
	        this.setState({
	            selectedWeekDay: {
	    		    weekIndex: row,
	    		    weekDayIndex: index
	    		}
	        });
		};
		
		proto.getState = function(){
		    return Object.assign({}, this.state);
		};
	
		proto.nextMonth = function() {
			if(this.state.month) {
				this.setState({
				    month: this._calendarService.getCalendarMonth(this.state.month.nextMonth.normalizedDate)
				});
			}
		};
		
		proto.setState = function(state){
		    this.state = Object.assign({}, this.state, state);
		    if(this._notifyTimeout)
		    	clearTimeout(this._notifyTimeout);
		    this._notifyTimeout = setTimeout(() => notify.call(this), 6);
		};
		
		proto.setDate = function(date) {
			this.setState({
			    month: this._calendarService.getCalendarMonth(date)
			});
		};
		
		proto.setSelectedDate = function(date) {
			this.setDate(date);
			const dateData = this._calendarService.getCalendarMonth(date);
			this.updateCalendar(dateData);
			this._selectDay(dateData);
		};
	
		proto.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
			this._specialDays = specialDays || this._specialDays;
			this._calendarService = createService({
				lang: lang,
				type: type,
				specialDays: specialDays
			});
	
			// this._calendarService = createService({lang: lang, type: type, specialDays: this._specialDays});
			this.setState({month: this._calendarService.getCalendarMonth()});
			this._selectDay();
			
		};
		
		function notify(){
			this.subscribers.forEach((cb) => {
				cb(this.getState());
			});
			this.onTick && this.onTick();
		}
		
		proto.prevMonth = function() {
			if(this.state.month) {
				this.setState({
				    month: this._calendarService.getCalendarMonth(this.state.month.previousMonth.normalizedDate)
				});
			}
		};
	}
);

module.exports = CalendarCore;
