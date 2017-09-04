import DateService from "../src/services/DateWrapper";
import {expect} from "chai";
import moment from "moment";

describe("DateWrapper", function() {
  describe("Week", function() {
    it("should return the starting weekday of the month", function() {
      var scope = new DateService(moment, "2017-09-01", "YYYY-MM-DD");
      let day = scope.startDayOfMonth();
      expect(day).to.eql(6);
      
      scope = new DateService(moment, "2017-08-01", "YYYY-MM-DD");
      day = scope.startDayOfMonth();
      expect(day).to.eql(3);
  
      scope = new DateService(moment, "2017-10-01", "YYYY-MM-DD");
      day = scope.startDayOfMonth();
      expect(day).to.eql(1);
    });
  
    it("should return all weekdays short in English", function() {
      moment.locale("en");
      var scope = new DateService(moment);
      var names = scope.weekdaysShort();
      expect(names).to.eql([ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]);
      
      names = scope.weekdaysMin();
      expect(names).to.eql([ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]);
    });
  
    it("should return all weekdays long in English", function() {
      moment.locale("en");
      var scope = new DateService(moment);
      const names = scope.weekdaysLong();
      expect(names).to.eql([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]);
    });
  });
  
  describe("Month", function() {
    it("should return end of a month", function() {
      var scope = new DateService(moment, {month: 1, year: 2017});
      expect(scope.daysCount()).to.eql(31);

      scope = new DateService(moment, {month: 6, year: 2017});
      expect(scope.daysCount({month: 5})).to.eql(30);

      scope = new DateService(moment, {month: 7, year: 2017});
      expect(scope.daysCount({month: 6})).to.eql(31);

      scope = new DateService(moment, {month: 12, year: 2017});
      expect(scope.daysCount({month: 11})).to.eql(31);
    });
  });
});
