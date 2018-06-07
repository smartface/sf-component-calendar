<a name="module_CalendarCore"></a>

## CalendarCore : <code>class</code>
Smartface Calendar Component

**Copyright**: Smartface 2018  

* [CalendarCore](#module_CalendarCore) : <code>class</code>
    * [~CalendarCore](#module_CalendarCore..CalendarCore)
        * [new CalendarCore()](#new_module_CalendarCore..CalendarCore_new)
        * [.reset()](#module_CalendarCore..CalendarCore+reset)
        * [.selectDay(weekIndex, weekDayIndex)](#module_CalendarCore..CalendarCore+selectDay)
        * [.clearSelection()](#module_CalendarCore..CalendarCore+clearSelection)
        * [.prevWeek()](#module_CalendarCore..CalendarCore+prevWeek)
        * [.setRangeSelection(start, end)](#module_CalendarCore..CalendarCore+setRangeSelection)
        * [.rangeSelection(weekIndex, weekDayIndex)](#module_CalendarCore..CalendarCore+rangeSelection)
        * [.startRangeSelection()](#module_CalendarCore..CalendarCore+startRangeSelection)
        * [.completeRangeSelection()](#module_CalendarCore..CalendarCore+completeRangeSelection)
        * [.subscribe(cb)](#module_CalendarCore..CalendarCore+subscribe)
        * [.unsubscribe(cb)](#module_CalendarCore..CalendarCore+unsubscribe)
        * [.now()](#module_CalendarCore..CalendarCore+now)
        * [.getWeekDay()](#module_CalendarCore..CalendarCore+getWeekDay) ⇒ <code>number</code>
        * [.getState()](#module_CalendarCore..CalendarCore+getState) ⇒ <code>Object</code>
        * [.nextMonth()](#module_CalendarCore..CalendarCore+nextMonth)
        * [.setState(state)](#module_CalendarCore..CalendarCore+setState)
        * [.setDate(date)](#module_CalendarCore..CalendarCore+setDate)
        * [.setSelectedDate(date)](#module_CalendarCore..CalendarCore+setSelectedDate)
        * [.changeCalendar([lang], [type], [specialDays])](#module_CalendarCore..CalendarCore+changeCalendar)
        * [.prevMonth()](#module_CalendarCore..CalendarCore+prevMonth)
    * [~getInitialState()](#module_CalendarCore..getInitialState) ⇒ <code>object</code>
    * [~notify({Object), newState)](#module_CalendarCore..notify)
    * [~calculateDatePos(startDayOfMonth, day)](#module_CalendarCore..calculateDatePos)
    * [~getDateData(date, month)](#module_CalendarCore..getDateData) ⇒ <code>Calendar~DateInfo</code>
    * [~getDatePos(date, month, notValue)](#module_CalendarCore..getDatePos) ⇒ <code>Object</code> \| <code>\*</code>

<a name="module_CalendarCore..CalendarCore"></a>

### CalendarCore~CalendarCore
**Kind**: inner class of [<code>CalendarCore</code>](#module_CalendarCore)  

* [~CalendarCore](#module_CalendarCore..CalendarCore)
    * [new CalendarCore()](#new_module_CalendarCore..CalendarCore_new)
    * [.reset()](#module_CalendarCore..CalendarCore+reset)
    * [.selectDay(weekIndex, weekDayIndex)](#module_CalendarCore..CalendarCore+selectDay)
    * [.clearSelection()](#module_CalendarCore..CalendarCore+clearSelection)
    * [.prevWeek()](#module_CalendarCore..CalendarCore+prevWeek)
    * [.setRangeSelection(start, end)](#module_CalendarCore..CalendarCore+setRangeSelection)
    * [.rangeSelection(weekIndex, weekDayIndex)](#module_CalendarCore..CalendarCore+rangeSelection)
    * [.startRangeSelection()](#module_CalendarCore..CalendarCore+startRangeSelection)
    * [.completeRangeSelection()](#module_CalendarCore..CalendarCore+completeRangeSelection)
    * [.subscribe(cb)](#module_CalendarCore..CalendarCore+subscribe)
    * [.unsubscribe(cb)](#module_CalendarCore..CalendarCore+unsubscribe)
    * [.now()](#module_CalendarCore..CalendarCore+now)
    * [.getWeekDay()](#module_CalendarCore..CalendarCore+getWeekDay) ⇒ <code>number</code>
    * [.getState()](#module_CalendarCore..CalendarCore+getState) ⇒ <code>Object</code>
    * [.nextMonth()](#module_CalendarCore..CalendarCore+nextMonth)
    * [.setState(state)](#module_CalendarCore..CalendarCore+setState)
    * [.setDate(date)](#module_CalendarCore..CalendarCore+setDate)
    * [.setSelectedDate(date)](#module_CalendarCore..CalendarCore+setSelectedDate)
    * [.changeCalendar([lang], [type], [specialDays])](#module_CalendarCore..CalendarCore+changeCalendar)
    * [.prevMonth()](#module_CalendarCore..CalendarCore+prevMonth)

<a name="new_module_CalendarCore..CalendarCore_new"></a>

#### new CalendarCore()
CalendarCore Application Service
Manages all application logic and state of the calendar.

<a name="module_CalendarCore..CalendarCore+reset"></a>

#### calendarCore.reset()
Reset calendar state

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..CalendarCore+selectDay"></a>

#### calendarCore.selectDay(weekIndex, weekDayIndex)
Selects a day in current month

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| weekIndex | <code>number</code> | 
| weekDayIndex | <code>number</code> | 

<a name="module_CalendarCore..CalendarCore+clearSelection"></a>

#### calendarCore.clearSelection()
Removes selection

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..CalendarCore+prevWeek"></a>

#### calendarCore.prevWeek()
Changes week status to previous

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..CalendarCore+setRangeSelection"></a>

#### calendarCore.setRangeSelection(start, end)
Creates range selection

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| start | <code>object</code> | 
| end | <code>object</code> | 

<a name="module_CalendarCore..CalendarCore+rangeSelection"></a>

#### calendarCore.rangeSelection(weekIndex, weekDayIndex)
Activates range selection and changes its status

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| weekIndex | <code>number</code> | 
| weekDayIndex | <code>numer</code> | 

<a name="module_CalendarCore..CalendarCore+startRangeSelection"></a>

#### calendarCore.startRangeSelection()
Activates to start calendar.

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
|  | <code>Object</code> | 

<a name="module_CalendarCore..CalendarCore+completeRangeSelection"></a>

#### calendarCore.completeRangeSelection()
Completes range selection

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
|  | <code>Object</code> | 

<a name="module_CalendarCore..CalendarCore+subscribe"></a>

#### calendarCore.subscribe(cb)
Adds callback to subscription list

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_CalendarCore..CalendarCore+unsubscribe"></a>

#### calendarCore.unsubscribe(cb)
Removes callback from subscription list

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="module_CalendarCore..CalendarCore+now"></a>

#### calendarCore.now()
Selects today

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..CalendarCore+getWeekDay"></a>

#### calendarCore.getWeekDay() ⇒ <code>number</code>
Gets week day index of selected date

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..CalendarCore+getState"></a>

#### calendarCore.getState() ⇒ <code>Object</code>
Gets latest state

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..CalendarCore+nextMonth"></a>

#### calendarCore.nextMonth()
Changes calendar current to next month

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..CalendarCore+setState"></a>

#### calendarCore.setState(state)
Updates state

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | State object |

<a name="module_CalendarCore..CalendarCore+setDate"></a>

#### calendarCore.setDate(date)
Changes current selected month

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| date | <code>Calendar~DateDtO</code> | 

<a name="module_CalendarCore..CalendarCore+setSelectedDate"></a>

#### calendarCore.setSelectedDate(date)
Changes current selected date

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type |
| --- | --- |
| date | <code>Calendar~DateDtO</code> | 

<a name="module_CalendarCore..CalendarCore+changeCalendar"></a>

#### calendarCore.changeCalendar([lang], [type], [specialDays])
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

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [lang] | <code>string</code> | <code>&quot;\&quot;en\&quot;&quot;</code> | Language code like 'en, en-US, tr, ar-SA etc.' |
| [type] | <code>string</code> | <code>&quot;\&quot;gregorian\&quot;&quot;</code> | Calendar type, values can only be gregorian or hijri. |
| [specialDays] | <code>object</code> \| <code>null</code> | <code></code> | Specialdays objects |

<a name="module_CalendarCore..CalendarCore+prevMonth"></a>

#### calendarCore.prevMonth()
Changes calendar month to previous month

**Kind**: instance method of [<code>CalendarCore</code>](#module_CalendarCore..CalendarCore)  
<a name="module_CalendarCore..getInitialState"></a>

### CalendarCore~getInitialState() ⇒ <code>object</code>
Returns initial state

**Kind**: inner method of [<code>CalendarCore</code>](#module_CalendarCore)  
<a name="module_CalendarCore..notify"></a>

### CalendarCore~notify({Object), newState)
Notifies subscibers

**Kind**: inner method of [<code>CalendarCore</code>](#module_CalendarCore)  

| Param | Type | Description |
| --- | --- | --- |
| {Object) |  | oldState |
| newState | <code>Object</code> |  |

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


