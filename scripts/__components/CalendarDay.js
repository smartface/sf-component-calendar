/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarDayDesign = require('library/CalendarDay');

const CalendarDay = extend(CalendarDayDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarDayDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = CalendarDay);

