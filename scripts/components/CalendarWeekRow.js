const extend = require('js-base/core/extend');
const CalendarWeekRowDesign = require('library/CalendarWeekRow');


function selectDay(index){
	if(index === -1){
		throw new Error("Day index cannot be -1");
	}

	this.selectedIndex = index;
	this.rangeIndexes = [];
	this.children["weekDay"+(index+1)].select();
}

function onDayPress(index){
	this.onDaySelect && this.onDaySelect(index);
}

function selectRange(indexes){
	this.rangeIndexes.push(indexes);
	indexes.forEach(index => this.children["weekDay"+(index+1)].activate());
}

function onDayLongPress(index) {
	this.onDayLongPress && this.onDayLongPress(index);
}

function addDaySelectEvent(day, index){
	day.onPress = onDayPress.bind(this, index);
	day.onLongPress = onDayLongPress.bind(this, index);
}

const CalendarWeekRow = extend(CalendarWeekRowDesign)(
	//constructor
	function(_super, props){
		// initalizes super class for this scope
		_super(this, props || {});
		this.rangeIndexes = [];
		// data && this.setDays(data);
		this._days = ["weekDay1", "weekDay2", "weekDay3","weekDay4","weekDay5","weekDay6","weekDay7"];
		// it's displayed in weekMode
		this._weekMode = true;
		this.init();
	},
	function(proto){
		proto.setWeekMode = function(mode){
			this._weekMode = mode;
		};

		proto.getWeekMode = function(){
			return this._weekMode;
		};

		proto.activateRangeSelection = function(){
			this.isRangeSelection = true;
			this._days.forEach((day, index) => 
				this.children[day].onTouch = this.onMove.bind(null, index));
		};
		
		proto.deactivateRangeSelection = function(){
			this.isRangeSelection = false;
			this._days.forEach((day, index) => 
				this.children[day].onTouch = null)
		};
		
		proto.getSelectedIndex = function(){
			return this.selectedIndex;
		};
		
		proto.isEmpty = function(){
			return this._isEmpty !== false;
		}
		
		proto.setSelectedIndex = function(index){
			return selectDay.call(this, index);
		};
		
		proto.setRangeIndex = function(index){
			return selectRange.call(this, index);
		};
		
		proto.clearSelected = function(){
			this.selectedIndex > -1 && this.children["weekDay"+(this.selectedIndex+1)].clearSelected();
			this.selectedIndex = -1;
			this.rangeIndexes = [];
		};
		
		proto.init = function(){
			this._days.forEach((day, index) => 
				addDaySelectEvent.call(this, this.children[day], index))
		};
		
		proto.setDays = function(days, justCurrentDays=false){
			if(days === undefined){
				return;
			}
			
			this._isEmpty = true;
			this._days.forEach((day, index) => {
				if(justCurrentDays && days[index].month !== "current"){
					this.children[day].visible = false;
					return;
				} else if(days[index].month === "current") {
					this._isEmpty = false;
				}
				
				this.children[day].visible = true;
				this.children[day].setDay(days[index]);
			});
			
			this._weekMode &&
				this.dispatch({
					type: "changeUserStyle",
					userStyle: (style) => {
						this._isEmpty ? style.height = 0 : delete style.height;
						style.visible = !this._isEmpty
						
						return style;
					}
				});
		};
	}
);

module && (module.exports = CalendarWeekRow);
