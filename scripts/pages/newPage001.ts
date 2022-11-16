import NewPage001Design from '../generated/pages/newPage001';
// const benchmark = require("../benchmarks/CalendarServices");
// const runner = require("../benchmarks/runner");
import { CalendarTypes } from '../services/CalendarTypes';
import specialDays from './specialDays';
import Calendar from 'components/Calendar';
import { Route, Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

var sample = {
  byMonths: [
    {
      month: 11,
      days: [
        {
          className: '.day1className',
          day: 1,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': 'day1'
              }
            }
          },
          length: 1
        },
        {
          day: 2,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 3,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 4,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 7,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 8,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 9,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 10,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 11,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 14,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 15,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 16,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 17,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 18,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 21,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 22,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 23,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 24,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 25,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 28,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 29,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 30,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        },
        {
          day: 31,
          calendars: {
            '*': {
              availableLangs: '*',
              text: {
                '*': '4'
              }
            }
          },
          length: 1
        }
      ]
    }
  ]
};

export default class NewPage001 extends withDismissAndBackButton(NewPage001Design) {
  // Constructor
  constructor(private router?: Router, private route?: Route) {
    // Initalizes super class for this page scope
    super({});
    this.calendar.onMonthChange = () => {
       console.info('onmonthchange')
    };
    this.calendar.onDaySelect = (res) => {
      const [date] = res;
      console.log('ondayselect : ', date);
      if (!date) return;

      this.label2.text = date.date.day + '/' + date.date.month + '/' + date.date.year;
      this.label2_1.text = date.dayInfo.specialDay.length > 0 ? date.dayInfo.specialDay.join(' - ') : 'Ozel Gun Yok';
    };

    this.button1.onPress = () => {
      this.calendar.setSelectedDate(new Date());
    };

    this.buttonTR.onPress = () => {
      this.changeCalendar('tr', 'gregorian', sample);
      this.calendar.setSelectedDate(new Date());
    };

    this.buttonRange.onPress = () => {
      this.calendar.setRangeDates({ day: 21, month: 10, year: 2017 }, { day: 12, month: 12, year: 2017 });
    };

    this.buttonEN.onPress = () => {
      this.changeCalendar('en', 'gregorian', sample);
    };

    this.buttonAR.onPress = () => {
      this.changeCalendar('ar', 'gregorian', sample);
    };

    this.buttonHijri.onPress = () => {
      this.changeCalendar('ar-sa', CalendarTypes.HIJRI, sample);
    };

    this.buttonGreg.onPress = () => {
      this.changeCalendar('fr', CalendarTypes.GREGORIAN, sample);
    };

    this.nextPage.onPress = () => {
      this.calendar.setWeekMode(!this.calendar.getWeekMode());
    };

    this.button3.onPress = () => {
      this.calendar.addStyles({
        '.calendar.header_navbar_monthLabel': {
          textColor: '#F10000'
        }
      });
    };
  }
  // Page.onShow -> This event is called when a page appears on the screen (everytime).
  /**
   * @this {NewPage001}
   * @param lang
   * @param calendar
   * @param sp
   * @param dayOfWeek
   */
  changeCalendar(this: NewPage001, lang: string, calendar: string, sp: any, dayOfWeek = 0) {
    this.calendar.changeCalendar(lang, calendar, sp, dayOfWeek);
    // 	this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
    this.calendar.applyLayout();
  }
  onShow() {
    super.onShow();

    // this.changeCalendar('en', CalendarTypes.GREGORIAN, sample, 1);

    // this.calendar.setSelectedDate({ month: 11, year: 2017, day: 1 });
    // this.calendar.addStyles({
    //   '.day1className': {
    //     backgroundColor: 'rgba(0,0,0,1)'
    //   }
    // });
    // var fn = this.calendar.nextMonth.bind(this.calendar);

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
    // runner.runAll(3, function(res){
    // 	res.forEach(function(item, index){
    // 		// console.log(index+":"+item.logs.length);
    // 		console.log(index+":"+item.asString);
    // 		// item.logs.forEach(function(log){
    // 		// });
    // 	});
    // });

    // }
    // , 3)
    // alert(JSON.stringify(benchmark()))
    // console.log(benchmark());
  }

  onLoad() {
    super.onLoad();
  }
}
