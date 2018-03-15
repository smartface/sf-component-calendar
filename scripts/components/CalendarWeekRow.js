/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const CalendarWeekRowDesign = require('library/CalendarWeekRow');

const CalendarWeekRow = extend(CalendarWeekRowDesign)(
	//constructor
	function(_super, props){
		// initalizes super class for this scope
		_super(this, props || {});
		// data && this.setDays(data);
		this.init();
	},
	function(proto){

		function addDaySelectEvent(day, index){
			day.onPress = selectDay.bind(this, index);
		}
		
		function selectDay(index){
			if(index === -1){
				throw new Error("Day index cannot be -1");
			}
			
			this.children["weekDay"+(index+1)].setSelected();
			this.selectedIndex = index;
			this.onDaySelected(index);
		}
		
		proto.getSelectedIndex = function(){
			return this.selectedIndex;
		};
		
		proto.setSelectedIndex = function(index){
			return selectDay.call(this, index);
		};
		
		proto.clearSelected = function(){
			this.selectedIndex > -1 && this.children["weekDay"+(this.selectedIndex+1)].clearSelected();
			this.selectedIndex = -1;
		};
		
		proto.init = function(){
			addDaySelectEvent.call(this, this.children.weekDay1, 0);
			addDaySelectEvent.call(this, this.children.weekDay2, 1);
			addDaySelectEvent.call(this, this.children.weekDay3, 2);
			addDaySelectEvent.call(this, this.children.weekDay4, 3);
			addDaySelectEvent.call(this, this.children.weekDay5, 4);
			addDaySelectEvent.call(this, this.children.weekDay6, 5);
			addDaySelectEvent.call(this, this.children.weekDay7, 6);
		};
		
		proto.setDays = function(days){
			if(days === undefined){
				return;
			}
			
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
