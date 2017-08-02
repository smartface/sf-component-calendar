/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarWeekRowDesign = require('library/CalendarWeekRow');
const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

delete CalendarWeekRowDesign.defaults.width;
delete CalendarWeekRowDesign.defaults.height;

const CalendarWeekRow = extend(CalendarWeekRowDesign)(
	//constructor
	function(_super, props, data){
		// initalizes super class for this scope
		_super(this, Object.assign({},CalendarWeekRowDesign.defaults, props));
	}
);

module && (module.exports = CalendarWeekRow);
