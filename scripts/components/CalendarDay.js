/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarDayDesign = require('library/CalendarDay');
const Color = require('sf-core/ui/color');

const CalendarDay = extend(CalendarDayDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CalendarDayDesign.defaults );
		this.pageName = pageName;
	},
	function (proto) {
		proto.setSelected = function(){
			this.borderColor = Color.RED;
		}
		
		proto.clearSelected = function(){
			this.borderColor = Color.BLACK;
		}
	}
);

module && (module.exports = CalendarDay);

