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
  
