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


