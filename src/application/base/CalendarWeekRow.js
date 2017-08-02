/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const Button = require('sf-core/ui/button');
const Color = require('sf-core/ui/color');

const CalendarNumber = require("../../components/CalendarNumber");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const CalendarWeekRow = extend(FlexLayout)(
	//constructor
	function(_super, props) {
		// initalizes super class for this component scope
		_super(this, props);

		const weekDay1Style = getCombinedStyle(".button", {
			left: null,
			top: null,
			borderRadius: 20,
			width: null,
			height: null,
			text: "",
			backgroundColor: Color.create(0, 255, 255, 255),
			borderWidth: 1,
			borderColor: Color.create(255, 185, 185, 185),
			marginLeft: 3,
			marginRight: 3,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		}); 
		var weekDay1 = new CalendarNumber(weekDay1Style, "calendarWeekRow");  
		this.addChild(weekDay1);
			
		const weekDay2Style = getCombinedStyle(".button", {
			left: null,
			top: null,
			borderRadius: 20,
			width: null,
			height: null,
			text: "",
			backgroundColor: Color.create(0, 255, 255, 255),
			borderWidth: 1,
			borderColor: Color.create(255, 185, 185, 185),
			marginLeft: 3,
			marginRight: 3,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		}); 
		var weekDay2 = new CalendarNumber(weekDay2Style, "calendarWeekRow");  
		this.addChild(weekDay2);
			
		const weekDay3Style = getCombinedStyle(".button", {
			left: null,
			top: null,
			borderRadius: 20,
			width: null,
			height: null,
			text: "",
			backgroundColor: Color.create(0, 255, 255, 255),
			borderWidth: 1,
			borderColor: Color.create(255, 185, 185, 185),
			marginLeft: 3,
			marginRight: 3,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		}); 
		var weekDay3 = new CalendarNumber(weekDay3Style, "calendarWeekRow");  
		this.addChild(weekDay3);
			
		const weekDay4Style = getCombinedStyle(".button", {
			left: null,
			top: null,
			borderRadius: 20,
			width: null,
			height: null,
			text: "",
			backgroundColor: Color.create(0, 255, 255, 255),
			borderWidth: 1,
			borderColor: Color.create(255, 185, 185, 185),
			marginLeft: 3,
			marginRight: 3,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		}); 
		var weekDay4 = new CalendarNumber(weekDay4Style, "calendarWeekRow");  
		this.addChild(weekDay4);
			
		const weekDay5Style = getCombinedStyle(".button", {
			left: null,
			top: null,
			borderRadius: 20,
			width: null,
			height: null,
			text: "",
			backgroundColor: Color.create(0, 255, 255, 255),
			borderWidth: 1,
			borderColor: Color.create(255, 185, 185, 185),
			marginLeft: 3,
			marginRight: 3,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		}); 
		var weekDay5 = new CalendarNumber(weekDay5Style, "calendarWeekRow");  
		this.addChild(weekDay5);
			
		const weekDay6Style = getCombinedStyle(".button", {
			left: null,
			top: null,
			borderRadius: 20,
			width: null,
			height: null,
			text: "",
			backgroundColor: Color.create(0, 255, 255, 255),
			borderWidth: 1,
			borderColor: Color.create(255, 185, 185, 185),
			marginLeft: 3,
			marginRight: 3,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		}); 
		var weekDay6 = new CalendarNumber(weekDay6Style, "calendarWeekRow");  
		this.addChild(weekDay6);
			
		const weekDay7Style = getCombinedStyle(".button", {
			left: null,
			top: null,
			borderRadius: 20,
			width: null,
			height: null,
			text: "",
			backgroundColor: Color.create(0, 255, 255, 255),
			borderWidth: 1,
			borderColor: Color.create(255, 185, 185, 185),
			marginLeft: 3,
			marginRight: 3,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		}); 
		var weekDay7 = new CalendarNumber(weekDay7Style, "calendarWeekRow");  
		this.addChild(weekDay7);
			
		//assign the children to calendarWeekRow 
		this.children = Object.assign({}, {
			weekDay1: weekDay1,
			weekDay2: weekDay2,
			weekDay3: weekDay3,
			weekDay4: weekDay4,
			weekDay5: weekDay5,
			weekDay6: weekDay6,
			weekDay7: weekDay7
		});
		
	});

CalendarWeekRow.defaults = getCombinedStyle(".flexLayout .sfCalendar_block .sfCalendar_block", {
	width: 320,
	height: 40,
	paddingLeft: 3,
	paddingRight: 3,
	flexDirection: FlexLayout.FlexDirection.ROW
});

module && (module.exports = CalendarWeekRow);