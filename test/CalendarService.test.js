import * as DateWrapper from "../src/services/DateWrapper";
import * as CalendarService from "../src/services/CalendarService";
import {expect} from "chai";

describe("Calendar Service", function() {
  describe("Month", function() {
    it("should return all needed data a month", function() {
      var data = CalendarService.getMonth({year: 2016, month: 1});

      expect(data).to.eql(
        {
          longName: 'February',
          shortName: 'Feb',
          daysCount: 29,
          startDayOfMonth: 1
      });
      
      data = CalendarService.getMonth({year: 2017, month: 0});

      expect(data).to.eql(
        {
          longName: 'January',
          shortName: 'Jan',
          daysCount: 31,
          startDayOfMonth: 0
      });
    });
    
    it("should return all needed calendar data a month of calendar", function() {
      var data = CalendarService.getCalendarMonth({year: 2016, month: 1});
      expect(data).to.eql(
        {
          longName: 'February',
          shortName: 'Feb',
          daysCount: 29,
          startDayOfMonth: 1,
          daysLong: 
          [ 'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday' ],
          daysShort: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
          days: [ 
              [ 
                { day: 31, month: 'previous', isSpecialDay: false, isWeekend: true },
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
                { day: 13, month: 'current', isSpecialDay: false, isWeekend: true } 
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
                { day: 1, month: 'next', isSpecialDay: false },
                { day: 2, month: 'next', isSpecialDay: false },
                { day: 3, month: 'next', isSpecialDay: false },
                { day: 4, month: 'next', isSpecialDay: false },
                { day: 5, month: 'next', isSpecialDay: false, isWeekend: true } 
              ]
            ],
          date: {
            day: 1,
            month: 1,
            year: 2016
          },
          previousMonth: {
            daysCount: 31,
            longName: "January",
            shortName: "Jan",
            date: {
              day: 1,
              month: 0,
              year: 2016
            }
          },
          nextMonth: {
            daysCount: 31,
            longName: "March",
            shortName: "Mar",
            date: {
              day: 1,
              month: 2,
              year: 2016
            }
          }
      });
      
      data = CalendarService.getCalendarMonth({year: 2017, month: 0});

      expect(data).to.eql(
        {
          longName: 'January',
          shortName: 'Jan',
          daysCount: 31,
          startDayOfMonth: 0,
          daysLong: 
          [ 'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday' ],
          daysShort: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
          days: [ 
                  [ 
                    { day: 1, month: 'current', isSpecialDay: false, isWeekend: true },
                    { day: 2, month: 'current', isSpecialDay: false },
                    { day: 3, month: 'current', isSpecialDay: false },
                    { day: 4, month: 'current', isSpecialDay: false },
                    { day: 5, month: 'current', isSpecialDay: false },
                    { day: 6, month: 'current', isSpecialDay: false },
                    { day: 7, month: 'current', isSpecialDay: false, isWeekend: true } 
                  ],
                  [
                    { day: 8, month: 'current', isSpecialDay: false, isWeekend: true },
                    { day: 9, month: 'current', isSpecialDay: false },
                    { day: 10, month: 'current', isSpecialDay: false },
                    { day: 11, month: 'current', isSpecialDay: false },
                    { day: 12, month: 'current', isSpecialDay: false },
                    { day: 13, month: 'current', isSpecialDay: false },
                    { day: 14, month: 'current', isSpecialDay: false, isWeekend: true } 
                  ],
                  [
                    { day: 15, month: 'current', isSpecialDay: false, isWeekend: true },
                    { day: 16, month: 'current', isSpecialDay: false },
                    { day: 17, month: 'current', isSpecialDay: false },
                    { day: 18, month: 'current', isSpecialDay: false },
                    { day: 19, month: 'current', isSpecialDay: false },
                    { day: 20, month: 'current', isSpecialDay: false },
                    { day: 21, month: 'current', isSpecialDay: false, isWeekend: true } 
                  ],
                  [
                    { day: 22, month: 'current', isSpecialDay: false, isWeekend: true },
                    { day: 23, month: 'current', isSpecialDay: false },
                    { day: 24, month: 'current', isSpecialDay: false },
                    { day: 25, month: 'current', isSpecialDay: false },
                    { day: 26, month: 'current', isSpecialDay: false },
                    { day: 27, month: 'current', isSpecialDay: false },
                    { day: 28, month: 'current', isSpecialDay: false, isWeekend: true } 
                  ],
                  [
                    { day: 29, month: 'current', isSpecialDay: false, isWeekend: true },
                    { day: 30, month: 'current', isSpecialDay: false },
                    { day: 31, month: 'current', isSpecialDay: false },
                    { day: 32, month: 'current', isSpecialDay: false },
                    { day: 1, month: 'next', isSpecialDay: false },
                    { day: 2, month: 'next', isSpecialDay: false },
                    { day: 3, month: 'next', isSpecialDay: false, isWeekend: true } 
                  ]
               ],
          date: {
            day: 1,
            month: 0,
            year: 2017
          },
          previousMonth: {
            daysCount: 31,
            longName: "December",
            shortName: "Dec",
            date: {
              day: 1,
              month: 11,
              year: 2016
            }
          },
          nextMonth: {
            daysCount: 28,
            longName: "February",
            shortName: "Feb",
            date: {
              day: 1,
              month: 1,
              year: 2017
            }
          }
      });
    });
  });
});
