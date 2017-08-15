/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarDayLabelDesign = require('library/CalendarDayLabel');

const CalendarDayLabel = extend(CalendarDayLabelDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarDayLabelDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = CalendarDayLabel);

