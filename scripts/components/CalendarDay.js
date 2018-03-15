/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const CalendarDayDesign = require('library/CalendarDay');

const CalendarDay = extend(CalendarDayDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || {});
		this.pageName = pageName;
		this.children.dayNum.onPress = (e) => {
			this.onPress && this.onPress.call(this, e);
		};
	},
	function (proto) {
		proto.setDay = function(data){
			this.children.dayNum.text = data.localeDay;
			this.children.dayNum.dispatch({
				type: "updateDayType",
				data: data
			});
		};
		
		proto.setSelected = function(){
			this.children.dayNum.dispatch({
				type: "daySelected"
			});
		};
		
		proto.clearSelected = function(){
		};
	}
);

module && (module.exports = CalendarDay);
