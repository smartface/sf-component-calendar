# Smartface Calendar Component

## Intallation
```sh $ npm i @smartface/sf-component-calendar ```

## Usage
```js 

const Calendar = require("@smartface/sf-component-calendar");
const calendar = new Calendar();

// injects selected date
calendar.onChange = function(data){
  ...
}
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
