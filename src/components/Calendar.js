/* 
		Smarface Calendar Component v.1.0.0
*/
const extend = require('js-base/core/extend');

const CalendarDesign = require('library/Calendar');
const WeekDaysRow = require('./CalendarWeekRow');
const FlexLayout = require('sf-core/ui/flexlayout');
const CalendarService = require("../services/CalendarService");

const weekRowStyle = {
	positionType: FlexLayout.PositionType.RELATIVE,
	marginTop: 4,
	flexGrow: 1
};

const styles = {
	".header": {
		"&_navbar": {
			"&_arrow" : {
				"flexProps": {
					"flexGrow": 1,
					"textColor": "#5E5E5E",
				}
			},
			"&_label": {
				"textColor": "#000000",
			},
			"&_daynames": {
				".weekday": {
					"textColor": "#000000",
					"backgroundColor": "rgba(0,185,255,42)"
				},
				".weekend": {
					"textColor": "#000000",
					"backgroundColor": "rgba(0,185,255,42)"
				}
			}
		}
	},
	".day": {
		"font": {
      "size": 16,
      "bold": false,
      "italic": false,
      "family": "Arial"
    },
		"borderRadius": 26,
		"textColor": "#000000",
		"backgroundColor": "rgba(0,0,0,0)",
		"&-inrange": {
    	"backgorundColor": "rgba(0,185,255,42)",
			"textColor": "#000000",
		},
    "&-selected": {
    	"backgorundColor": "rgba(0,185,255,42)",
			"textColor": "#000000",
    },
		".deactiveDays": {
			"borderRadius": 10,
			"textColor": "",
			"backgroundColor": "",
		},
		".specialDays": {
			"&-selected": {
				"@extend": ".day-selected",
			},
			"borderRadius": 10,
			"textColor": "",
			"backgroundColor": "",
		},
		".holidays": {
			"borderRadius": 10,
			"textColor": "",
			"backgroundColor": "",
		}
	}
};

function createWeekRow(){
	return new WeekDaysRow(weekRowStyle);
}

const Calendar = extend(CalendarDesign)(
	//constructor
	function(_super, props, style){
		// initalizes super class for this scope
		_super(this, props || CalendarDesign.defaults);
		
		this.children.navbar.onNext = function(){
			this.nextMonth();
		}.bind(this);
		
		this.children.navbar.onPrev = function(){
			this.prevMonth();
		}.bind(this);
		
		this.buildRows();
		
		setTimeout(function() {
			this.updateCalendar(CalendarService.getCalendarMonth());
		});
		
	},
	function(proto){
		var currentMonth;
		const weeks = [];
		var selectedRow;
		
		function updateRows(days) {
			weeks.forEach(function(row, index){
				row.setDays(days[index]);
			}.bind(this));
		}
		
		function onDaySelected(row, index){
			return {
				...currentMonth.date,
				day: currentMonth.days[row][index]
			}
		}
		
		proto.buildRows = function(){
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			weeks.push(createWeekRow());
			
			weeks.forEach(function(row){
				this.children.body.addChild(row);
				row.onDaySelected = function(){
					if(selectedRow){
						selectedRow.clearSelected();
					}
					selectedRow = row;
				};
			}.bind(this));
		};
		
		proto.updateCalendar = function(month){
			currentMonth = month;
			
			updateRows.call(this, month.days);
			this.children.navbar.setLabel(currentMonth.longName +" "+currentMonth.date.year);
		};
		
		proto.nextMonth = function(){
			this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.nextMonth.date));
		}
		
		proto.prevMonth = function(){
			this.updateCalendar(CalendarService.getCalendarMonth(currentMonth.previousMonth.date));
		}
	}
);

module && (module.exports = Calendar);
