/* 
		Smarface Calendar Component v.1.0.0
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const CalendarWeekRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const CalendarService = require("../services/CalendarService");
const CalendarContext = require("./CalendarContext");

const weekRowStyle = {
	positionType: FlexLayout.PositionType.RELATIVE,
	marginTop: 4,
	flexGrow: 1
};

function createWeekRow(rowIndex){
	return new CalendarWeekRow(weekRowStyle, rowIndex);
}

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super, props, style){
		// initalizes super class for this scope
		_super(this, props || CalendarDesign.defaults);
		
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
			this.onChanged && this.onChanged(
				Object.assign(
					{},
					currentMonth.date, 
					{
						day: currentMonth.days[row][index].day
					}
				))
		}
		
		proto.buildRows = function(){
			weeks.push(createWeekRow(0));
			weeks.push(createWeekRow(1));
			weeks.push(createWeekRow(2));
			weeks.push(createWeekRow(3));
			weeks.push(createWeekRow(4));
			weeks.push(createWeekRow(5));
			
			weeks.forEach(function(row, index){
				this.children.body.addChild(row);
				row.onDaySelected = onDaySelected.bind(this);
				this.children["week"+index] = row;
			}.bind(this));
			
			CalendarContext.createContext(this);
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
