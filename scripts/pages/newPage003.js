/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const NewPage003Design = require('ui/ui_newPage003');
const specialDays = require("./specialDays");
const Router = require("sf-core/ui/router");

const NewPage003 = extend(NewPage003Design)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
		this.calendar = this.children.calendarWeekly;
    delete this.children.calendarWeekly;
    
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.calendar.onDaySelect = function(date){
		// 	const day = date.date.day+"/"+(date.date.month)+"/"+date.date.year;
		// 	const sday = date.dayInfo.specialDay.length > 0 
		// 		? date.dayInfo.specialDay.join(" - ")
		// 		: "Ozel Gun Yok";
		}.bind(this);
		
		this.children.next.onPress = (argument) => {
		  this.calendar.nextWeek();
		}
		this.children.prev.onPress = (argument) => {
		  this.calendar.prevWeek();
		}
		
		this.children.now.onPress = (argument) => {
		  this.calendar.setSelectedDate(new Date());
		}
		this.children.back.onPress = (argument) => {
		  Router.go("page1");
		}
  });
function changeCalendar(lang, calendar, sp){
	this.calendar.changeCalendar(lang, calendar, sp);
// 	this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
	this.calendar.applyLayout();
}


/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
  
  changeCalendar.call(this, "en-us", "gregorian", specialDays);
  this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = NewPage003);