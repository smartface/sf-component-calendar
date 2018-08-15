# Smartface Calendar Component
[![Npm Status](https://img.shields.io/npm/v/@smartface/sf-component-calendar.svg?style=flat)](https://www.npmjs.com/package/@smartface/sf-component-calendar)

## Component Architecture
![Component Architecture](diagram.png "Component Architecture")

## Component Intallation
```shell
(cd ~/workspace/scripts && npm i @smartface/sf-component-calendar)
```
## Component Usage
```js 

const Calendar = require('@smartface/sf-component-calendar/components/Calendar');
const specialDaysConf = require('./specialDays.json');

const myCalendar = new Calendar();

// Please use after Page:onShow is triggered.
myCalendar.changeCalendar("en", "gregorian", specialDaysConf)
// when user select a date
myCalendar.onDaySelect = function(dateInfo){
  //...
}

// changing calendar date
myCalendar.setSelectedDate({month:2, year:2017, day:12});

```

## Component Configuration
```
{
  // Provides to use range-selection. Default: true
  useRangeSelection=true,
  // Provides to use custom theme file. Default: null
  theme=null,
  // Provides to display only days of the current month. Default: false
  justCurrentDays=false,
  // Provides to manage calendar state using an external CalendarCore component. Default is null to use internal component.
  calendarCore=null,
  // Provides to manage styles using external calendar-context component. Default is null to use internal component.
  context=null,
  // Provides to use or not single day selection. Default: true
  useDaySelection=true
}
```
### Usages

```js 

const Calendar = require('@smartface/sf-component-calendar/components/Calendar');
const calendarContext = require('@smartface/sf-component-calendar/components/calendarContext');
const specialDaysConf = require('./specialDays.json');
const customTheme = require('./customTheme.json');

const Page1 = extend(Page1Design)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        
        this.calendar = new Calendar({
			useRangeSelection: true,
			useDaySelection: true
		});
        
        this.calendar.changeCalendar("en", "gregorian", {});
        
        this.layout.addChild(this.calendar);
        // when user select a date
        this.calendar.onDaySelect = function(dateInfo){
          //...
        }
        
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    });
    

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    const page = this;
    superOnShow();
    
    // changing calendar date
    this.calendar.setSelectedDate({month:2, year:2017, day:12});

    if (System.OS === "Android") {
        setTimeout(() => page.btnNext.enabled = true, 300);
    }
}

// To create with custom context. It's only for advanced use.

const myCalendar = new Calendar({
  useRangeSelection: true,
  useContext: false,
  justCurrentDays: true,
  useDaySelection: false
});

const newContext = calendarContext(myCalendar, "calendar", customTheme);

```
## Component maintainers (for Smartface Developers)

Create new cloud workspace in the Smartface-Cloud with this repository url. Open Cloud IDE and switch to terminal in the scripts folder. Install dependencies via terminal:

``` 
    $ cd scripts
    $ npm i sf-core
    $ npm i @smartface/styler
    $ npm i moment
    $ npm i moment-hijri
    $ npm i js-base
```

Then run command via terminal on the workspace root for TDD

``` 
  $ npm i 
  $ npm run test:watch
```

and run command to build service layer

``` $npm run dev ```

Finally run commnand on the scripts folder to publish to npm:

``` $ npm publish ```

### Component Elements

The Calendar component is consisted of several elements. Elements are :

  - **calendar**
    - className: .calendar-self
      - **navbar**
        - className: .calendar.header_navbar
          - **prevMonth**:
            - styling id: #calendar_navbar_prevMonth
            - className: .calendar.header_navbar_arrow
          - **nextMonth**:
            - styling id: #calendar_navbar_nextMonth
            - className: .calendar.header_navbar_arrow
          -  **monthLabel**:
              - styling id: #calendar_navbar_monthLabel
              - className: .calendar.header_navbar_monthLabel
      - **calendarDays**:
        - styling id: #calendar_calendarDays
        - className: .calendar.header_dayNames
          - **dayName_0, dayName_1, dayName_2, dayName_3, dayName_4, dayName_5, dayName_6**
            - className: .calendar.header_dayNames_dayName
            - styling id: #calendar_calendarDays_{component name}
      - **calendarBody**
        - styling id: #calendar_calendarBody
        - className: .calendar.body
          - **week1, week2, week3, week4, week5, week6, week7**
            - className: .calendar.weekrow
              - **line**
                - styling id: #calendar_week(1..4)_line
              - **weekDay1, weekDay2, weekDay3, weekDay4, weekDay5, weekDay6, weekDay7**
                - styling id: #calendar_week(1..4)_weekday(1..7)
                - className: .calendar.day
                - **dayNum**
                  - className: .calendar.day_label
                  - styling id: #calendar_week(1..4)_weekday(1..7)_dayNum


## Styling

Default style
```js

{
	"#calendar": {
		"flexProps": {
			"direction": "LTR"
		},
		"&_line2": {}
	},
	".calendar": {
		"direction": "LTR",
		"&-self": {
			"direction": "LTR",
			"right": 0,
			"left": 0,
			"top": 0,
			"flexProps": {
				"positionType": "ABSOLUTE",
				"alignContent": "STRETCH",
				"alignItems": "STRETCH"
			}
		},
		"&_line": {
			"height": 1,
			"width": null,
			"backgroundColor": "rgba(228,228,228,1)"
		},
		"&_calendarYear": {
			"&_yearLabel": {
				"textColor": "#FF001F"
			}
		},
		".header": {
			"&_navbar": {
				"direction": "LTR",
				"&_monthLabel": {
					"textColor": "#1775D0"
				},
				"&_arrow": {
					"textColor": "rgba( 94, 94, 94, 1 )",
					"backgroundColor": "rgba( 255, 255, 255, 0 )",
					"bottom": 0,
					"flexProps": {
						"positionType": "ABSOLUTE"
					},
					"width": 20,
					"top": 0,
					"font": {
						"size": 16,
						"family": "FontAwesome5FreeSolid",
						"style": null,
						"bold": false,
						"italic": false
					},
					"textAlignment": "MIDCENTER"
				},
				"&_label": {
					"textColor": "#000000"
				},
				"flexProps": {
					"flexDirection": "ROW",
					"positionType": "RELATIVE"
				},
				"height": 30,
				"backgroundColor": "rgba(255,255,255,1)"
			},
			"&_dayNames": {
				"direction": "LTR",
				"backgroundColor": "rgba( 245, 245, 245, 1 )",
				"height": 30,
				"&-lang_ar": {
					"direction": "RTL"
				},
				"&-lang_ar-sa": {
					"direction": "RTL"
				},
				"&_dayName": {
					"height": null,
					"font": {
						"size": 10,
						"family": "Arial"
					},
					".weekday": {
						"textColor": "rgba( 128, 128, 128, 1 )",
						"flexProps": {
							"positionType": "RELATIVE",
							"flexGrow": 1,
							"alignSelf": "STRETCH"
						},
						"textAlignment": "MIDCENTER"
					},
					".weekend": {
						"textColor": "#808080"
					}
				},
				"flexProps": {
					"flexDirection": "ROW",
					"positionType": "RELATIVE"
				}
			}
		},
		".body": {
			"flexProps": {
				"positionType": "RELATIVE",
				"alignSelf": "STRETCH",
				"flexGrow": 1
			},
			"backgroundColor": "rgba(255,255,255,1)"
		},
		".weekRow": {
			"direction": "LTR",
			"backgroundColor": "rgba(0,0,0,0)",
			"&-lang_ar-sa": {
				"direction": "RTL"
			},
			"&-lang_ar": {
				"direction": "RTL"
			},
			"&_line": {
				"backgroundColor": "#C0C0C0"
			},
			"flexProps": {
				"alignContent": "STRETCH",
				"alignItems": "STRETCH",
				"flexDirection": "ROW",
				"positionType": "RELATIVE"
			},
			"height": 40
		},
		".day": {
			"borderWidth": 0,
			"&_label": {
				"backgroundColor": "rgba( 255, 255, 255, 0 )",
				"textColor": "rgba( 71, 71, 71, 1 )",
				"flexProps": {
					"alignSelf": "CENTER",
					"positionType": "RELATIVE"
				},
				"width": 26,
				"height": 26,
				"borderRadius": 13,
				"font": {
					"size": 14,
					"bold": true,
					"italic": false,
					"family": "Arial",
					"style": "b"
				},
				"&-rangeSelected": {
					"textColor": "rgba( 255, 255, 255, 1 )"
				}
			},
			"flexProps": {
				"justifyContent": "CENTER",
				"flexGrow": 1,
				"positionType": "RELATIVE"
			},
			"&-selected": {
				"backgroundColor": "rgba( 0, 185, 255, 1 )"
			},
			"backgroundColor": "rgba( 246, 7, 7, 0 )"
		},
		".day_label": {
			"font": {
				"size": 14,
				"bold": false,
				"italic": false,
				"family": "Arial"
			},
			"&_label": {},
			"&-inrange": {
				"textColor": "#000000"
			},
			"&-selected": {
				"borderWidth": 0,
				"backgroundColor": "rgba(0,185,255,42)",
				"textColor": "#000000"
			},
			"&-deactiveDays": {
				"borderWidth": 0,
				"textColor": "#D6D6D6"
			},
			"&-specialDay": {
				"borderWidth": 0,
				"backgroundColor": "#FF9F9F"
			},
			"&-weekend": {
				"borderWidth": 0,
				"textColor": "#A3A3A3"
			}
		},
		".weekNav": {
			"flex": {
				"positionType": 0,
				"flexGrow": 1,
				"flexDirection": 2,
				"flexWrap": 1
			},
			"flexProps": {
				"positionType": "RELATIVE",
				"flexDirection": "ROW"
			}
		}
	},
	".calendarWeekly": {
		"flexProps": {
			"positionType": "RELATIVE"
		},
		"height": 100
	}
}

```

### Changing Styles

You can override new styles like below

```js
const newMonthLabelColorStyle = {
  ".calendar":{
    ".header":{
      "&_navbar":{
        "&_monthLabel":{
          "textColor":"#F10000"
        }
      }
    }
  }
};
      
const Calendar = require("@smartface/sf-calendar-component/components/Calendar");
const calendar = new Calendar();

// changing calendar month label color to red
calendar.addStyles(newMonthLabelColorStyle);


```

## Api
### Types
#### DateVO
```js
{
  day:Number (1..31), 
  month:Number (1..12), 
  year:Number (1970 or greater)
}
```
#### DateInfoVO
```js
{ 
  localeDate: {
    day: String (1..31),
    month: String (1..12),
    year: String
  },
  date: {
    day: Number (1..12),
    month: Number (1..31),
    year: Number
  },
  dayInfo: {
    weekDay: Number,
    longName: String
    shortName: String
    specialDay: Array.<String>
  },
  monthInfo: {
    longName: String
    shortName: String
  }
}

```

### Calendar Api
***
#### Methods

##### addStyles(styleObject:Object)

Merges specified styles to current styles and updates the component

##### changeCalendar(lang:String="en", type:String="gregorian", specialDays:Object={})

Changes the calendar's type

  **Supported Calendars:**
  - CalendarTypes.HIJRI
  - CalendarTypes.GREGORIAN

 **Supported Languages:**
  - Turkish : "tr"
  - German : "de"
  - French : "fr"
  - Arabic: "ar"
  - Arabic (Saudi): "ar-sa"
  - Dutch : "nl"
   and all languages that are supported by [moment.js](https://github.com/moment/moment/tree/develop/locale)

##### dispose()
Disposes the calendar.

##### nextMonth()
Jumps to the next month

##### now()
Selects today.

##### prevMonth()
Jumps to the previous month

##### setSelectedDate(date:Date|DateVO)
Sets specified date object as the selected date.

##### setDate(date:Date|DateVO)
Sets a date without selection

##### setRangeDates(start:DateVO, end:DateVO)
Creates a range selection in the Calendar

##### selectDay(weekIndex:(0..5), weekDayIndex:(0..6))
Selects a day on the calendar by specified week and day indexes.

#### Events
##### onChange(date:DateInfo) Event
Called when user presses on a day on the calendar. Calendar injects to callback a selected date object is described above.

##### onBeforeMonthChange(date:DateVO)
Triggered before the Calendar month is being changed. And if the eventlistener returns **false** then it makes the month changing to be canceled.

```js
var calendar = new Calendar();
calendar.onBeforeMonthChange = function(date){
  if(date.month < 6)
    return false;
  return true;
}
```

##### onMonthChange(date:DateVO)
Triggered when month is changed by the user.

##### onDaySelect(date:Array.< DateInfoVO >)
Triggered when a day or days range is selected by the user.

##### onRangeSelectionStart(date:DateInfoVO)
Triggered when a day is selected by the user.

##### onRangeSelectionComplete(start:DateInfoVO, end:DateInfoVO)
Triggered when a day is selected by the user.

### CalendarWeekly Api
#### Methods
##### addStyles(styleObject:Object)

Merges specified styles to current styles and updates the component

##### changeCalendar(lang:String="en", type:String="gregorian", specialDays:Object={})

Changes the calendar's type

  **Supported Calendars:**
  - CalendarTypes.HIJRI
  - CalendarTypes.GREGORIAN

 **Supported Languages:**
  - Turkish : "tr"
  - German : "de"
  - French : "fr"
  - Arabic: "ar"
  - Arabic (Saudi): "ar-sa"
  - Dutch : "nl"
   and all languages that are supported by [moment.js](https://github.com/moment/moment/tree/develop/locale)

##### dispose()
Disposes the calendar.

##### nextMonth()
Jumps to the next month

##### nextWeek()
Jumps to the next week. If the week is the last week then jumps to the next month and its first week.

##### prevWeek()
Jumps to the previous week. If the week is the first week then jumps to the previous month and its last week.

##### now()
Selects today.

##### prevMonth()
Jumps to the previous month

##### selectDay(weekIndex:(0..5), weekDayIndex:(0..6))
Selects a day on the calendar by specified week and day indexes.

##### setSelectedDate(date:Date|DateVO)
Sets specified date object as the selected date.

##### setDate(date:Date|DateVO)
Sets a date without selection

#### Events
##### onMonthChange(date:DateVO)
Triggered when month is changed by the user.

##### onDaySelect(date:Array.< DateInfoVO >)
Triggered when a day or days range is selected by the user.

### CalendarCore Api
CalendarCore includes all calendar logic to manage the calendar state and create custom calendars.

#### Methods
##### reset()
##### selectDay()
##### clearSelection()
##### nextWeek()
##### prevWeek()
##### setRangeSelection(start:DateVO, end:DateVO)
##### rangeSelection(weekIndex:number, weekDayIndex:number)
##### startRangeSelection(weekIndex:number, weekDayIndex:number)
##### completeRangeSelection(weekIndex:number, weekDayIndex:number)
##### subscribe(cb:function)
##### unsubscribe(cb:function)
##### now()
##### getWeekDay()
##### getState()
##### setState(state:object)
##### setDate(date:DateVO|Date)
##### setSelectedDate(date:DateVO|Date)
##### changeCalendar(lang:String="en", type:String="gregorian", specialDays:Object={})
##### prevMonth()
