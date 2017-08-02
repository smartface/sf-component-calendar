/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const CalendarBody = extend(FlexLayout)(
	//constructor
	function(_super, props) {
		// initalizes super class for this component scope
		_super(this, props);


	});

CalendarBody.defaults = getCombinedStyle(".flexLayout .sfCalendar_block .sfCalendar_block", {});

module && (module.exports = CalendarBody);