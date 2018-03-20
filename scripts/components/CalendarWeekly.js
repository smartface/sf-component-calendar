/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const CalendarCore = require("./CalendarCore");
const CalendarWeeklyDesign = require('library/CalendarWeekly');
const createService = require("../services/CalendarService");
const calendarContext = require("./calendarContext");

const CalendarWeekly = extend(CalendarWeeklyDesign)(
  //constructor
  function CalendarWeekly(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || {});

  	this.styleContext = calendarContext(this, "calendar");
  	this.calendarCore = new CalendarCore();
  	this.updateCalendar = this.updateCalendar.bind(this);
  	this.calendarCore.subscribe(this.updateCalendar);
  	
    this.children.week.onDaySelected = this.selectWeekDay.bind(this);
    this.pageName = pageName;
  },
  function(proto){
		proto.selectWeekDay = function(){
			// this.calendarCore.selectWeekDay(weekIndex, weekDayIndex);
			this.onDaySelect && this.onDaySelect(this.calendarCore.getState().day);
		};
  	
    proto.nextWeek = function(){
    };
    
		proto.changeCalendar = function(lang = "en", type = "gregorian", specialDays = null) {
			this.dispatch({
				type: "changeCalendar",
				lang: lang
			});
			
			this.calendarCore.changeCalendar(lang, type, specialDays);
		};
		
		proto._setDate = function(date) {
			this.dispatch({
				type: "resetDays"
			});
			const newDate = Object.assign({}, date);
			this.calendarCore.setDate(date);
			// const dateData = this._calendarService.getCalendarMonth(newDate);
			// this.updateCalendar(dateData);
		};
		
		proto.setSelectedDate = function(date) {
			this.dispatch({
				type: "resetDays"
			});
			this.calendarCore.setSelectedDate(date);
			this._selectDay();
		};
		
		proto._selectDay = function() {
			const state = this.calendarCore.getState();
			// this._selectDay(state.selectedWeekDay.weekIndex, state.selectedWeekDay.weekDayIndex);
			state.selectedWeekDay.weekDayIndex > -1 
				&& this.children.week.setSelectedIndex(state.selectedWeekDay.weekDayIndex);
		};
		
    proto.updateCalendar = function(state){
      this.currentMonth = state.month;
		// 	updateRows.call(this, state.month.days, state.month.date);
		// 	state.month.daysMin.forEach(function(day, index) {
		// 		this.children.calendarDays.children["dayName_" + index].text = day;
		// 	}.bind(this));
  		// updateRows.call(this, state.month.days, state.month.date);
  		// alert(JSON.stringify(state));
  		this.children.week.setDays(state.month.days[state.selectedWeekDay.weekIndex], state.month.date);
			// this.children.navbar.setLabel(state.month.longName);
			// this.children.calendarYear.setYear(state.month.localeDate.year);
	
			state.month.daysMin.forEach(function(day, index) {
				this.children.calendarDays.children["dayName_" + index].text = day;
			}.bind(this));
    };
    
    proto.prevWeek = function(){
      
    };
  }
);

module && (module.exports = CalendarWeekly);