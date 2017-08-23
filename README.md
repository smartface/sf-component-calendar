# Smartface Calendar Component
[![Npm Status](https://img.shields.io/npm/v/@smartface/sf-calendar-component.svg?style=flat)](https://www.npmjs.com/package/@smartface/sf-calendar-component)

## Component Intallation
``` $ npm i @smartface/sf-calendar-component ```

## Component Usage
```js 

const Calendar = require("@smartface/sf-calendar-component/components/Calendar");
const myCalendar = new Calendar();

// when user select a date
myCalendar.onChange = function(data){
  ...
}

// changing calendar date
myCalendar.setSelectedDate({month: Number, year: Number, day: Number});
```

## Component maintaning for Smartface Developers

Create new cloud workspace in the Smartface-Cloud with this repository url. Open Cloud IDE and switch to terminal in the scripts folder. Install dependencies via terminal:

``` 
    $ npm i moment
    $ npm i moment-hijri
```

Then run command via terminal on the workspace root for TDD

``` 
  $ npm i 
  $ npm run test:watch```

and run command to build service layer

``` $npm run dev ```

Finally run commnand on the scripts folder to publish to npm:

``` $ npm publish ```

### Selected Date Schema

```js
{ 
  year: Number,
  dayInfo: {
    weekDay: Number,
    longName: String
    shortName: String
    day: Number
  },
  monthInfo: {
    longName: String
    shortName: String
    month: Number
  }
}

```
## Styling

Default style
```js

{
  ".calendar":{
    "&-size":{
      "right":0,
      "left":0,
      "top":0,
      "height":360,
      "paddingLeft":0,
      "paddingRight":0
    },
    ".header":{
      "&_navbar":{
        "&_monthLabel":{
          "textColor":"#1775D0"
        },
        "&_yearLabel":{
          "textColor":"#B1B1B4"
        },
        "&_arrow":{
          "flexProps":{
            "flexGrow":1,
            "textColor":"#B1B1B4",

          }
        },
        "&_daynames":{
          ".weekday":{
            "textColor":"#000000",
            "backgroundColor":"rgba(0,185,255,42)"
          },
          ".weekend":{
            "textColor":"#000000",
            "backgroundColor":"rgba(0,185,255,42)"
          }
        }
      }
    },
    ".body":{
    },
    ".weekRow":{
      "minHeight":42,
      "flexProps":{
        "flexDirection":"ROW",
        "justifyContent":"SPACE_AROUND",
        "alignItems":"CENTER",
        "alignContent":"CENTER"
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
      "borderRadius":20,
      "maxWidth":40,
      "minWidth":40,
      "height":40,
      "textColor":"#000000",
      "borderColor":"rgba(0,0,0,0)",
      "backgroundColor":"rgba(0,0,0,0)",
      "&-inrange":{
        "backgroundColor":"rgba(0,185,255,42)",
        "textColor":"#000000",
      },
      "&-selected":{
        "backgroundColor":"rgba(0,185,255,42)",
        "borderColor":"rgba(0,185,255,42)",
        "textColor":"#000000"
      },
      "&-deactiveDays":{
        "borderWidth":0,
        "textColor":"#D6D6D6",
        "borderColor":"#D6D6D6",
        "backgroundColor":"rgba(0,0,0,0)"
      },
      "&-specialDays":{
        "borderWidth":0,
        "&-selected":{
          "@extend":".calendar.day-selected",

        },
        "backgroundColor":"rgba(0,0,0,0)"
      },
      "&-weekend":{
        "borderWidth":0,
        "textColor":"#A3A3A3",
        "borderColor":"#A3A3A3"
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

### Calendar.prototype.setSelectedDate({day: Number, month: Number, year: Number})
Sets specified date object as the selected date.

### Calendar.prototype.nextMonth()
Jumps to the next month

### Calendar.prototype.prevMonth()
Jumps to the previous month

### Calendar.prototype.changeCalendar(type:String)
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

