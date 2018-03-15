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
    
    this.pageName = pageName;
  },
  function(proto){
    proto.nextWeek = function(){
      
    };
    
		proto.setSelectedDate = function(date) {
			this.setDate(date);
			const state = this.calendarCore.getState();
			this._selectDay(state.selectedWeekDay.weekIndex, state.selectedWeekDay.weekDayIndex);
		};
    
    proto.updateCalendar = function(state){
      this.currentMonth = state.month;
		// 	updateRows.call(this, state.month.days, state.month.date);
		// 	state.month.daysMin.forEach(function(day, index) {
		// 		this.children.calendarDays.children["dayName_" + index].text = day;
		// 	}.bind(this));
  		// updateRows.call(this, state.month.days, state.month.date);
  		this.week.setDays(state.month.days[state.selectedDay.weekIndex], state.month.date);
		  state.month.days,
			this.children.navbar.setLabel(state.month.longName);
			this.children.calendarYear.setYear(state.month.localeDate.year);
	
			state.month.daysMin.forEach(function(day, index) {
				this.children.calendarDays.children["dayName_" + index].text = day;
			}.bind(this));
    };
    
    proto.prevWeek = function(){
      
    };
  }
);

module && (module.exports = CalendarWeekly);