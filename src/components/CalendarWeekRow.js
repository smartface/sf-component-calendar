/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarWeekRowDesign = require('library/CalendarWeekRow');

const CalendarWeekRow = extend(CalendarWeekRowDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarWeekRowDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = CalendarWeekRow);
