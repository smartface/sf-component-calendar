import DateService from "../src/services/DateWrapperHijri";
import createService from "../src/services/CalendarService";
import {expect} from "chai";

describe("Hijri Calendar Service", function() {
  describe("Month", function() {
    it("should match with sun calendar", function() {
      const calendarService = createService("en", "hijri");
      var data = calendarService.getMonth({year: 2017, month: 7, day: 29});

      expect(data).to.eql({
        longName: 'Thul-Hijjah',
        shortName: 'Dhu-H',
        daysCount: 29,
        startDayOfMonth: 3
      });
    });
    
    it("should return all needed data a month", function() {
      const calendarService = createService("en", "hijri");
      var data = calendarService.getMonth({year: 2017, month: 0, day: 1});

      expect(data).to.eql(
      {
        longName: 'Rabi\' al-Thani',
        shortName: 'Rab-II',
        daysCount: 30,
        startDayOfMonth: 5
      });
    });
    
    it("should return all needed calendar data for a month of calendar", function() {
      const calendarService = createService("en", "hijri");
      var data = calendarService.getCalendarMonth({year: 2016, month: 1, day : 9});
      expect(data.startDayOfMonth).to.equal(1);

      expect(data).to.eql({
          longName: 'Rabi\' al-Thani',
          shortName: 'Rab-II',
          daysCount: 30,
          startDayOfMonth: 1,
          daysLong: [ 
             'Sunday',
             'Monday',
             'Tuesday',
             'Wednesday',
             'Thursday',
             'Friday',
             'Saturday' ],
          daysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
          days: [ 
          [ 
            { day: 30, month: 'previous', isSpecialDay: false, isWeekend: true },
            { day: 1, month: 'current', isSpecialDay: false },
            { day: 2, month: 'current', isSpecialDay: false },
            { day: 3, month: 'current', isSpecialDay: false },
            { day: 4, month: 'current', isSpecialDay: false },
            { day: 5, month: 'current', isSpecialDay: false },
            { day: 6, month: 'current', isSpecialDay: false, isWeekend: true }
          ],
          [ 
            { day: 7, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 8, month: 'current', isSpecialDay: false },
            { day: 9, month: 'current', isSpecialDay: false },
            { day: 10, month: 'current', isSpecialDay: false },
            { day: 11, month: 'current', isSpecialDay: false },
            { day: 12, month: 'current', isSpecialDay: false },
            { day: 13,  month: 'current', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 14, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 15, month: 'current', isSpecialDay: false },
            { day: 16, month: 'current', isSpecialDay: false },
            { day: 17, month: 'current', isSpecialDay: false },
            { day: 18, month: 'current', isSpecialDay: false },
            { day: 19, month: 'current', isSpecialDay: false },
            { day: 20, month: 'current', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 21, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 22, month: 'current', isSpecialDay: false },
            { day: 23, month: 'current', isSpecialDay: false },
            { day: 24, month: 'current', isSpecialDay: false },
            { day: 25, month: 'current', isSpecialDay: false },
            { day: 26, month: 'current', isSpecialDay: false },
            { day: 27, month: 'current', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 28, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 29, month: 'current', isSpecialDay: false },
            { day: 30, month: 'current', isSpecialDay: false },
            { day: 1, month: 'next', isSpecialDay: false },
            { day: 2, month: 'next', isSpecialDay: false },
            { day: 3, month: 'next', isSpecialDay: false },
            { day: 4, month: 'next', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 5, month: 'next', isSpecialDay: false, isWeekend: true },
            { day: 6, month: 'next', isSpecialDay: false },
            { day: 7, month: 'next', isSpecialDay: false },
            { day: 8, month: 'next', isSpecialDay: false },
            { day: 9, month: 'next', isSpecialDay: false },
            { day: 10, month: 'next', isSpecialDay: false },
            { day: 11, month: 'next', isSpecialDay: false, isWeekend: true } 
          ]],
          date: { year: 1437, day: 30, month: 3 },
          normalizedDate: { year: 2016, day: 9, month: 1 },
          previousMonth: { 
            longName: 'Rabi\' al-Awwal',
            shortName: 'Rab-I',
            daysCount: 30,
            date: { year: 1437, day: 30, month: 2 },
            normalizedDate: { year: 2016, day: 10, month: 0 } 
          },
          nextMonth: { 
            longName: 'Jumada al-Ula',
            shortName: 'Jum-I',
            daysCount: 29,
            date: { year: 1437, day: 29, month: 4 },
            normalizedDate: { year: 2016, day: 9, month: 2 } 
          }
        });

      data = calendarService.getCalendarMonth({year: 2017, month: 0, day: 15});

      expect(data).to.eql(
      {
        longName: 'Rabi\' al-Thani',
        shortName: 'Rab-II',
        daysCount: 30,
        startDayOfMonth: 5,
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
        days: 
          [[
            { day: 26, month: 'previous', isSpecialDay: false, isWeekend: true },
            { day: 27, month: 'previous', isSpecialDay: false },
            { day: 28, month: 'previous', isSpecialDay: false },
            { day: 29, month: 'previous', isSpecialDay: false },
            { day: 30, month: 'previous', isSpecialDay: false },
            { day: 1, month: 'current', isSpecialDay: false },
            { day: 2, month: 'current', isSpecialDay: false, isWeekend: true } ],
          [ 
            { day: 3, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 4, month: 'current', isSpecialDay: false },
            { day: 5, month: 'current', isSpecialDay: false },
            { day: 6, month: 'current', isSpecialDay: false },
            { day: 7, month: 'current', isSpecialDay: false },
            { day: 8, month: 'current', isSpecialDay: false },
            { day: 9, month: 'current', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 10, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 11, month: 'current', isSpecialDay: false },
            { day: 12, month: 'current', isSpecialDay: false },
            { day: 13, month: 'current', isSpecialDay: false },
            { day: 14, month: 'current', isSpecialDay: false },
            { day: 15, month: 'current', isSpecialDay: false },
            { day: 16, month: 'current', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 17, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 18, month: 'current', isSpecialDay: false },
            { day: 19, month: 'current', isSpecialDay: false },
            { day: 20, month: 'current', isSpecialDay: false },
            { day: 21, month: 'current', isSpecialDay: false },
            { day: 22, month: 'current', isSpecialDay: false },
            { day: 23, month: 'current', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 24, month: 'current', isSpecialDay: false, isWeekend: true },
            { day: 25, month: 'current', isSpecialDay: false },
            { day: 26, month: 'current', isSpecialDay: false },
            { day: 27, month: 'current', isSpecialDay: false },
            { day: 28, month: 'current', isSpecialDay: false },
            { day: 29, month: 'current', isSpecialDay: false },
            { day: 30, month: 'current', isSpecialDay: false, isWeekend: true } 
          ],
          [ 
            { day: 1, month: 'next', isSpecialDay: false, isWeekend: true },
            { day: 2, month: 'next', isSpecialDay: false },
            { day: 3, month: 'next', isSpecialDay: false },
            { day: 4, month: 'next', isSpecialDay: false },
            { day: 5, month: 'next', isSpecialDay: false },
            { day: 6, month: 'next', isSpecialDay: false },
            { day: 7, month: 'next', isSpecialDay: false, isWeekend: true } ]
          ],
          date: { year: 1438, day: 17, month: 3 },
          normalizedDate: { year: 2017, day: 15, month: 0 },
          previousMonth: {
            longName: 'Rabi\' al-Awwal',
            shortName: 'Rab-I',
            daysCount: 30,
            date: { year: 1438, day: 17, month: 2 },
             normalizedDate: { year: 2016, day: 16, month: 11 }
          },
          nextMonth: {
            longName: 'Jumada al-Ula',
            shortName: 'Jum-I',
            daysCount: 28,
            date: { year: 1438, day: 17, month: 4 },
            normalizedDate: { year: 2017, day: 14, month: 1 }
          },
      });
    });
  });
});
