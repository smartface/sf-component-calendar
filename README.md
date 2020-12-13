# Smartface Calendar Component
[![Npm Status](https://img.shields.io/npm/v/@smartface/sf-component-calendar.svg?style=flat)](https://www.npmjs.com/package/@smartface/sf-component-calendar)

## Component Architecture
![Component Architecture](diagram.png "Component Architecture")

## Component Installation
```shell
(cd ~/workspace/scripts && npm i @smartface/sf-component-calendar)
```
## Component Usage
```js 

import {Calendar} from '@smartface/sf-component-calendar';
const specialDaysConf = require('./specialDays.json');

const myCalendar = new Calendar();

// Please use after Page:onShow is triggered.
myCalendar.changeCalendar("en", "gregorian", specialDaysConf)
// when user select a date
myCalendar.onDaySelect = (dateInfo) => {

}

// changing calendar date
myCalendar.setSelectedDate({month:2, year:2017, day:12});

```
### Using Custom Theme

```js
// It must be based on theme.json below
const customTheme = {

};

import { Calendar } from "@smartface/sf-component-calendar";
const specialDaysConf = require('./specialDays.json');

const myCalendar = new Calendar({theme: customTheme});

// or

const myCalendar = new Calendar();
// Add and merge new styles
myCalendar.addStyles(customTheme);


```

### specialDays

[Sample special-days](./scripts/pages/specialDays.ts)

### Changeing specialDays at runtime

```ts

import { Calendar } from "@smartface/sf-component-calendar";
const specialDaysConf = require('./specialDays.json');

const myCalendar = new Calendar();
myCalendar.changeCalendar("en", "gregorian", specialDaysConf)


// Changes special days' data anywhere
myCalendar.setSpecialDays(newSpecialDays)

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

import { Calendar } from "@smartface/sf-component-calendar";
const specialDaysConf = require('./specialDays.json');
const customTheme = require('./customTheme.json');

export default class Page1 extends Page1Design {
    router: any;
	constructor () {
        super();
		// Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        const container = new FlexLayout();
        container.flexGrow = 1;
        this.addChild(container);
        const calendar = new Calendar();
        calendar.addStyles(customTheme);
        container.addChild(calendar);
        calendar.changeCalendar("tr", "gregorian", days);
    }
}

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
import createContext from "@smartface/sf-component-calendar/components/calendarContext";



const myCalendar = new Calendar({
  useRangeSelection: true,
  useContext: false,
  justCurrentDays: true,
  useDaySelection: false
});

const newContext = calendarContext(myCalendar, "mycalendar", customTheme);

// and add/merge new styles
const newStyle = {

};
newContext(newStyles)

```

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

[Default Theme](./scripts/theme.json)

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

// changes calendar month label color to red
calendar.addStyles(newMonthLabelColorStyle);

```

### Supported Languages and Calendars

##### Calendar.changeCalendar(lang:String: string="en", type:String:"gregorian"| "hijri", specialDays:Object={})

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

### Events and Hooks
##### onChange(date:DateInfo) Event
Called when user presses on a day on the calendar. Calendar injects to callback a selected date object is described above.

##### onBeforeMonthChange(date:DateObject)
Triggered before the Calendar month is changed. And if the hook returns **false** then it makes the month changing to be canceled.

```js
var calendar = new Calendar();
calendar.onBeforeMonthChange = (date) => {
  if (date.month < 6)
    return false;
  return true;
}
```

#### onMonthChange(date:DateVO)
Triggered when month is changed by the user.

#### onDaySelect(date:DateInfo[])
Triggered when a day or days range is selected by the user.

#### onRangeSelectionStart(date:DateInfo)
Triggered when a day is selected by the user.

#### onRangeSelectionComplete(start:DateInfo, end:DateInfo)
Triggered when a day is selected by the user.

## Headless Calendar

To use calendar logic viewless, please check out : [CalendarCore](./scripts/core/CalendarCore.ts)

### Usage

```ts

import { CalendarCore } from "@smartface/sf-component-calendar";

const headlessCalendar = new CalendarCore();
headlessCalendar.changeCalendar("tr");
headlessCalendar.subscribe((oldState, newState) => {
    
});
headlessCalendar.nextMonth();

```

## Examples

[Calendar usage example](./scripts/pages/newPage004.ts)

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
