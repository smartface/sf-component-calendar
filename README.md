# Smartface Calendar Component
[![Npm Status](https://img.shields.io/npm/v/@smartface/sf-calendar-component.svg?style=flat)](https://www.npmjs.com/package/@smartface/sf-calendar-component)

## Component Intallation
``` $ npm i @smartface/sf-calendar-component ```

## Component Usage
```js 

const Calendar = require("@smartface/sf-calendar-component/components/Calendar");
const myCalendar = new Calendar();

// when user select a date
myCalendar.onChanged = function(data){
  ...
}

// changing calendar date
myCalendar.setSelectedDate({month: Number, year: Number, day: Number});
```

## Component maintainers (for Smartface Developers)

Create new cloud workspace in the Smartface-Cloud with this repository url. Open Cloud IDE and switch to terminal in the scripts folder. Install dependencies via terminal:

``` 
    $ cd scripts
    $ npm i sf-core
    $ npm i @smartface/styler
    $ npm i moment
    $ npm i moment-hijri
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
    - **navbar**
      - type: FlexLayout
      - styling id: #calendar_navbar
      - children: 
         - **prevMonth**: Previous month button
          - type: Button
          - styling id: #calendar_navbar_prevMonth
         - **nextMonth**: Next month button
          - type: Button
          - styling id: #calendar_navbar_nextMonth
         -  **monthLabel**: Month name label
          - type: Label
          - styling id : #calendar_navbar_monthLabel
   - **calendarYear**: #calendar_calendarYear
    - type: FlexLayout
    - children:
      - **yearLabel**
        - type: FlexLayout
        - styling id: #calendar_yearLabel
        - children:
          - **label**
            - type: Label
            - styling id: #calendar_yearLabel_label
      
    
      
### Selected Date Schema

```js
{ 
  year: Number,
  dayInfo: {
    weekDay: Number,
    longName: String
    shortName: String
    day: Number,
    specialDay: Array.<String>
  },
  monthInfo: {
    longName: String
    shortName: String
    month: Number
  }
}


```

## Special Days

You can configure special-days in The Calendar by years, calendars, languages and months.

## Styling

Default style
```js

{
  "#calendar":{
    "&_line2":{ // element support to directly manipulate
      width:160,
      "alignSelf":"FLEX_END"
    }
  },
  ".calendar":{
    "&-self":{
      "backgroundColor":"#FFFFFF",
      "right":0,
      "left":0,
      "top":0,
      "bottom":0,
      "minHeight":300,
      "maxHeight":300,
      "paddingLeft":0,
      "paddingRight":0,
      "positionType":"ABSOLUTE"
    },
    "&_line":{
      "height":1,
      "width":NaN,
      "backgroundColor":"rgba(228,228,228,1)"
    },
    "&_calendarYear":{
      "&_yearLabel":{
        "textColor":"#FF001F"
      }
    },
    ".header":{
      "&_navbar":{
        "&_monthLabel":{
          "textColor":"#1775D0"
        },
        "&_arrow":{
          "flexGrow":1,
          "textColor":"#B1B1B4"
        },
        "&_label":{
          "textColor":"#000000"
        }
      },
      "&_dayNames":{
        "backgroundColor":"#EBEBEB",
        "minHeight":14,
        "maxHeight":NaN,
        "height":NaN,
        "flexGrow":0.2,
        "direction":"LTR",
        "&-lang_ar":{ // language support for Arabic
          "direction":"RTL"
        },
        "&-lang_ar-sa":{ // language support for Saudi Arabic
          "direction":"RTL"
        },
        "&_dayName":{
          "height":NaN,
          "font":{
            "size":10,
            "family":"Arial"
          },
          ".weekday":{
            "textColor":"#000000"
          },
          ".weekend":{
            "textColor":"#808080"
          }
        }
      }
    },
    ".body":{},
    ".weekRow":{
      "backgroundColor":"rgba(0,0,0,0)",
      "maxHeight":40,
      "minHeight":26,
      "direction":"LTR",
      "&-lang_ar-sa":{
        "direction":"RTL"
      },
      "&-lang_ar":{
        "direction":"RTL"
      },
      "&_line":{
        "backgroundColor":"#C0C0C0"
      }
    },
    ".day":{
      "font":{
        "size":14,
        "bold":false,
        "italic":false,
        "family":"Arial"
      },
      "borderWidth":0,
      "borderRadius":13,
      "maxWidth":26,
      "minWidth":26,
      "maxHeight":26,
      "minHeight":26,
      "textColor":"#000000",
      "backgroundColor":"rgba(0,0,0,0)",
      "&-inrange":{
        "textColor":"#000000"
      },
      "&-selected":{
        "borderWidth":0,
        "backgroundColor":"rgba(0,185,255,42)",
        "textColor":"#000000"
      },
      "&-deactiveDays":{
        "borderWidth":0,
        "textColor":"#D6D6D6"
      },
      "&-specialDay":{
        "borderWidth":0,
        "backgroundColor":"#FF9F9F"
      },
      "&-weekend":{
        "borderWidth":0,
        "textColor":"#A3A3A3"
      }
    }
  }
};

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

### Calendar.prototype.addStyles(style)
Merges specified styles to current styles and updates the component

### Calendar.prototype.changeCalendar(lang:String, type:String)
Changes the calendar's type

  Supported Calendars:
  - CalendarTypes.HIJRI
  - CalendarTypes.GREGORIAN

### Calendar.prototype.changeLang(lang:String)
Changes the calendar's language.

 Supported Calendars:
  - Turkish : "tr"
  - German : "de"
  - French : "fr"
  - Arabic: "ar"
  - Arabic (Saudi): "ar-sa"
  - Dutch : "nl"
   and all languages that are supported by [moment.js](https://github.com/moment/moment/tree/develop/locale)

### Calendar.prototype.dispose()
Disposes the calendar.

### Calendar.prototype.nextMonth()
Jumps to the next month

### Calendar.prototype.now()
Selects today.

### Calendar.prototype.prevMonth()
Jumps to the previous month

### Calendar.prototype.setSelectedDate({day: Number, month: Number, year: Number})
Sets specified date object as the selected date.

### Calendar.prototype.onChanged Event
Called when user presses on a day on the calendar. Calendar injects to callback a selected date object is described above.
