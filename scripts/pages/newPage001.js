/* 
		You can modify its contents.
*/

const extend = require('js-base/core/extend');
const NewPage001Design = require('ui/ui_newPage001');
const benchmark = require("../benchmarks/CalendarServices");
const runner = require("../benchmarks/runner");
const calendarTypes = require("../components/CalendarTypes");
const specialDays = require("./specialDays");
const Router = require("sf-core/ui/router");

var sample = {
  "byMonths":[
    {
      "month":11,
      "days":[
        {
          "day":1,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":2,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":3,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":4,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":7,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":8,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":9,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":10,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":11,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":14,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":15,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":16,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":17,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":18,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":21,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":22,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":23,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":24,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":25,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":28,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":29,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":30,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        },
        {
          "day":31,
          "calendars":{
            "*":{
              "availableLangs":"*",
              "text":{
                "*":"4"
              }
            }
          },
          "length":1
        }
      ]
    }
  ]
};

function changeCalendar(lang, calendar, sp){
	this.calendar.changeCalendar(lang, calendar, sp);
// 	this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
	this.calendar.applyLayout();
}

const NewPage001 = extend(NewPage001Design)(
	// Constructor
	function(_super){
		// Initalizes super class for this page scope
		_super(this);
	
		this.calendar = this.children.calendar;
    delete this.children.calendar;

		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

		this.calendar.onDaySelect = ([date]) => {
		  if(!date)
		    return
			this.children.label2.text = date.date.day+"/"+(date.date.month)+"/"+date.date.year;
			this.children.label2_1.text = date.dayInfo.specialDay.length > 0 
				? date.dayInfo.specialDay.join(" - ")
				: "Ozel Gun Yok";
		};
		
		this.children.buttonTR.onPress = () => {
			changeCalendar.call(this, "tr", "gregorian", sample);
			this.calendar.now();
		};
		
		this.children.buttonRange.onPress = () => {
		  this.calendar.setRangeDates({day: 21, month: 10, year: 2017}, {day: 12, month: 12, year: 2017});
		};
		
		this.children.buttonEN.onPress = () => {
			changeCalendar.call(this, "en", "gregorian", sample);
		};
		
		this.children.buttonAR.onPress = () => {
			changeCalendar.call(this, "ar-sa", "gregorian", sample);
		};
		
		this.children.buttonHijri.onPress = () => {
			changeCalendar.call(this, "ar-sa", calendarTypes.HIJRI, sample);
		};
		
		this.children.buttonGreg.onPress = () => {
			changeCalendar.call(this, "en", calendarTypes.GREGORIAN, sample);
		};
		
		this.children.nextPage.onPress = () => {
			Router.go("page3");
		};
		
		this.children.button3.onPress = () => {
			this.calendar.addStyles({
				".calendar.header_navbar_monthLabel": {
					"textColor": "#F10000"
				}
			});
		};
	}
);

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
  superOnShow();
  
	
	this.calendar.onDisplayChange = function(){
	};
  
  this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
// 	this.calendar.now();
	var fn = this.calendar.nextMonth.bind(this.calendar);
	// runner.add(fn, "nextMonth");
	// runner.add(fn, "nextMonth2");
	// runner.add(fn, "nextMonth3");
	// runner.add(fn, "nextMonth4");
	// runner.add(fn, "nextMonth5");
	// runner.add(fn, "nextMonth6");
	// runner.add(fn, "nextMonth7");
	// runner.add(fn, "nextMonth8");
	// runner.add(fn, "nextMonth9");
	// runner.add(fn, "nextMonth10");
	
	// runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth5");
	// runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth6");
	// runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth7");
	// runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth8");
	// runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth9");
	// runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth10");
	
	// runner.add(this.calendar.prevMonth.bind(this.calendar), "prevMonth");
	// runner.add(this.calendar.prevMonth.bind(this.calendar), "prevMonth2");
	// runner.add(this.calendar.prevMonth.bind(this.calendar), "prevMonth3");

	// setTimeout(function(){
		runner.runAll(3, function(res){
			res.forEach(function(item, index){
				// console.log(index+":"+item.logs.length);
				console.log(index+":"+item.asString);
				// item.logs.forEach(function(log){
				// });
			});
		});
	// }
	// , 3)
  // alert(JSON.stringify(benchmark()))
  // console.log(benchmark());
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	superOnLoad();
}

module && (module.exports = NewPage001);