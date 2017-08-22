import DateService from "../src/services/DateWrapper";
import {expect} from "chai";
import moment from "moment";

describe("DateWrapper", function() {
  describe("Week", function() {
    it("should return the starting weekday of the month", function() {
      var scope = new DateService(moment, "2017-09-01");
      let day = scope.startDayOfMonth();
      expect(day).to.eql(5);
      
      scope = new DateService(moment, "2017-08-01");
      day = scope.startDayOfMonth();
      expect(day).to.eql(2);
  
      scope = new DateService(moment, "2017-10-01");
      day = scope.startDayOfMonth();
      expect(day).to.eql(0);
    });
  
    it("should return all weekdays short in English", function() {
      moment.locale("en");
      var scope = new DateService(moment);
      const names = scope.weekdaysShort();

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
      var scope = new DateService(moment, {month: 0});
      expect(scope.daysCount()).to.eql(31);

      scope = new DateService(moment, {month: 5});
      expect(scope.daysCount({month: 5})).to.eql(30);

      scope = new DateService(moment, {month: 6});
      expect(scope.daysCount({month: 6})).to.eql(31);

      scope = new DateService(moment, {month: 11});
      expect(scope.daysCount({month: 11})).to.eql(31);
    });
  });
});
