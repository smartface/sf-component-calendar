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
		this.children.navbar.onNext = this.nextMonth.bind(this);
		this.children.navbar.onPrev = this.prevMonth.bind(this);
  	
    this.children.week.onDaySelected = this.selectDay.bind(this, null);
    this.pageName = pageName;
  },
  function(proto){
  	
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
		
		proto.selectDay = function(weekIndex, weekDayIndex){
			const state = this.calendarCore.getState();
			if(weekIndex === null && state.daysByIndex.length > 0){
				this.calendarCore.selectDay(state.daysByIndex[0].weekIndex, weekDayIndex);
			} else if(weekIndex !== null && weekDayIndex !== null) {
				this.calendarCore.selectDay(weekIndex, weekDayIndex);
			}
			this.onDaySelect && this.onDaySelect(this.calendarCore.getState().days);
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
		
    proto.nextWeek = function(){
			this.dispatch({
				type: "resetDays"
			});
    	
    	this.calendarCore.nextWeek();
    };
    
    proto.prevWeek = function(){
			this.dispatch({
				type: "resetDays"
			});
    	this.calendarCore.prevWeek();
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
			
			this.calendarCore.setDate(date);
		};
		
		proto.setSelectedDate = function(date) {
			this.dispatch({
				type: "resetDays"
			});
			this.calendarCore.setSelectedDate(date);
		};
		
		proto._selectDay = function({weekIndex, weekDayIndex}) {
			weekDayIndex != null
				&& this.children.week.setSelectedIndex(weekDayIndex);
		};
		
    proto.updateCalendar = function(newState, oldState){
      this.currentMonth = newState.month;
			newState.daysByIndex.length > 0 
				&& this.children.week.setDays(newState.month.days[newState.daysByIndex[0].weekIndex], newState.month.date);
			if(newState.month !== oldState.month){
				this.children.navbar.setLabel(newState.month.longName+" "+newState.month.localeDate.year);
				newState.month.daysMin.forEach(function(day, index) {
					this.children.calendarDays.children["dayName_" + index].text = day;
				}.bind(this));
			}
			
			newState.daysByIndex.map(newState.rangeSelectionMode === -1 
				? this._selectDay.bind(this)
				: this._selectDayasRange.bind(this)
			);
    };
  }
);

module && (module.exports = CalendarWeekly);
