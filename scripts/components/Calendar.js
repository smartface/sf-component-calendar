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
		
		this.updateCalendar();
	}, function(proto){
		proto.updateCalendar = function(){
			this.weeks.forEach(function(row, index){
				row.setDays(days[index]);
			}.bind(this));
		}
		
		proto.nextMonth = function(){
		}
		
		proto.prevMonth = function(){
		}
	}
);

module && (module.exports = Calendar);

