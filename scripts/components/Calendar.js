/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = Calendar);

