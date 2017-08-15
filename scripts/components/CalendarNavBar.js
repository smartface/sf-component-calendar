/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarNavBarDesign = require('library/CalendarNavBar');

const CalendarNavBar = extend(CalendarNavBarDesign)(
	//constructor
	function(_super, props){
		// initalizes super class for this scope
		_super(this, props || {} );
		
		this.setContextDispatcher = function(dispatch) {
			this.dispatch = dispatch;
		}
		
		this.children.nextMonth.onPress = function(){
			this.dispatch({
				type: "changeMonth"
			})
			this.onNext();
		}.bind(this);
		
		this.children.prevMonth.onPress = function(){
			this.dispatch({
				type: "changeMonth"
			})
			this.onPrev();
		}.bind(this);
		
		this.setLabel = function(text){
			this.children.monthLabel.text = text;
		}.bind(this);
		
		this.setYear = function(text){
			this.children.yearLabel.text = text;
		}.bind(this);
	}
	
);

module && (module.exports = CalendarNavBar);
