# Smartface Calendar Component
[![Npm Status](https://img.shields.io/npm/v/@smartface/sf-calendar-component.svg?style=flat)](https://www.npmjs.com/package/@smartface/sf-component-calendar)

## Component Intallation
``` $ npm i @smartface/sf-component-calendar ```

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
    - className: .calendar-self
    - children:
      - **navbar**
        - type: FlexLayout
        - styling id: #calendar_navbar
        - className: .calendar.header_navbar
        - children: 
          - **prevMonth**:
            - type: Button
            - styling id: #calendar_navbar_prevMonth
            - className: .calendar.header_navbar_arrow
          - **nextMonth**:
            - type: Button
            - styling id: #calendar_navbar_nextMonth
            - className: .calendar.header_navbar_arrow
          -  **monthLabel**:
              - type: Label
              - styling id: #calendar_navbar_monthLabel
              - className: .calendar.header_navbar_monthLabel
    - **calendarYear**: #calendar_calendarYear
      - type: FlexLayout
      - styling id: #calendar_calendarYear
      - className: .calendar_calendarYear
      - children:
        - **yearLabel**
          - type: FlexLayout
          - styling id: #calendar_calendarYear_yearLabel
          - className: .calendar_calendarYear_yearLabel
          - children:
            - **label**
              - type: Label
              - styling id: #calendar_yearLabel_label
      - **calendarDays**:
        - type: FlexLayout
        - styling id: #calendar_calendarDays
        - className: .calendar.header_dayNames
        - children:
          - **dayName_0, dayName_1, dayName_2, dayName_3, dayName_4, dayName_5, dayName_6**
            - className: .calendar.header_dayNames_dayName
            - types: Label
            - styling id: #calendar_calendarDays_{component name}
      - **calendarBody**
        - type: FlexLayout
        - styling id: #calendar_calendarBody
        - className: .calendar.body
        - children:
          - **week1, week2, week3, week4, week5, week6, week7**
            - types: FlexLayout
            - className: .calendar.weekrow
            - children each:
              - **weekDay1, weekDay2, weekDay3, weekDay4, weekDay5, weekDay6, weekDay7**
                - types: Button
                - styling id: #calendar_{week component name}_{weekday component name}
                - className: .calendar.day
    
      
### Selected Date Schema

```js
{ 
  localeDate: {
    day: String,
    month: String,
    year: String
  },
  date: {
    day: Number,
    month: Number,
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

## Special Days

You can configure special-days in The Calendar by years, calendars, languages and months. Example of a specialdays configuration.

```js
"byYears":[
  {
    "year":2018,
    "months":[
      // month 1st      {
        "month":0,
        /** @type        {
          SpecialDays
        }        */
  		    "days":[
          // day 1st          {
            "day":0,
            "calendars":{
              "gregorian":{
                "availableLangs":"en,tr",
                "text":{
                  "*":"Happy New Year",
                  "tr":"Mutlu Yeni Yillar"
                }
              }
            }
          }
        ]        //end of days
      }
    ]    //end of months
  }
],
//end of byYears
    "byMonths":[
  // month 1st  {
    "month":0,
    /** @type    {
      SpecialDays
    }    */
        "days":[
      {
        "day":0,
        "calendars":{
          "gregorian":{
            "availableLangs":"en,tr",
            "text":{
              "*":"in all langs",
              "tr":"just in turkish"
            }
          }
        },
        "length":2
      },
      {
        "day":6,
        "calendars":{
          "*":{
            "availableLangs":"en,tr",
            "text":{
              "*":"in all langs",
              "tr":"just in turkish"
            }
          }
        }
      }
    ]    //end of days,

  },
  // month 4th  {
    "month":3,
    "days":[
      {
        "day":11,
        "calendars":{
          "*":{
            "availableLangs":"en,ar",
            "text":{
              "*":"in all langs",
              "ar":"just in arabic"
            }
          }
        }
      }
    ]    //end of days
  },
  //end of month 4th
      // month 9th  {
    "month":9,
    "days":[
      {
        "day":1,
        "calendars":{
          "*":{
            "availableLangs":"en,ar",
            "text":{
              "*":"in all langs",
              "ar":"just in arabic",
              "tr":"Kurban bayrami"
            }
          }
        },
        "length":3
      }
    ]    //end of days
  },
  //end of month 9th
]//end of byMonths
}

```

## Anatomy of The Specialday Configuration
There are 2 types in the configuration.
**byYear**
  
You can create specialdays in this section by years. This section start with years. Years include months and month days.

**byMonth**  

You can create specialdays in this section by months and these definitions are included within all years. This section starts with months.

### Specialday Data Types
**Year** 
  - year: Number
  - months: Array.<Month>
  
**Month** 
  - month: Number - month index 1..12
  - days: Array.<Day>
  
**Day**
  - day: Number - Date day
  - calendars: Object.<CalendarEnum, Calendar>
  - length: Number - It defines how long this special day is.
  
**Calendar**
  - text: Object.<LangEnum, string>
  - availableLangs: string - Comma seperated languages string. For example: "en,tr". It also includes not-available langs with "~" operator for example "~de,~ar".
  
**LangEnum**
  - en
  - ar
  - tr
  
Includes all supported languages shorts like above.
  
  - ~en
  - ~ar
  
And includes not-include languages.
  
  - \*
  
And includes all languages operator.
 
**CalendarEnum**
  - \*: All calendars
  - hijri: Hijri calendar 
  - gregorian: Gregorian calendar
  
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

### Calendar.prototype.addStyles(styleObject:Object)
Merges specified styles to current styles and updates the component

### Calendar.prototype.changeCalendar(lang:String="en", type:String="gregorian", specialDays:Object={})
Changes the calendar's type

  Supported Calendars:
  - CalendarTypes.HIJRI
  - CalendarTypes.GREGORIAN

 Supported Languages:
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
