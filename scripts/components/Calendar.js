/* 
		Smarface Calendar Component
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const CalendarWeekRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const createService = require("../services/CalendarService").default;
const CalendarContext = require("./CalendarContext");

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super){
		// initalizes super class for this scope
		_super(this);
		
		this.buildRows();
		this.init();
		this._calendarService = createService("en");
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
			};
			
			switch (selectedDay.month) {
				// if selected day is in the current month.
				case 'current':
					dayData.monthInfo = {
						longName: currentMonth.longName,
						shortName: currentMonth.shortName,
						month: currentMonth.date.month + 1
					};
					
					dayData.year = currentMonth.date.year;
					break;
				// if selected day is in the next month.
				case 'next':
					dayData.monthInfo = {
						longName: currentMonth.nextMonth.longName,
						shortName: currentMonth.nextMonth.shortName,
						month: currentMonth.nextMonth.date.month + 1
					};
					
					dayData.year = currentMonth.nextMonth.date.year;
					break;
				// if selected day is in the previous month.
				case 'previous':
					dayData.monthInfo = {
						longName: currentMonth.previousMonth.longName,
						shortName: currentMonth.previousMonth.shortName,
						month: currentMonth.previousMonth.date.month + 1
					};
					
					dayData.year = currentMonth.previousMonth.date.year;
					break;
					
					default:
						throw new Error('Selected day has invalid data');
			}
			
			this.onChanged && this.onChanged(dayData);
		}
		
		// to inject a context dispatcher
		proto.setContextDispatcher = function(dispatcher){
			this.dispatch = dispatcher;
		};
		
		proto.init = function(argument) {
			this.children.navbar.onNext = function(){
				this.nextMonth();
			}.bind(this);
			
			this.children.navbar.onPrev = function(){
				this.prevMonth();
			}.bind(this);
		};
		
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
			this.updateCalendar(this._calendarService.getCalendarMonth());
			this.selectDay();
		};
		
		proto.addStyles = function(styles) {
			this.context(styles);
		};
		
		proto.setSelectedDate = function(date){
			const newDate = Object.assign({}, date);
			newDate.month = date.month - 1;
			const dateData = this._calendarService.getCalendarMonth(newDate);
			this.updateCalendar(dateData);
			this.selectDay();
		};
		
		proto.selectDay = function(){
			const totalDay = currentMonth.startDayOfMonth + currentMonth.date.day;
			const row = Math.ceil(totalDay / 7);
			// use %7 to calculate
			const index = currentMonth.date.day - 1 - ((row-1) * 7 - currentMonth.startDayOfMonth);

			weeks[row-1].setSelectedIndex(index);
		};
		
		proto.updateCalendar = function(month){
			updateRows.call(this, month.days, month.date);
			this.children.navbar.setLabel(month.longName);
			this.children.navbar.setYear(month.date.year);
			currentMonth = month;

			month.daysShort.forEach(function(day, index) {
				this.children.calendarDays.children["dayName_"+index].text = day;
			}.bind(this));
		};
		
		proto.nextMonth = function(){
			if(currentMonth){
				this.dispatch({
					type: "resetDays"
				});
				
				this.updateCalendar(this._calendarService.getCalendarMonth(currentMonth.nextMonth.normalizedDate));
			}
		};
		
		proto.changeCalendar = function(lang, type){
			this.dispatch({
				type: "resetDays"
			});
			this._calendarService = createService(lang, type);
			this.updateCalendar(this._calendarService.getCalendarMonth());
		}
		
		proto.changeLang = function(lang){
			this.dispatch({
				type: "resetDays"
			});
			this._calendarService = createService(lang);
			this.updateCalendar(this._calendarService.getCalendarMonth());
		}
		
		proto.prevMonth = function(){
			if(currentMonth){
				this.dispatch({
					type: "resetDays"
				});
				
				this.updateCalendar(this._calendarService.getCalendarMonth(currentMonth.previousMonth.normalizedDate));
			}
		};
	}
);

module && (module.exports = Calendar);
