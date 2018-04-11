<a name="module_CalendarWeekly"></a>

## CalendarWeekly : <code>class</code>
Smartface Calendar Component

**Copyright**: Smartface 2018  

* [CalendarWeekly](#module_CalendarWeekly) : <code>class</code>
    * [~CalendarWeekly](#module_CalendarWeekly..CalendarWeekly)
        * [new CalendarWeekly(options)](#new_module_CalendarWeekly..CalendarWeekly_new)
        * [.nextMonth()](#module_CalendarWeekly..CalendarWeekly+nextMonth)
        * [.selectDay(weekIndex, weekDayIndex, notify)](#module_CalendarWeekly..CalendarWeekly+selectDay)
        * [.prevMonth()](#module_CalendarWeekly..CalendarWeekly+prevMonth)
        * [.nextWeek()](#module_CalendarWeekly..CalendarWeekly+nextWeek)
        * [.prevWeek()](#module_CalendarWeekly..CalendarWeekly+prevWeek)
        * [.changeCalendar([lang], [type], [specialDays])](#module_CalendarWeekly..CalendarWeekly+changeCalendar)
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
    * [.changeCalendar([lang], [type], [specialDays])](#module_CalendarWeekly..CalendarWeekly+changeCalendar)
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

#### calendarWeekly.changeCalendar([lang], [type], [specialDays])
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

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [lang] | <code>string</code> | <code>&quot;\&quot;en\&quot;&quot;</code> | Language code like 'en, en-US, tr, ar-SA etc.' |
| [type] | <code>string</code> | <code>&quot;\&quot;gregorian\&quot;&quot;</code> | Calendar type, values can only be gregorian or hijri. |
| [specialDays] | <code>object</code> \| <code>null</code> | <code></code> | Specialdays objects |

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


