/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const Button = require('sf-core/ui/button');
const Color = require('sf-core/ui/color');
const Font = require('sf-core/ui/font');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const CalendarNavBar = extend(FlexLayout)(
	//constructor
	function(_super, props) {
		// initalizes super class for this component scope
		_super(this, props);

		const prevMonthStyle = getCombinedStyle(".button", {
			width: null,
			height: null,
			text: "<",
			backgroundColor: Color.create(0, 0, 161, 241),
			textColor: Color.create(255, 94, 94, 94),
			flexGrow: 1,
			font: Font.create("Arial", 20, Font.BOLD)
		});  
		var prevMonth = new Button(prevMonthStyle);  
		this.addChild(prevMonth);
			
		const monthLabelStyle = getCombinedStyle(".label", {
			height: null,
			width: null,
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 10
		});  
		var monthLabel = new Label(monthLabelStyle);  
		if(monthLabelStyle.scrollEnabled === false)
			monthLabel.ios && (monthLabel.ios.scrollEnabled = false);
		this.addChild(monthLabel);
			
		const nextMonthStyle = getCombinedStyle(".button", {
			width: null,
			height: null,
			text: ">",
			backgroundColor: Color.create(0, 0, 161, 241),
			textColor: Color.create(255, 94, 94, 94),
			flexGrow: 1,
			font: Font.create("Arial", 20, Font.BOLD)
		});  
		var nextMonth = new Button(nextMonthStyle);  
		this.addChild(nextMonth);
			
		//assign the children to calendarNavBar 
		this.children = Object.assign({}, {
			prevMonth: prevMonth,
			monthLabel: monthLabel,
			nextMonth: nextMonth
		});
		
	});

CalendarNavBar.defaults = getCombinedStyle(".flexLayout .sfCalendar_block .sfCalendar_block", {
	width: 283.2191780821918,
	height: 36.84931454593188,
	minHeight: null,
	maxHeight: 80,
	positionType: FlexLayout.PositionType.RELATIVE,
	flexGrow: 1,
	flexDirection: FlexLayout.FlexDirection.ROW
});

module && (module.exports = CalendarNavBar);