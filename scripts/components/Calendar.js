/* 
		Smarface Calendar Component
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const CalendarWeekRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const CalendarService = require("../services/CalendarService");
const CalendarContext = require("./CalendarContext");

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super){
		// initalizes super class for this scope
		_super(this);
		
		this.buildRows();
		this.init();
	},
	function(proto){
		var currentMonth;
		const weeks = [];
		
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
				// if selected day is in current month.
				case 'current':
					dayData.monthInfo = {
						longName: currentMonth.longName,
						shortName: currentMonth.shortName,
						month: currentMonth.date.month + 1
					}
					
					dayData.year = currentMonth.date.year
					break;
				// if selected day is in next month.
				case 'next':
					dayData.monthInfo = {
						longName: currentMonth.nextMonth.longName,
						shortName: currentMonth.nextMonth.shortName,
						month: currentMonth.nextMonth.date.month + 1
					}
					
					dayData.year = currentMonth.nextMonth.date.year
					break;
				// if selected day is in previous month.
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
		
		proto.setContextDispatcher = function(dispatcher){
			this.dispatch = dispatcher;
		}
		
		proto.init = function(argument) {
			this.children.navbar.onNext = function(){
				this.nextMonth();
			}.bind(this);
			
			this.children.navbar.onPrev = function(){
				this.prevMonth();
			}.bind(this);
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
				// this.children["week"+index] = row;
			}.bind(this));
			
			this.context = CalendarContext.createContext(this);
		};
		
		proto.now = function(){
			this.updateCalendar(CalendarService.getCalendarMonth());
			this.selectDay();
		}
		
		proto.addStyles = function(styles) {
			this.context(styles);
		}
		
		proto.setSelectedDate = function(date){
			const newDate = Object.assign({}, date);
			newDate.month = date.month - 1;
			const dateData = CalendarService.getCalendarMonth(newDate);
			this.updateCalendar(dateData);
		};
		
		proto.selectDay = function(){
			this.dispatch({
				type: "resetDays"
			})
			const totalDay = currentMonth.startDayOfMonth + currentMonth.date.day;
			const row = Math.ceil(totalDay / 7);
			const index = currentMonth.date.day - 1 - ((row-1) * 7 - currentMonth.startDayOfMonth);

			weeks[row-1].setSelectedIndex(index);
		}
		
		proto.updateCalendar = function(month){
			updateRows.call(this, month.days, month.date);
			this.children.navbar.setLabel(month.longName);
			this.children.navbar.setYear(month.date.year);
			currentMonth = month;
		};
		
		proto.nextMonth = function(){
			if(currentMonth){
				this.dispatch({
					type: "resetDays"
				});
				
				this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.nextMonth.date));
			}
		};
		
		proto.prevMonth = function(){
			if(currentMonth){
				this.dispatch({
					type: "resetDays"
				});
				
				this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.previousMonth.date));
			}
		};
	}
);

module && (module.exports = Calendar);
