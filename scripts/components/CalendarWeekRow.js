/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarWeekRowDesign = require('library/CalendarWeekRow');
const getCombinedStyle = require("library/styler-builder").getCombinedStyle;
const Color = require('sf-core/ui/color');

delete CalendarWeekRowDesign.defaults.width;
delete CalendarWeekRowDesign.defaults.height;

const CalendarWeekRow = extend(CalendarWeekRowDesign)(
	//constructor
	function(_super, props, data, index){
		// initalizes super class for this scope
		_super(this, Object.assign({},CalendarWeekRowDesign.defaults, props));
		this.rowIndex = index;
		data && this.setDays(data);
		this.init();
	},
	function(proto){
		var selectedIndex = -1;
		
		function addDaySelectEvent(day, index){
			day.onPress = daySelected.bind(this, index);
		}
		
		function daySelected(index){
			this.onDaySelected(index, this.rowIndex);
			this.children["weekDay"+(index+1)].setSelected();
			selectedIndex = index;
		}
		
		proto.getSelectedIndex = function(){
			return selectedIndex;
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
