/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Calendar  = require("../components/Calendar");
const NewPage004Design = require('ui/ui_newPage004');

const NewPage004 = extend(NewPage004Design)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    
    this.calendar = new Calendar({
      useRangeSelection: true,
      //theme: customTheme,
      justCurrentDays: true,
      useDaySelection: true
    });
    
    this.calendar.onDaySelect = function([dateInfo]) {
      alert(JSON.stringify(dateInfo, null, "\t"), "onDaySelect");
    };    
    this.layout.addChild(this.calendar);

    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
	this.calendar.changeCalendar("en", "gregorian", {});
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = NewPage004);