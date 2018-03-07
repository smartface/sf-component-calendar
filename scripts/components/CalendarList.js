const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const Calendar = require("./Calendar");

/**
 * CalendarList Component constructor
 * @constructor
 */
function CalendarList(_super) {
  _super(this);
  this.init();
}

CalendarList.$$styleContext = {
  "no-context": true
};

function CalendarListPrototype(proto){
  const currentMonthCalendar = new Calendar();
  const nextMonthCalendar = new Calendar();
  
  proto.init = function(){
    this.addChild(currentMonthCalendar);
    this.addChild(nextMonthCalendar);

    currentMonthCalendar.onDaySelect = onDaySelectinCurrent;
    nextMonthCalendar.onDaySelect = onDaySelectinNext;
  };
  
  function onDaySelectinCurrent(date){
		this.onDaySelect && this.onDaySelect(date);
	}
  
  function onDaySelectinNext(date){
		this.onDaySelect && this.onDaySelect(date);
	}
}

/**
 * CalendarList Component Class
 * @class
 * @type CalendarList
 */
const klass = extend(FlexLayout)(CalendarList, CalendarListPrototype);

module.exports = klass;
