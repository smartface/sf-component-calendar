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
		_super(this, props || {});
		this.pageName = pageName;
	},
	function (proto) {
		proto.setContextDispatcher = function(dispatcher){
			this.dispatch = dispatcher;
		};
		
		proto.setDay = function(data){
			// this.currentData = data;
			this.text = data.localeDay;
			this.dispatch({
				type: "changeState",
				data: data
			});
		}
		
		proto.setSelected = function(){
			this.dispatch({
				type: "daySelected"
			});
		}
		
		proto.clearSelected = function(){
		}
	}
);

module && (module.exports = CalendarDay);
