# Smartface Calendar Component

## Intallation
``` $ npm i @smartface/sf-component-calendar ```

## Usage
```js 

const Calendar = require("@smartface/sf-calendar-component/components/Calendar");
const calendar = new Calendar();

// when user select a date
calendar.onChange = function(data){
  ...
}

// changing calendar date
calendar.setSelectedDate({month: Number, year: Number, day: Number});
```

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
