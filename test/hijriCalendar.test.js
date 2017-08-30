import DateService from "../src/services/DateWrapperHijri";
import createService from "../src/services/CalendarService";
import {expect} from "chai";

describe("Hijri Calendar Service", function() {
  describe("Month", function() {
    it("should match with sun calendar", function() {
      const calendarService = createService({type: "hijri"});
      var data = calendarService.getMonth({year: 2017, month: 7, day: 29});

      expect(data).to.eql({
        longName: 'Thul-Hijjah',
        shortName: 'Dhu-H',
        daysCount: 29,
        startDayOfMonth: 3
      });
    });
    
    it("should return all needed data a month", function() {
      const calendarService = createService({type: "hijri"});
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
      const calendarService = createService({type: "hijri"});
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
          daysMin: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
          days: [ 
          [ 
            { day: 30, month: 'previous', specialDay: [], isWeekend: true },
            { day: 1, month: 'current', specialDay: [] },
            { day: 2, month: 'current', specialDay: [] },
            { day: 3, month: 'current', specialDay: [] },
            { day: 4, month: 'current', specialDay: [] },
            { day: 5, month: 'current', specialDay: [] },
            { day: 6, month: 'current', specialDay: [], isWeekend: true }
          ],
          [ 
            { day: 7, month: 'current', specialDay: [], isWeekend: true },
            { day: 8, month: 'current', specialDay: [] },
            { day: 9, month: 'current', specialDay: [] },
            { day: 10, month: 'current', specialDay: [] },
            { day: 11, month: 'current', specialDay: [] },
            { day: 12, month: 'current', specialDay: [] },
            { day: 13,  month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 14, month: 'current', specialDay: [], isWeekend: true },
            { day: 15, month: 'current', specialDay: [] },
            { day: 16, month: 'current', specialDay: [] },
            { day: 17, month: 'current', specialDay: [] },
            { day: 18, month: 'current', specialDay: [] },
            { day: 19, month: 'current', specialDay: [] },
            { day: 20, month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 21, month: 'current', specialDay: [], isWeekend: true },
            { day: 22, month: 'current', specialDay: [] },
            { day: 23, month: 'current', specialDay: [] },
            { day: 24, month: 'current', specialDay: [] },
            { day: 25, month: 'current', specialDay: [] },
            { day: 26, month: 'current', specialDay: [] },
            { day: 27, month: 'current', specialDay: [], isWeekend: true } 
          ],
          [
            { day: 28, month: 'current', specialDay: [], isWeekend: true },
            { day: 29, month: 'current', specialDay: [] },
            { day: 30, month: 'current', specialDay: [] },
            { day: 1, month: 'next', specialDay: [] },
            { day: 2, month: 'next', specialDay: [] },
            { day: 3, month: 'next', specialDay: [] },
            { day: 4, month: 'next', specialDay: [], isWeekend: true } 
          ],
          [
            { day: 5, month: 'next', specialDay: [], isWeekend: true },
            { day: 6, month: 'next', specialDay: [] },
            { day: 7, month: 'next', specialDay: [] },
            { day: 8, month: 'next', specialDay: [] },
            { day: 9, month: 'next', specialDay: [] },
            { day: 10, month: 'next', specialDay: [] },
            { day: 11, month: 'next', specialDay: [], isWeekend: true } 
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
        daysMin: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
        days: 
          [[
            { day: 26, month: 'previous', specialDay: [], isWeekend: true },
            { day: 27, month: 'previous', specialDay: [] },
            { day: 28, month: 'previous', specialDay: [] },
            { day: 29, month: 'previous', specialDay: [] },
            { day: 30, month: 'previous', specialDay: [] },
            { day: 1, month: 'current', specialDay: [] },
            { day: 2, month: 'current', specialDay: [], isWeekend: true } ],
          [ 
            { day: 3, month: 'current', specialDay: [], isWeekend: true },
            { day: 4, month: 'current', specialDay: [] },
            { day: 5, month: 'current', specialDay: [] },
            { day: 6, month: 'current', specialDay: [] },
            { day: 7, month: 'current', specialDay: [] },
            { day: 8, month: 'current', specialDay: [] },
            { day: 9, month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 10, month: 'current', specialDay: [], isWeekend: true },
            { day: 11, month: 'current', specialDay: [] },
            { day: 12, month: 'current', specialDay: [] },
            { day: 13, month: 'current', specialDay: [] },
            { day: 14, month: 'current', specialDay: [] },
            { day: 15, month: 'current', specialDay: [] },
            { day: 16, month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 17, month: 'current', specialDay: [], isWeekend: true },
            { day: 18, month: 'current', specialDay: [] },
            { day: 19, month: 'current', specialDay: [] },
            { day: 20, month: 'current', specialDay: [] },
            { day: 21, month: 'current', specialDay: [] },
            { day: 22, month: 'current', specialDay: [] },
            { day: 23, month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 24, month: 'current', specialDay: [], isWeekend: true },
            { day: 25, month: 'current', specialDay: [] },
            { day: 26, month: 'current', specialDay: [] },
            { day: 27, month: 'current', specialDay: [] },
            { day: 28, month: 'current', specialDay: [] },
            { day: 29, month: 'current', specialDay: [] },
            { day: 30, month: 'current', specialDay: [], isWeekend: true } 
          ],
          [ 
            { day: 1, month: 'next', specialDay: [], isWeekend: true },
            { day: 2, month: 'next', specialDay: [] },
            { day: 3, month: 'next', specialDay: [] },
            { day: 4, month: 'next', specialDay: [] },
            { day: 5, month: 'next', specialDay: [] },
            { day: 6, month: 'next', specialDay: [] },
            { day: 7, month: 'next', specialDay: [], isWeekend: true } ]
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
