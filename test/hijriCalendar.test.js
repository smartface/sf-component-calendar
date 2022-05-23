import DateService from "../dist/services/DateWrapperHijri";
import createService from "../dist/services/CalendarService";
import {expect} from "chai";
var sample = {
  "byMonths":[
    {
      "month":1,
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
describe("Hijri Calendar Service", function() {
  describe("Month", function() {
    it("should match with sun calendar", function() {
      const calendarService = createService({type: "hijri"});
      var data = calendarService.getMonth({year: 2017, month: 8, day: 29});

      expect(data).to.eql({
        longName: 'Thul-Hijjah',
        shortName: 'Dhu-H',
        daysCount: 29,
        startDayOfMonth: 4
      });
    });
    
    it("should return all needed data a month", function() {
      const calendarService = createService({type: "hijri"});
      var data = calendarService.getMonth({year: 2017, month: 1, day: 1});

      expect(data).to.eql(
      {
        longName: 'Rabi\' al-Thani',
        shortName: 'Rab-II',
        daysCount: 30,
        startDayOfMonth: 6
      });
    });
    
    it("should return all needed calendar data for a month of calendar", function() {
      var calendarService = createService({lang: "ar-sa", type: "hijri"});
      var data = calendarService.getCalendarMonth({year: 2016, month: 2, day : 9});
      expect(data.startDayOfMonth).to.equal(2);
      
      expect(data).to.eql({
          longName: "ربيع الثاني",
          shortName: "ربيع ٢",
          daysCount: 30,
          startDayOfMonth: 2,
          daysLong: [ 
            "الأحد",
            "الإثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت" ],
          daysShort: [ 'أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت' ],
          daysMin: [ 'ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س' ],
          days: [ 
          [ 
            { day: 30, "localeDay": "٣٠", month: 'previous', specialDay: [], isWeekend: true },
            { day: 1, "localeDay": "١", month: 'current', specialDay: [] },
            { day: 2, "localeDay": "٢", month: 'current', specialDay: [] },
            { day: 3, "localeDay": "٣", month: 'current', specialDay: [] },
            { day: 4, "localeDay": "٤", month: 'current', specialDay: [] },
            { day: 5, "localeDay": "٥", month: 'current', specialDay: [] },
            { day: 6, "localeDay": "٦", month: 'current', specialDay: [], isWeekend: true }
          ],
          [ 
            { day: 7, "localeDay": "٧", month: 'current', specialDay: [], isWeekend: true },
            { day: 8, "localeDay": "٨", month: 'current', specialDay: [] },
            { day: 9, "localeDay": "٩", month: 'current', specialDay: [] },
            { day: 10, "localeDay": "١٠", month: 'current', specialDay: [] },
            { day: 11, "localeDay": "١١", month: 'current', specialDay: [] },
            { day: 12, "localeDay": "١٢", month: 'current', specialDay: [] },
            { day: 13, "localeDay": "١٣", month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 14, "localeDay": "١٤", month: 'current', specialDay: [], isWeekend: true },
            { day: 15, "localeDay": "١٥", month: 'current', specialDay: [] },
            { day: 16, "localeDay": "١٦", month: 'current', specialDay: [] },
            { day: 17, "localeDay": "١٧", month: 'current', specialDay: [] },
            { day: 18, "localeDay": "١٨", month: 'current', specialDay: [] },
            { day: 19, "localeDay": "١٩", month: 'current', specialDay: [] },
            { day: 20, "localeDay": "٢٠", month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 21, "localeDay": "٢١", month: 'current', specialDay: [], isWeekend: true },
            { day: 22, "localeDay": "٢٢", month: 'current', specialDay: [] },
            { day: 23, "localeDay": "٢٣", month: 'current', specialDay: [] },
            { day: 24, "localeDay": "٢٤", month: 'current', specialDay: [] },
            { day: 25, "localeDay": "٢٥", month: 'current', specialDay: [] },
            { day: 26, "localeDay": "٢٦", month: 'current', specialDay: [] },
            { day: 27, "localeDay": "٢٧", month: 'current', specialDay: [], isWeekend: true } 
          ],
          [
            { day: 28, "localeDay": "٢٨", month: 'current', specialDay: [], isWeekend: true },
            { day: 29, "localeDay": "٢٩", month: 'current', specialDay: [] },
            { day: 30, "localeDay": "٣٠", month: 'current', specialDay: [] },
            { day: 1, "localeDay": "١", month: 'next', specialDay: [] },
            { day: 2, "localeDay": "٢", month: 'next', specialDay: [] },
            { day: 3, "localeDay": "٣", month: 'next', specialDay: [] },
            { day: 4, "localeDay": "٤", month: 'next', specialDay: [], isWeekend: true } 
          ],
          [
            { day: 5, "localeDay": "٥", month: 'next', specialDay: [], isWeekend: true },
            { day: 6, "localeDay": "٦", month: 'next', specialDay: [] },
            { day: 7, "localeDay": "٧", month: 'next', specialDay: [] },
            { day: 8, "localeDay": "٨", month: 'next', specialDay: [] },
            { day: 9, "localeDay": "٩", month: 'next', specialDay: [] },
            { day: 10, "localeDay": "١٠", month: 'next', specialDay: [] },
            { day: 11, "localeDay": "١١", month: 'next', specialDay: [], isWeekend: true } 
          ]],
          date: { year: 1437, day: 30, month: 4 },
          normalizedDate: { year: 2016, day: 9, month: 2 },
          "localeDate": {
            "day": "٣٠",
            "month": "٤",
            "year": "١٤٣٧"
          },      
          previousMonth: { 
            "longName": "ربيع الأول",
            "shortName": "ربيع ١",
            "daysCount": 30,
            "date": {
              "year": 1437,
              "day": 30,
              "month": 3
            },
            "normalizedDate": {
              "year": 2016,
              "day": 10,
              "month": 1
            },
            "localeDate": {
              "day": "٣٠",
              "month": "٣",
              "year": "١٤٣٧"
            }
          },
          "nextMonth": {
            "longName": "جمادى الأولى",
            "shortName": "جمادى ١",
            "daysCount": 29,
            "date": {
              "year": 1437,
              "day": 29,
              "month": 5
            },
            "normalizedDate": {
              "year": 2016,
              "day": 9,
              "month": 3
            },
            "localeDate": {
              "day": "٢٩",
              "month": "٥",
              "year": "١٤٣٧"
            }
          }
        });
      
      calendarService = createService({lang: "en", type: "hijri", specialDays: sample});
      data = calendarService.getCalendarMonth({year: 2017, month: 1, day: 15});

      expect(data).to.eql(
      {
        longName: 'Rabi\' al-Thani',
        shortName: 'Rab-II',
        daysCount: 30,
        startDayOfMonth: 6,
        daysLong: 
        [ 'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday' ],
        normalizedDate: { year: 2016, day: 9, month: 2 },
        daysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
        daysMin: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
        days: 
          [[
            { day: 26, localeDay: "26", month: 'previous', specialDay: [], isWeekend: true },
            { day: 27, localeDay: "27", month: 'previous', specialDay: [] },
            { day: 28, localeDay: "28", month: 'previous', specialDay: [] },
            { day: 29, localeDay: "29", month: 'previous', specialDay: [] },
            { day: 30, localeDay: "30", month: 'previous', specialDay: [] },
            { day: 1, localeDay: "1", month: 'current', specialDay: ["4"] },
            { day: 2, localeDay: "2", month: 'current', specialDay: ["4"], isWeekend: true } ],
          [ 
            { day: 3, localeDay: "3", month: 'current', specialDay: ["4"], isWeekend: true },
            { day: 4, localeDay: "4", month: 'current', specialDay: ["4"] },
            { day: 5, localeDay: "5", month: 'current', specialDay: [] },
            { day: 6, localeDay: "6", month: 'current', specialDay: [] },
            { day: 7, localeDay: "7", month: 'current', specialDay: ["4"] },
            { day: 8, localeDay: "8", month: 'current', specialDay: ["4"] },
            { day: 9, localeDay: "9", month: 'current', specialDay: ["4"], isWeekend: true } 
          ],
          [ 
            { day: 10, localeDay: "10", month: 'current', specialDay: ["4"], isWeekend: true },
            { day: 11, localeDay: "11", month: 'current', specialDay: ["4"] },
            { day: 12, localeDay: "12", month: 'current', specialDay: [] },
            { day: 13, localeDay: "13", month: 'current', specialDay: [] },
            { day: 14, localeDay: "14", month: 'current', specialDay: ["4"] },
            { day: 15, localeDay: "15", month: 'current', specialDay: ["4"] },
            { day: 16, localeDay: "16", month: 'current', specialDay: ["4"], isWeekend: true } 
          ],
          [ 
            { day: 17, localeDay: "17", month: 'current', specialDay: ["4"], isWeekend: true },
            { day: 18, localeDay: "18", month: 'current', specialDay: ["4"] },
            { day: 19, localeDay: "19", month: 'current', specialDay: [] },
            { day: 20, localeDay: "20", month: 'current', specialDay: [] },
            { day: 21, localeDay: "21", month: 'current', specialDay: ["4"] },
            { day: 22, localeDay: "22", month: 'current', specialDay: ["4"] },
            { day: 23, localeDay: "23", month: 'current', specialDay: ["4"], isWeekend: true } 
          ],
          [ 
            { day: 24, localeDay: "24", month: 'current', specialDay: ["4"], isWeekend: true },
            { day: 25, localeDay: "25", month: 'current', specialDay: ["4"] },
            { day: 26, localeDay: "26", month: 'current', specialDay: [] },
            { day: 27, localeDay: "27", month: 'current', specialDay: [] },
            { day: 28, localeDay: "28", month: 'current', specialDay: ["4"] },
            { day: 29, localeDay: "29", month: 'current', specialDay: ["4"] },
            { day: 30, localeDay: "30", month: 'current', specialDay: ["4"], isWeekend: true } 
          ],
          [ 
            { day: 1, localeDay: "1", month: 'next', specialDay: [], isWeekend: true },
            { day: 2, localeDay: "2", month: 'next', specialDay: [] },
            { day: 3, localeDay: "3", month: 'next', specialDay: [] },
            { day: 4, localeDay: "4", month: 'next', specialDay: [] },
            { day: 5, localeDay: "5", month: 'next', specialDay: [] },
            { day: 6, localeDay: "6", month: 'next', specialDay: [] },
            { day: 7, localeDay: "7", month: 'next', specialDay: [], isWeekend: true } ]
          ],
          date: { year: 1438, day: 17, month: 4 },
          normalizedDate: { year: 2017, day: 15, month: 1 },
          "localeDate": {
            "day": "17",
            "month": "4",
            "year": "1438"
          },      
          previousMonth: {
            longName: 'Rabi\' al-Awwal',
            shortName: 'Rab-I',
            daysCount: 30,
            date: { year: 1438, day: 17, month: 3 },
            normalizedDate: { year: 2016, day: 16, month: 12 },
            "localeDate": {
              "day": "17",
              "month": "3",
              "year": "1438"
            }
          },
          nextMonth: {
            longName: 'Jumada al-Ula',
            shortName: 'Jum-I',
            daysCount: 28,
            date: { year: 1438, day: 17, month: 5 },
            normalizedDate: { year: 2017, day: 14, month: 2 },
            "localeDate": {
              "day": "17",
              "month": "5",
              "year": "1438"
            }
          },
      });
    });
  });
});
