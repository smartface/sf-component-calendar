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
                  [ 31, 1, 2, 3, 4, 5, 6 ],
                  [ 7, 8, 9, 10, 11, 12, 13 ],
                  [ 14, 15, 16, 17, 18, 19, 20 ],
                  [ 21, 22, 23, 24, 25, 26, 27 ],
                  [ 28, 29, 1, 2, 3, 4, 5 ],
               ]
      });
      
      data = CalendarService.getCalendarMonth({year: 2017, month: 0});
      console.log(data.days);

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
                  [ 1, 2, 3, 4, 5, 6, 7 ],
                  [ 8, 9, 10, 11, 12, 13, 14 ],
                  [ 15, 16, 17, 18, 19, 20, 21 ],
                  [ 22, 23, 24, 25, 26, 27, 28 ],
                  [ 29, 30, 31, 32, 1, 2, 3 ]
               ]
      });
    });
  });
});
