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

function createRow(){
	return new WeekDaysRow(weekRowStyle);
}

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super, props, options){
		// initalizes super class for this scope
		_super(this, props || CalendarDesign.defaults );
		
		this.children.navbar.onNext = function(){
			this.nextMonth();
		}.bind(this);
		
		this.children.navbar.onPrev = function(){
			this.prevMonth();
		}.bind(this);
		
		this.buildRows();
		this.updateCalendar(CalendarService.getCalendarMonth());
	},
	function(proto){
		var currentMonth;
		const weeks = [];
		var selectedRow;
		
		function updateRows(days) {
			weeks.forEach(function(row, index){
				row.setDays(days[index]);
			}.bind(this));
		}
		
		function onDaySelected(row, index){
		}
		
		proto.buildRows = function(){
			weeks.push(createRow());
			weeks.push(createRow());
			weeks.push(createRow());
			weeks.push(createRow());
			weeks.push(createRow());
			
			weeks.forEach(function(row){
				this.children.body.addChild(row);
				row.onDaySelected = function(){
					if(selectedRow)
						selectedRow.clearSelected();
					selectedRow = row;
				};
			}.bind(this));
		};
		
		proto.updateCalendar = function(month){
			currentMonth = month;
			
			updateRows.call(this, month.days);
			this.children.navbar.setLabel(currentMonth.longName +" "+currentMonth.date.year);
		};
		
		proto.nextMonth = function(){
			this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.nextMonth.date));
		}
		
		proto.prevMonth = function(){
			this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.previousMonth.date));
		}
	}
);

module && (module.exports = Calendar);
