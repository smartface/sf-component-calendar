/* 
		Smarface Calendar Component v.1.0.0
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const WeekDaysRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const CalendarService = require("../services/CalendarService");

const weekRowStyle = {
	positionType: FlexLayout.PositionType.RELATIVE,
	marginTop: 4,
	flexGrow: 1
};

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super, props, options){
		// initalizes super class for this scope
		_super(this, props || CalendarDesign.defaults );
		this.weeks = [];
		
		this.weeks.push(new WeekDaysRow(weekRowStyle));
		this.weeks.push(new WeekDaysRow(weekRowStyle));
		this.weeks.push(new WeekDaysRow(weekRowStyle));
		this.weeks.push(new WeekDaysRow(weekRowStyle));
		this.weeks.push(new WeekDaysRow(weekRowStyle));
		
		this.weeks.forEach(function(row){
			this.children.body.addChild(row);
		}.bind(this));

		this.updateCalendar(CalendarService.getCalendarMonth());
		
		this.children.navbar.onNext = function(){
			this.nextMonth();
		}.bind(this)
		
		this.children.navbar.onPrev = function(){
			this.prevMonth();
		}.bind(this);
		
	}, function(proto){
		var currentMonth;
		
		proto.updateCalendar = function(month){
			currentMonth = month;
			this.weeks.forEach(function(row, index){
				row.setDays(month.days[index]);
			}.bind(this));
			
			this.children.navbar.setLabel(currentMonth.longName +" "+currentMonth.date.year);
		}
		
		proto.nextMonth = function(){
			this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.nextMonth.date));
		}
		
		proto.prevMonth = function(){
			this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.previousMonth.date));
		}
	}
);

module && (module.exports = Calendar);
