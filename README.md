# Smartface Calendar Component
[![Npm Status](https://img.shields.io/npm/v/@smartface/sf-component-calendar.svg?style=flat)](https://www.npmjs.com/package/@smartface/sf-component-calendar)

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
## Styling

Default style schema
```js

{
	".calendar": {
		"&-size": {
			"right":0,
			"left":0,
			"top":0,
			"height": 360,
			"paddingLeft": 0,
			"paddingRight": 0
		},
		".header": {
			"&_navbar": {
				"&_monthLabel": {
					"textColor": "#1775D0"
				},
				"&_yearLabel": {
					"textColor": "#B1B1B4"
				},
				"&_arrow": {
					"flexProps": {
						"flexGrow": 1,
						"textColor": "#B1B1B4",
					}
				},
				"&_label": {
					"textColor": "#000000",
				},
				"&_daynames": {
					".weekday": {
						"textColor": "#000000",
						"backgroundColor": "rgba(0,185,255,42)"
					},
					".weekend": {
						"textColor": "#000000",
						"backgroundColor": "rgba(0,185,255,42)"
					}
				}
			}
		},
		".body": {
		},
		".weekRow": {
			"minHeight": 42,
			"flexProps": {
				"flexDirection": "ROW",
				"justifyContent": "SPACE_AROUND",
				"alignItems": "CENTER",
				"alignContent": "CENTER"
			}
		},
		".day": {
			"font": {
				"size": 14,
				"bold": false,
				"italic": false,
				"family": "Arial"
			},
			"borderWidth": 0,
			"borderRadius": 20,
			"maxWidth": 40,
			"minWidth": 40,
			"height": 40,
			"textColor": "#000000",
			"borderColor": "rgba(0,0,0,0)",
			"backgroundColor": "rgba(0,0,0,0)",
			"&-inrange": {
				"backgroundColor": "rgba(0,185,255,42)",
				"textColor": "#000000",
			},
			"&-selected": {
				"backgroundColor": "rgba(0,185,255,42)",
				"borderColor": "rgba(0,185,255,42)",
				"textColor": "#000000"
			},
			"&-deactiveDays": {
				"borderWidth": 0,
				"textColor": "#D6D6D6",
				"borderColor": "#D6D6D6",
				"backgroundColor": "rgba(0,0,0,0)"
			},
			"&-specialDays": {
				"borderWidth": 0,
				"&-selected": {
					"@extend": ".calendar.day-selected",
				},
				"backgroundColor": "rgba(0,0,0,0)"
			},
			"&-weekend": {
				"borderWidth": 0,
				"textColor": "#A3A3A3",
				"borderColor": "#A3A3A3"
			}
		}
	}
};


```

### Changing Styles
```js
const newMonthLabelColorStyle = {
				".calendar": {
					".header": {
						"&_navbar": {
							"&_monthLabel": {
								"textColor": "#F10000"
							}
						}
					}
				}
			};
      
const Calendar = require("@smartface/sf-calendar-component/components/Calendar");
const calendar = new Calendar();

// changing calendar date
calendar.addStyles(newMonthLabelColorStyle);


```
