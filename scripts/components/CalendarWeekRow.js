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
		
		data && this.setDays(data);
	},
	function(proto){
		proto.setDays = function(days){
			this.children.weekDay1.text = days[0];
			this.children.weekDay2.text = days[1];
			this.children.weekDay3.text = days[2];
			this.children.weekDay4.text = days[3];
			this.children.weekDay5.text = days[4];
			this.children.weekDay6.text = days[5];
			this.children.weekDay7.text = days[6];
		}
	}
);

module && (module.exports = CalendarWeekRow);
