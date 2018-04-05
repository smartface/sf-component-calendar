<a name="module_Calendar"></a>

## Calendar : <code>object</code>
Smartface Calendar Component

**Author**: Cenk Cetinkaya <cenk.cetinkaya@smartface.io>  
**Copyright**: Smartface 2018  

* [Calendar](#module_Calendar) : <code>object</code>
    * [~Calendar](#module_Calendar..Calendar)
        * [new Calendar(options)](#new_module_Calendar..Calendar_new)
        * [.changeCalendar(lang, type, specialDays)](#module_Calendar..Calendar+changeCalendar)
        * [.addStyles(styles)](#module_Calendar..Calendar+addStyles)
        * [.setDate(date)](#module_Calendar..Calendar+setDate)
        * [.setRangeDates(start, end)](#module_Calendar..Calendar+setRangeDates)
        * [.setSelectedDate(date)](#module_Calendar..Calendar+setSelectedDate)
        * [.dispose()](#module_Calendar..Calendar+dispose)
        * [.nextMonth()](#module_Calendar..Calendar+nextMonth)
        * [.now()](#module_Calendar..Calendar+now)
        * [.prevMonth()](#module_Calendar..Calendar+prevMonth)
        * [.selectDay(weekIndex, weekDayIndex, notify)](#module_Calendar..Calendar+selectDay)
    * [~DateDTO](#module_Calendar..DateDTO) : <code>Object</code>
    * [~DateInfoDTO](#module_Calendar..DateInfoDTO) : <code>Object</code>

<a name="module_Calendar..Calendar"></a>

### Calendar~Calendar
**Kind**: inner class of [<code>Calendar</code>](#module_Calendar)  

* [~Calendar](#module_Calendar..Calendar)
    * [new Calendar(options)](#new_module_Calendar..Calendar_new)
    * [.changeCalendar(lang, type, specialDays)](#module_Calendar..Calendar+changeCalendar)
    * [.addStyles(styles)](#module_Calendar..Calendar+addStyles)
    * [.setDate(date)](#module_Calendar..Calendar+setDate)
    * [.setRangeDates(start, end)](#module_Calendar..Calendar+setRangeDates)
    * [.setSelectedDate(date)](#module_Calendar..Calendar+setSelectedDate)
    * [.dispose()](#module_Calendar..Calendar+dispose)
    * [.nextMonth()](#module_Calendar..Calendar+nextMonth)
    * [.now()](#module_Calendar..Calendar+now)
    * [.prevMonth()](#module_Calendar..Calendar+prevMonth)
    * [.selectDay(weekIndex, weekDayIndex, notify)](#module_Calendar..Calendar+selectDay)

<a name="new_module_Calendar..Calendar_new"></a>

#### new Calendar(options)
Calendar Component


| Param | Type |
| --- | --- |
| options | <code>object</code> | 

**Example**  
```js
const {Calendar} = require('@smartface/sf-component-calendar/components');
const specialDaysConf = require('./specialDays.json');
	
	const myCalendar = new Calendar();
	
	// Please use after Page:onShow event.
	myCalendar.changeCalendar("en", "gregorian", specialDaysConf)
	// when user select a date
	myCalendar.onDaySelect = function(dateInfo){
	  //...
	}
	
	// changing calendar date
	myCalendar.setSelectedDate({month:2, year:2017, day:12});
```
<a name="module_Calendar..Calendar+changeCalendar"></a>

#### calendar.changeCalendar(lang, type, specialDays)
Changes calendar creating new calendar data and resets view
*Supported Calendars:**
  - CalendarTypes.HIJRI
  - CalendarTypes.GREGORIAN
*Supported Languages:**
  - Turkish : "tr"
  - German : "de"
  - French : "fr"
  - Arabic: "ar"
  - Arabic (Saudi): "ar-sa"
  - Dutch : "nl"
   and all languages that are supported by [moment.js](https://github.com/moment/moment/tree/develop/locale)

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| lang | <code>string</code> | Language code like 'en, en-US, tr, ar-SA etc.' |
| type | <code>string</code> | Calendar type, values can only be gregorian or hijri. |
| specialDays | <code>object</code> \| <code>null</code> | Specialdays objects |

<a name="module_Calendar..Calendar+addStyles"></a>

#### calendar.addStyles(styles)
Changes Calendar styles

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | A style object |

<a name="module_Calendar..Calendar+setDate"></a>

#### calendar.setDate(date)
Sets calendar day without the day selection

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type |
| --- | --- |
| date | <code>DateDTO</code> | 

<a name="module_Calendar..Calendar+setRangeDates"></a>

#### calendar.setRangeDates(start, end)
Sets range dates

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>DateDTO</code> | Start date [DateDTO](DateDTO) |
| end | <code>DateDTO</code> | Final date [DateDTO](DateDTO) |

<a name="module_Calendar..Calendar+setSelectedDate"></a>

#### calendar.setSelectedDate(date)
Sets calendar date and highlight the day

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>DateDTO</code> | [DateDTO](DateDTO) |

<a name="module_Calendar..Calendar+dispose"></a>

#### calendar.dispose()
Disposes the Component instance

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
<a name="module_Calendar..Calendar+nextMonth"></a>

#### calendar.nextMonth()
Changes current to next month

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
<a name="module_Calendar..Calendar+now"></a>

#### calendar.now()
Changes selected date to now

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
<a name="module_Calendar..Calendar+prevMonth"></a>

#### calendar.prevMonth()
Changes current to previous month

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
<a name="module_Calendar..Calendar+selectDay"></a>

#### calendar.selectDay(weekIndex, weekDayIndex, notify)
Selects a day by week and day index

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| weekIndex | <code>number</code> | Calendar row index |
| weekDayIndex | <code>number</code> | Calendar column index |
| notify | <code>bool</code> | If fires selection event or not. |

<a name="module_Calendar..DateDTO"></a>

### Calendar~DateDTO : <code>Object</code>
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type |
| --- | --- |
| day | <code>number</code> | 
| month | <code>number</code> | 
| year | <code>number</code> | 

<a name="module_Calendar..DateInfoDTO"></a>

### Calendar~DateInfoDTO : <code>Object</code>
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type |
| --- | --- |
| longName | <code>string</code> | 
| shortName | <code>string</code> | 
| weekDay | <code>number</code> | 
| longName | <code>string</code> | 
| shortName | <code>string</code> | 
| specialDay | <code>Array.&lt;string&gt;</code> | 
| day | <code>string</code> | 
| month | <code>string</code> | 
| year | <code>string</code> | 
| localeDate | <code>Calendar~LocaleDateDTO</code> | 
| date | <code>Calendar~DateDTO</code> | 
| dayInfo | <code>Calendar~DayInfoDTO</code> | 
| daymonthInfo | <code>Calendar~DayMonthInfoDTO</code> | 


<a name="module_CalendarCore"></a>

## CalendarCore
Smartface Calendar Component

**Copyright**: Smartface 2018  

* [CalendarCore](#module_CalendarCore)
    * [~CalendarCore](#module_CalendarCore..CalendarCore)
        * [.setRangeSelection(start, end)](#module_CalendarCore..CalendarCore+setRangeSelection)
    * [~getInitialState()](#module_CalendarCore..getInitialState) ⇒ <code>object</code>
    * [~notify()](#module_CalendarCore..notify)
    * [~calculateDatePos(startDayOfMonth, day)](#module_CalendarCore..calculateDatePos)
    * [~getDateData(date, month)](#module_CalendarCore..getDateData) ⇒ <code>Calendar~DateInfo</code>
    * [~getDatePos(date, month, notValue)](#module_CalendarCore..getDatePos) ⇒ <code>Object</code> \| <code>\*</code>

<a name="module_CalendarCore..CalendarCore"></a>

### CalendarCore~CalendarCore
**Kind**: inner class of [<code>CalendarCore</code>](#module_CalendarCore)  
<a name="module_CalendarCore..CalendarCore+setRangeSelection"></a>

#### calendarCore.setRangeSelection(start, end)
Creates range selection

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| start | <code>object</code> | 
| end | <code>object</code> | 

<a name="module_CalendarCore..getInitialState"></a>

### CalendarCore~getInitialState() ⇒ <code>object</code>
Returns initial state

**Kind**: inner method of [<code>CalendarCore</code>](#module_CalendarCore)  
<a name="module_CalendarCore..notify"></a>

### CalendarCore~notify()
Notifies subscibers

**Kind**: inner method of [<code>CalendarCore</code>](#module_CalendarCore)  
<a name="module_CalendarCore..calculateDatePos"></a>

### CalendarCore~calculateDatePos(startDayOfMonth, day)
Calcucalte given day's week and weekday index

**Kind**: inner method of [<code>CalendarCore</code>](#module_CalendarCore)  

| Param | Type |
| --- | --- |
| startDayOfMonth | <code>number</code> | 
| day | <code>number</code> | 

<a name="module_CalendarCore..getDateData"></a>

### CalendarCore~getDateData(date, month) ⇒ <code>Calendar~DateInfo</code>
Gets specified date's info data in specified month.

**Kind**: inner method of [<code>CalendarCore</code>](#module_CalendarCore)  
**Throw**: <code>TypeError</code>  

| Param | Type |
| --- | --- |
| date | <code>object</code> | 
| month | <code>object</code> | 

<a name="module_CalendarCore..getDatePos"></a>

### CalendarCore~getDatePos(date, month, notValue) ⇒ <code>Object</code> \| <code>\*</code>
Calculates week and weekday indexes in the month

**Kind**: inner method of [<code>CalendarCore</code>](#module_CalendarCore)  

| Param | Type | Default |
| --- | --- | --- |
| date | <code>object</code> |  | 
| month | <code>object</code> |  | 
| notValue | <code>object</code> | <code></code> | 


<a name="module_CalendarTypes"></a>

## CalendarTypes
<a name="module_CalendarTypes..CalendarTypes"></a>

### CalendarTypes~CalendarTypes : <code>enum</code>
Enum for tri-state values.

**Kind**: inner enum of [<code>CalendarTypes</code>](#module_CalendarTypes)  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| HIJRI | <code>string</code> | <code>&quot;hijri&quot;</code> | 
| GREGORIAN | <code>string</code> | <code>&quot;gregorian&quot;</code> | 


<a name="module_CalendarWeekly"></a>

## CalendarWeekly : <code>function</code>
Smartface Calendar Component

**Author**: Cenk Cetinkaya <cenk.cetinkaya@smartface.io>  
**Copyright**: Smartface 2018  

* [CalendarWeekly](#module_CalendarWeekly) : <code>function</code>
    * [~CalendarWeekly](#module_CalendarWeekly..CalendarWeekly)
        * [new CalendarWeekly(options)](#new_module_CalendarWeekly..CalendarWeekly_new)
        * [.nextMonth()](#module_CalendarWeekly..CalendarWeekly+nextMonth)
        * [.selectDay(weekIndex, weekDayIndex, notify)](#module_CalendarWeekly..CalendarWeekly+selectDay)
        * [.prevMonth()](#module_CalendarWeekly..CalendarWeekly+prevMonth)
        * [.nextWeek()](#module_CalendarWeekly..CalendarWeekly+nextWeek)
        * [.prevWeek()](#module_CalendarWeekly..CalendarWeekly+prevWeek)
        * [.changeCalendar(lang, type, specialDays)](#module_CalendarWeekly..CalendarWeekly+changeCalendar)
        * [.setSelectedDate(date)](#module_CalendarWeekly..CalendarWeekly+setSelectedDate)
    * [~onDaySelect](#module_CalendarWeekly..onDaySelect) : <code>function</code>

<a name="module_CalendarWeekly..CalendarWeekly"></a>

### CalendarWeekly~CalendarWeekly
**Kind**: inner class of [<code>CalendarWeekly</code>](#module_CalendarWeekly)  

* [~CalendarWeekly](#module_CalendarWeekly..CalendarWeekly)
    * [new CalendarWeekly(options)](#new_module_CalendarWeekly..CalendarWeekly_new)
    * [.nextMonth()](#module_CalendarWeekly..CalendarWeekly+nextMonth)
    * [.selectDay(weekIndex, weekDayIndex, notify)](#module_CalendarWeekly..CalendarWeekly+selectDay)
    * [.prevMonth()](#module_CalendarWeekly..CalendarWeekly+prevMonth)
    * [.nextWeek()](#module_CalendarWeekly..CalendarWeekly+nextWeek)
    * [.prevWeek()](#module_CalendarWeekly..CalendarWeekly+prevWeek)
    * [.changeCalendar(lang, type, specialDays)](#module_CalendarWeekly..CalendarWeekly+changeCalendar)
    * [.setSelectedDate(date)](#module_CalendarWeekly..CalendarWeekly+setSelectedDate)

<a name="new_module_CalendarWeekly..CalendarWeekly_new"></a>

#### new CalendarWeekly(options)
Calendar Component


| Param | Type |
| --- | --- |
| options | <code>object</code> | 

**Example**  
```js
const {CalendarWeekly:Calendar} = require('@smartface/sf-component-calendar/components/CalendarWeekly');
const specialDaysConf = require('./specialDays.json');
	
	const myCalendar = new Calendar();
	
	// Please use after Page:onShow event.
	myCalendar.changeCalendar("en", "gregorian", specialDaysConf)
	// when user select a date
	myCalendar.onDaySelect = function(dateInfo){
	  //...
	}
	
	// changing calendar date
	myCalendar.setSelectedDate({month:2, year:2017, day:12});
```
<a name="module_CalendarWeekly..CalendarWeekly+nextMonth"></a>

#### calendarWeekly.nextMonth()
Changes current to next month

**Kind**: instance method of [<code>CalendarWeekly</code>](#module_CalendarWeekly..CalendarWeekly)  
<a name="module_CalendarWeekly..CalendarWeekly+selectDay"></a>

#### calendarWeekly.selectDay(weekIndex, weekDayIndex, notify)
Selects a day by week and day index

**Kind**: instance method of [<code>CalendarWeekly</code>](#module_CalendarWeekly..CalendarWeekly)  

| Param | Type | Description |
| --- | --- | --- |
| weekIndex | <code>number</code> | Calendar row index |
| weekDayIndex | <code>number</code> | Calendar column index |
| notify | <code>bool</code> | If fires selection event or not. |

<a name="module_CalendarWeekly..CalendarWeekly+prevMonth"></a>

#### calendarWeekly.prevMonth()
Changes current to previous month

**Kind**: instance method of [<code>CalendarWeekly</code>](#module_CalendarWeekly..CalendarWeekly)  
<a name="module_CalendarWeekly..CalendarWeekly+nextWeek"></a>

#### calendarWeekly.nextWeek()
Jumps to the next week. If the week is the last week then jumps to 
the next month and its first week.

**Kind**: instance method of [<code>CalendarWeekly</code>](#module_CalendarWeekly..CalendarWeekly)  
<a name="module_CalendarWeekly..CalendarWeekly+prevWeek"></a>

#### calendarWeekly.prevWeek()
Jumps to the previous week. If the week is the first week then jumps to 
the previous month and its last week.

**Kind**: instance method of [<code>CalendarWeekly</code>](#module_CalendarWeekly..CalendarWeekly)  
<a name="module_CalendarWeekly..CalendarWeekly+changeCalendar"></a>

#### calendarWeekly.changeCalendar(lang, type, specialDays)
Changes calendar creating new calendar data and resets view
*Supported Calendars:**
  - CalendarTypes.HIJRI
  - CalendarTypes.GREGORIAN
*Supported Languages:**
  - Turkish : "tr"
  - German : "de"
  - French : "fr"
  - Arabic: "ar"
  - Arabic (Saudi): "ar-sa"
  - Dutch : "nl"
   and all languages that are supported by [moment.js](https://github.com/moment/moment/tree/develop/locale)

**Kind**: instance method of [<code>CalendarWeekly</code>](#module_CalendarWeekly..CalendarWeekly)  

| Param | Type | Description |
| --- | --- | --- |
| lang | <code>string</code> | Language code like 'en, en-US, tr, ar-SA etc.' |
| type | <code>string</code> | Calendar type, values can only be gregorian or hijri. |
| specialDays | <code>object</code> \| <code>null</code> | Specialdays objects |

<a name="module_CalendarWeekly..CalendarWeekly+setSelectedDate"></a>

#### calendarWeekly.setSelectedDate(date)
Sets calendar date and highlight the day

**Kind**: instance method of [<code>CalendarWeekly</code>](#module_CalendarWeekly..CalendarWeekly)  

| Param | Type |
| --- | --- |
| date | <code>Calendar~DateDTO</code> | 

<a name="module_CalendarWeekly..onDaySelect"></a>

### CalendarWeekly~onDaySelect : <code>function</code>
Called when some days are selected.

**Kind**: inner typedef of [<code>CalendarWeekly</code>](#module_CalendarWeekly)  

| Type | Description |
| --- | --- |
| <code>Calendar~DateInfoDTO</code> | [Calendar~DateInfoDTO](Calendar~DateInfoDTO) |


