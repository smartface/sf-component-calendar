/* 
		Smarface Calendar Component
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const CalendarWeekRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const CalendarService = require("../services/CalendarService");
const CalendarContext = require("./CalendarContext");
const runner = require("../benchmarks/runner");

const weekRowStyle = {
	positionType: FlexLayout.PositionType.RELATIVE,
	marginTop: 4,
	flexGrow: 1
};

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super){
		// initalizes super class for this scope
		_super(this);
		
		this.children.navbar.onNext = function(){
			this.nextMonth();
		
		}.bind(this);
		
		this.children.navbar.onPrev = function(){
			this.prevMonth();
			// runner(this.prevMonth.bind(this), "prevMonth");
			// this.prevMonth();
		}.bind(this);
		
		this.buildRows();
		this.updateCalendar(CalendarService.getCalendarMonth());

		runner.add(this.nextMonth.bind(this), "nextMonth");
		runner.add(this.prevMonth.bind(this), "prevMonth");
		
		runner.runAll(3, function(res){
			res.forEach(function(item){
				console.log(item.asString);
			})
		});
	},
	function(proto){
		var currentMonth;
		const weeks = [];
		var selectedRow;
		
		function updateRows(days, date) {
			weeks.forEach(function(row, index){
				row.setDays(days[index], date);
			}.bind(this));
		}
		
		// when a day is selected by user
		function onDaySelected(row, index){
			const selectedDay = Object.assign({}, currentMonth.days[row][index]);
			const dayData = {};
			
			dayData.dayInfo = {
				weekDay: index,
				longName: currentMonth.daysLong[index],
				shortName: currentMonth.daysShort[index],
				day: selectedDay.day
			}
			
			switch (selectedDay.month) {
				// selected day owned by current month
				case 'current':
					dayData.monthInfo = {
						longName: currentMonth.longName,
						shortName: currentMonth.shortName,
						month: currentMonth.date.month + 1
					}
					
					dayData.year = currentMonth.date.year
					break;
				case 'next':
					dayData.monthInfo = {
						longName: currentMonth.nextMonth.longName,
						shortName: currentMonth.nextMonth.shortName,
						month: currentMonth.nextMonth.date.month + 1
					}
					
					dayData.year = currentMonth.nextMonth.date.year
					break;
				case 'previous':
					dayData.monthInfo = {
						longName: currentMonth.previousMonth.longName,
						shortName: currentMonth.previousMonth.shortName,
						month: currentMonth.previousMonth.date.month + 1
					}
					
					dayData.year = currentMonth.previousMonth.date.year
					break;
					
					default:
						throw new Error('Selected day has invalid data');
			}
			
			this.onChanged && this.onChanged(dayData);
		}
		
		proto.buildRows = function(){
			weeks.push(this.children.body.children.week1);
			weeks.push(this.children.body.children.week2);
			weeks.push(this.children.body.children.week3);
			weeks.push(this.children.body.children.week4);
			weeks.push(this.children.body.children.week5);
			weeks.push(this.children.body.children.week6);
			
			
			weeks.forEach(function(row, index){
				// this.children.body.addChild(row);
				row.onDaySelected = onDaySelected.bind(this, index);
				this.children["week"+index] = row;
			}.bind(this));
			
			this.context = CalendarContext.createContext(this);
		};
		
		proto.addStyles = function(styles) {
			this.context(styles);
		}
		
		proto.setSelectedDate = function(date){
			const newDate = Object.assign({}, date);
			newDate.month = date.month - 1;
			this.updateCalendar(CalendarService.getCalendarMonth(newDate));
			const index = (currentMonth.startDayOfMonth + currentMonth.date.day) % 7;
			const row = Math.ceil((currentMonth.startDayOfMonth + currentMonth.date.day) / 7);

			weeks[row-1].setSelectedIndex(index-1);
		}
		
		proto.updateCalendar = function(month){
			currentMonth = month;
			
			updateRows.call(this, month.days, month.date);
			this.children.navbar.setLabel(currentMonth.longName);
			this.children.navbar.setYear(currentMonth.date.year);
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
