/* 
		Smarface Calendar Component v.1.0.0
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const WeekDaysRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const CalendarService = require("../services/CalendarService");
const CalendarContext = require("./CalendarContext");

const weekRowStyle = {
	positionType: FlexLayout.PositionType.RELATIVE,
	marginTop: 4,
	flexGrow: 1
};

function createWeekRow(){
	return new WeekDaysRow(weekRowStyle);
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
			return Object.assign({}, currentMonth.date, {
					day: currentMonth.days[row][index]
				})
		}
		
		proto.buildRows = function(){
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			
			weeks.forEach(function(row, index){
				this.children.body.addChild(row);
				row.onDaySelected = function(){
					if(selectedRow){
						selectedRow.clearSelected();
					}
					selectedRow = row;
				};
				this.children["week"+index] = row;
			}.bind(this));
			
			CalendarContext.createContext(this);
		};
		
		proto.updateCalendar = function(month){
			currentMonth = month;
			console.log(JSON.stringify(month.date))
			
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
