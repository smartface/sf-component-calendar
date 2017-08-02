/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarBodyDesign = require('library/CalendarBody');

const CalendarBody = extend(CalendarBodyDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarBodyDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = CalendarBody);
