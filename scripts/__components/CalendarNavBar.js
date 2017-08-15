/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarNavBarDesign = require('library/CalendarNavBar');

const CalendarNavBar = extend(CalendarNavBarDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarNavBarDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = CalendarNavBar);

