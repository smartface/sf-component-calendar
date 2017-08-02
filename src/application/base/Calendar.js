/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');

const CalendarNavBar = require("../../components/CalendarNavBar");
const CalendarBody = require("../../components/CalendarBody");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const Calendar = extend(FlexLayout)(
	//constructor
	function(_super, props) {
		// initalizes super class for this component scope
		_super(this, props);

		const calendarDaysStyle = getCombinedStyle(".flexLayout .sfCalendar_block .sfCalendar_block", {
			left: null,
			top: null,
			width: null,
			height: 0,
			maxHeight: 40,
			minHeight: 20,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 0.5,
			flexDirection: FlexLayout.FlexDirection.ROW
		});  
		var calendarDays = new FlexLayout(calendarDaysStyle);  
		this.addChild(calendarDays);
			
		const navbarStyle = getCombinedStyle(".flexLayout .sfCalendar_block .sfCalendar_block", {
			left: 0,
			top: 0,
			width: null,
			height: 0,
			minHeight: 30,
			maxHeight: 40,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW
		}); 
		var navbar = new CalendarNavBar(navbarStyle, "calendar");  
		this.addChild(navbar);
			
		const bodyStyle = getCombinedStyle(".flexLayout .sfCalendar_block .sfCalendar_block", {
			left: 0,
			top: 0,
			width: null,
			height: null,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 5
		}); 
		var body = new CalendarBody(bodyStyle, "calendar");  
		this.addChild(body);
			
		const weekday_0Style = getCombinedStyle(".label", {
			height: null,
			width: 40,
			text: "Mon",
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});  
		var weekday_0 = new Label(weekday_0Style);  
		if(weekday_0Style.scrollEnabled === false)
			weekday_0.ios && (weekday_0.ios.scrollEnabled = false);
		calendarDays.addChild(weekday_0);
			
		const weekDay_1Style = getCombinedStyle(".label", {
			height: null,
			width: 40,
			text: "Tu",
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});  
		var weekDay_1 = new Label(weekDay_1Style);  
		if(weekDay_1Style.scrollEnabled === false)
			weekDay_1.ios && (weekDay_1.ios.scrollEnabled = false);
		calendarDays.addChild(weekDay_1);
			
		const weekDay_2Style = getCombinedStyle(".label", {
			height: null,
			width: 40,
			text: "Wed",
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});  
		var weekDay_2 = new Label(weekDay_2Style);  
		if(weekDay_2Style.scrollEnabled === false)
			weekDay_2.ios && (weekDay_2.ios.scrollEnabled = false);
		calendarDays.addChild(weekDay_2);
			
		const weekDay_3Style = getCombinedStyle(".label", {
			height: null,
			width: 40,
			text: "Th",
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});  
		var weekDay_3 = new Label(weekDay_3Style);  
		if(weekDay_3Style.scrollEnabled === false)
			weekDay_3.ios && (weekDay_3.ios.scrollEnabled = false);
		calendarDays.addChild(weekDay_3);
			
		const weekDay_4Style = getCombinedStyle(".label", {
			height: null,
			width: 40,
			text: "Fri",
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});  
		var weekDay_4 = new Label(weekDay_4Style);  
		if(weekDay_4Style.scrollEnabled === false)
			weekDay_4.ios && (weekDay_4.ios.scrollEnabled = false);
		calendarDays.addChild(weekDay_4);
			
		const weekDay_5Style = getCombinedStyle(".label", {
			height: null,
			width: 40,
			text: "Sat",
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});  
		var weekDay_5 = new Label(weekDay_5Style);  
		if(weekDay_5Style.scrollEnabled === false)
			weekDay_5.ios && (weekDay_5.ios.scrollEnabled = false);
		calendarDays.addChild(weekDay_5);
			
		const weekDay_6Style = getCombinedStyle(".label", {
			height: null,
			width: 40,
			text: "Sun",
			textAlignment: TextAlignment.MIDCENTER,
			flexGrow: 1,
			font: Font.create("Arial", 14, Font.NORMAL)
		});  
		var weekDay_6 = new Label(weekDay_6Style);  
		if(weekDay_6Style.scrollEnabled === false)
			weekDay_6.ios && (weekDay_6.ios.scrollEnabled = false);
		calendarDays.addChild(weekDay_6);
			
		//assign the children to calendar 
		this.children = Object.assign({}, {
			calendarDays: calendarDays,
			navbar: navbar,
			body: body
		});
		
		//assign the children of calendarDays
		calendarDays.children = Object.assign({}, {
			weekday_0: weekday_0,
			weekDay_1: weekDay_1,
			weekDay_2: weekDay_2,
			weekDay_3: weekDay_3,
			weekDay_4: weekDay_4,
			weekDay_5: weekDay_5,
			weekDay_6: weekDay_6
		});
		
	});

Calendar.defaults = getCombinedStyle(".flexLayout .sfCalendar_block .sfCalendar_block", {
	width: 245.73490039722338,
	height: 186.67901528848185
});

module && (module.exports = Calendar);