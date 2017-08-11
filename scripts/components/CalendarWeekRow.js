/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarWeekRowDesign = require('library/CalendarWeekRow');
const getCombinedStyle = require("library/styler-builder").getCombinedStyle;
const Color = require('sf-core/ui/color');

delete CalendarWeekRowDesign.defaults.width;
delete CalendarWeekRowDesign.defaults.height;
const CalendarWeekRowWithLabelDesign = require('library/CalendarWeekRow');

const CalendarWeekRow = extend(CalendarWeekRowWithLabelDesign)(
	//constructor
	function(_super, props, index){
		// initalizes super class for this scope
		_super(this, props || {});
		this.rowIndex = index;
		// data && this.setDays(data);
		this.init();
	},
	function(proto){
		var selectedIndex = -1;
		
		function addDaySelectEvent(day, index){
			day.onPress = selectDay.bind(this, index);
		}
		
		function selectDay(index){
			this.children["weekDay"+(index+1)].setSelected();
			selectedIndex = index;
			this.onDaySelected(this.rowIndex, index);
		}
		
		proto.getSelectedIndex = function(){
			return selectedIndex;
		}
		
		proto.setSelectedIndex = function(index){
			return selectDay.call(this, index);
		}
		
		proto.clearSelected = function(){
			selectedIndex > -1 && this.children["weekDay"+(selectedIndex+1)].clearSelected();
			selectedIndex = -1;
		}
		
		proto.init = function(){
			addDaySelectEvent.call(this, this.children.weekDay1, 0);
			addDaySelectEvent.call(this, this.children.weekDay2, 1);
			addDaySelectEvent.call(this, this.children.weekDay3, 2);
			addDaySelectEvent.call(this, this.children.weekDay4, 3);
			addDaySelectEvent.call(this, this.children.weekDay5, 4);
			addDaySelectEvent.call(this, this.children.weekDay6, 5);
			addDaySelectEvent.call(this, this.children.weekDay7, 6);
		}
		
		proto.setDays = function(days){
			this.children.weekDay1.setDay(days[0]);
			this.children.weekDay2.setDay(days[1]);
			this.children.weekDay3.setDay(days[2]);
			this.children.weekDay4.setDay(days[3]);
			this.children.weekDay5.setDay(days[4]);
			this.children.weekDay6.setDay(days[5]);
			this.children.weekDay7.setDay(days[6]);
		}
	}
);

module && (module.exports = CalendarWeekRow);
