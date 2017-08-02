/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarNumberDesign = require('library/CalendarNumber');

const CalendarNumber = extend(CalendarNumberDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarNumberDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = CalendarNumber);

