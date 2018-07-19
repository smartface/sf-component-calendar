<a name="module_Calendar"></a>

## Calendar : <code>class</code>
Smartface Calendar Component

**Copyright**: Smartface 2018  

* [Calendar](#module_Calendar) : <code>class</code>
    * [~Calendar](#module_Calendar..Calendar)
        * [new Calendar(options)](#new_module_Calendar..Calendar_new)
        * [.changeCalendar([lang], [type], [specialDays], [firstDayOfWeek])](#module_Calendar..Calendar+changeCalendar)
        * [.addStyles(styles)](#module_Calendar..Calendar+addStyles)
        * [.getWeekMode()](#module_Calendar..Calendar+getWeekMode) ⇒ <code>boolean</code>
        * [.setWeekMode(value)](#module_Calendar..Calendar+setWeekMode)
        * [.setDate(date)](#module_Calendar..Calendar+setDate)
        * [.setRangeDates(start, end)](#module_Calendar..Calendar+setRangeDates)
        * [.setSelectedDate(date)](#module_Calendar..Calendar+setSelectedDate)
        * [.dispose()](#module_Calendar..Calendar+dispose)
        * [.nextMonth()](#module_Calendar..Calendar+nextMonth)
        * [.now()](#module_Calendar..Calendar+now)
        * [.prevMonth()](#module_Calendar..Calendar+prevMonth)
        * [.selectDay(weekIndex, weekDayIndex, [notify])](#module_Calendar..Calendar+selectDay)
        * ["onRangeSelectionStart" (start)](#module_Calendar..Calendar+event_onRangeSelectionStart)
        * ["onRangeSelectionComplete" (start, end)](#module_Calendar..Calendar+event_onRangeSelectionComplete)
        * ["onLongPress" (weekIndex, weekDayIndex)](#module_Calendar..Calendar+event_onLongPress)
        * ["onBeforeMonthChange" (date)](#module_Calendar..Calendar+event_onBeforeMonthChange)
        * ["onMonthChange"](#module_Calendar..Calendar+event_onMonthChange)
        * ["onDaySelect" (date)](#module_Calendar..Calendar+event_onDaySelect)
    * [~DateDTO](#module_Calendar..DateDTO) : <code>Object</code>
    * [~DayMonthInfoDTO](#module_Calendar..DayMonthInfoDTO)
    * [~DayInfoDTO](#module_Calendar..DayInfoDTO)
    * [~LocaleDateDTO](#module_Calendar..LocaleDateDTO)
    * [~DateInfoDTO](#module_Calendar..DateInfoDTO) : <code>Object</code>
    * [~CalendarOptions](#module_Calendar..CalendarOptions)

<a name="module_Calendar..Calendar"></a>

### Calendar~Calendar
**Kind**: inner class of [<code>Calendar</code>](#module_Calendar)  

* [~Calendar](#module_Calendar..Calendar)
    * [new Calendar(options)](#new_module_Calendar..Calendar_new)
    * [.changeCalendar([lang], [type], [specialDays], [firstDayOfWeek])](#module_Calendar..Calendar+changeCalendar)
    * [.addStyles(styles)](#module_Calendar..Calendar+addStyles)
    * [.getWeekMode()](#module_Calendar..Calendar+getWeekMode) ⇒ <code>boolean</code>
    * [.setWeekMode(value)](#module_Calendar..Calendar+setWeekMode)
    * [.setDate(date)](#module_Calendar..Calendar+setDate)
    * [.setRangeDates(start, end)](#module_Calendar..Calendar+setRangeDates)
    * [.setSelectedDate(date)](#module_Calendar..Calendar+setSelectedDate)
    * [.dispose()](#module_Calendar..Calendar+dispose)
    * [.nextMonth()](#module_Calendar..Calendar+nextMonth)
    * [.now()](#module_Calendar..Calendar+now)
    * [.prevMonth()](#module_Calendar..Calendar+prevMonth)
    * [.selectDay(weekIndex, weekDayIndex, [notify])](#module_Calendar..Calendar+selectDay)
    * ["onRangeSelectionStart" (start)](#module_Calendar..Calendar+event_onRangeSelectionStart)
    * ["onRangeSelectionComplete" (start, end)](#module_Calendar..Calendar+event_onRangeSelectionComplete)
    * ["onLongPress" (weekIndex, weekDayIndex)](#module_Calendar..Calendar+event_onLongPress)
    * ["onBeforeMonthChange" (date)](#module_Calendar..Calendar+event_onBeforeMonthChange)
    * ["onMonthChange"](#module_Calendar..Calendar+event_onMonthChange)
    * ["onDaySelect" (date)](#module_Calendar..Calendar+event_onDaySelect)

<a name="new_module_Calendar..Calendar_new"></a>

#### new Calendar(options)
Calendar Component


| Param | Type |
| --- | --- |
| options | <code>CalendarOptions</code> | 

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

#### calendar.changeCalendar([lang], [type], [specialDays], [firstDayOfWeek])
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

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [lang] | <code>string</code> | <code>&quot;\&quot;en\&quot;&quot;</code> | Language code like 'en, en-US, tr, ar-SA etc.' |
| [type] | <code>string</code> | <code>&quot;\&quot;gregorian\&quot;&quot;</code> | Calendar type, values can only be gregorian or hijri. |
| [specialDays] | <code>object</code> \| <code>null</code> | <code></code> | Specialdays objects |
| [firstDayOfWeek] | <code>number</code> | <code>0</code> | First day of a week [0...6] |

<a name="module_Calendar..Calendar+addStyles"></a>

#### calendar.addStyles(styles)
Changes Calendar styles

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | A style object |

<a name="module_Calendar..Calendar+getWeekMode"></a>

#### calendar.getWeekMode() ⇒ <code>boolean</code>
Returns calendar weekmode

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
<a name="module_Calendar..Calendar+setWeekMode"></a>

#### calendar.setWeekMode(value)
Displays only a week row

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type |
| --- | --- |
| value | <code>boolean</code> | 

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
**Emits**: <code>event:onBeforeMonthChange</code>, <code>event:onMonthChange</code>  
<a name="module_Calendar..Calendar+now"></a>

#### calendar.now()
Changes selected date to now

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
<a name="module_Calendar..Calendar+prevMonth"></a>

#### calendar.prevMonth()
Changes current to previous month

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
**Emits**: <code>event:onBeforeMonthChange</code>, <code>event:onMonthChange</code>  
<a name="module_Calendar..Calendar+selectDay"></a>

#### calendar.selectDay(weekIndex, weekDayIndex, [notify])
Selects a day by week and day index

**Kind**: instance method of [<code>Calendar</code>](#module_Calendar..Calendar)  
**Emits**: <code>event:onDaySelect</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| weekIndex | <code>number</code> |  | Calendar row index |
| weekDayIndex | <code>number</code> |  | Calendar column index |
| [notify] | <code>boolean</code> | <code>true</code> | If fires selection event or not. |

<a name="module_Calendar..Calendar+event_onRangeSelectionStart"></a>

#### "onRangeSelectionStart" (start)
**Kind**: event emitted by [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>DateInfoDTO</code> | Range start date |

<a name="module_Calendar..Calendar+event_onRangeSelectionComplete"></a>

#### "onRangeSelectionComplete" (start, end)
**Kind**: event emitted by [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>DateInfoDTO</code> | Range start date |
| end | <code>DateInfoDTO</code> | Range end date |

<a name="module_Calendar..Calendar+event_onLongPress"></a>

#### "onLongPress" (weekIndex, weekDayIndex)
LongPress

**Kind**: event emitted by [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type |
| --- | --- |
| weekIndex | <code>number</code> | 
| weekDayIndex | <code>number</code> | 

<a name="module_Calendar..Calendar+event_onBeforeMonthChange"></a>

#### "onBeforeMonthChange" (date)
**Kind**: event emitted by [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type |
| --- | --- |
| date | <code>DateDTO</code> | 

<a name="module_Calendar..Calendar+event_onMonthChange"></a>

#### "onMonthChange"
**Kind**: event emitted by [<code>Calendar</code>](#module_Calendar..Calendar)  
**Params**: <code>DateDtO</code> date  
<a name="module_Calendar..Calendar+event_onDaySelect"></a>

#### "onDaySelect" (date)
**Kind**: event emitted by [<code>Calendar</code>](#module_Calendar..Calendar)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Array.&lt;DateInfoDTO&gt;</code> | Selected date |

<a name="module_Calendar..DateDTO"></a>

### Calendar~DateDTO : <code>Object</code>
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type |
| --- | --- |
| day | <code>number</code> | 
| month | <code>number</code> | 
| year | <code>number</code> | 

<a name="module_Calendar..DayMonthInfoDTO"></a>

### Calendar~DayMonthInfoDTO
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type |
| --- | --- |
| longName | <code>string</code> | 
| shortName | <code>string</code> | 

<a name="module_Calendar..DayInfoDTO"></a>

### Calendar~DayInfoDTO
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type |
| --- | --- |
| weekDay | <code>number</code> | 
| longName | <code>string</code> | 
| shortName | <code>string</code> | 
| specialDay | <code>Array.&lt;string&gt;</code> | 

<a name="module_Calendar..LocaleDateDTO"></a>

### Calendar~LocaleDateDTO
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type |
| --- | --- |
| day | <code>string</code> | 
| month | <code>string</code> | 
| year | <code>string</code> | 

<a name="module_Calendar..DateInfoDTO"></a>

### Calendar~DateInfoDTO : <code>Object</code>
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type |
| --- | --- |
| localeDate | <code>Calendar~LocaleDateDTO</code> | 
| date | <code>Calendar~DateDTO</code> | 
| dayInfo | <code>Calendar~DayInfoDTO</code> | 
| daymonthInfo | <code>Calendar~DayMonthInfoDTO</code> | 

<a name="module_Calendar..CalendarOptions"></a>

### Calendar~CalendarOptions
**Kind**: inner typedef of [<code>Calendar</code>](#module_Calendar)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [useRangeSelection] | <code>boolean</code> | <code>true</code> | Activate range selection |
| [theme] | <code>Object</code> | <code></code> | Sets custom theme |
| [justCurrentDays] | <code>boolean</code> | <code>false</code> | To display only the month days |
| [useContext] | <code>boolean</code> | <code>true</code> | To use internal calendar-context |


