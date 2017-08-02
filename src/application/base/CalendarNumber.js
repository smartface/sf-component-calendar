/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Button = require('sf-core/ui/button');
const Color = require('sf-core/ui/color');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const CalendarNumber = extend(Button)(
	//constructor
	function(_super, props) {
		// initalizes super class for this component scope
		_super(this, props);


	});

CalendarNumber.defaults = getCombinedStyle(".button", {
	borderRadius: 20,
	width: 62.93594772751267,
	height: 64.32432741732211,
	text: "",
	backgroundColor: Color.create(0, 255, 255, 255),
	borderWidth: 1,
	borderColor: Color.create(255, 185, 185, 185)
});

module && (module.exports = CalendarNumber);