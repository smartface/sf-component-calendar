import * as DateWrapper from "../src/application/DateWrapper";
import * as CalendarService from "../src/application/CalendarService";
import {expect} from "chai";

describe("Calendar Service", function() {
  describe("Month", function() {
    it("should return all needed calendar data a month", function() {
      const data = CalendarService.getMonth(1);
      expect(data).to.eql(
        { 
          longName: 'January',
          shortName: 'Jan',
          daysInMonth: 31,
          daysLong: 
           [ 'Sunday',
             'Monday',
             'Tuesday',
             'Wednesday',
             'Thursday',
             'Friday',
             'Saturday' ],
          daysShort: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ] });
      });
  });
});
