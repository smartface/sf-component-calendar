import DateService from "../src/services/DateWrapperHijri";
import {expect} from "chai";
import moment from "moment-hijri";

describe("DateWrapper Hijri", function() {
  
  describe("Week", function() {
    it("should return the starting weekday of the month", function() {
      var scope = new DateService(moment, "2017-01-30");
      let day = scope.startDayOfMonth();
      
      expect(day).to.eql(0);
      
      scope = new DateService(moment, "2017-08-01");
      day = scope.startDayOfMonth();
      expect(day).to.eql(1);
  
      scope = new DateService(moment, "2017-10-01");
      day = scope.startDayOfMonth();
      expect(day).to.eql(4);
    });
  });
  
  describe("Month", function() {
    it("should return end of a month", function() {
      var scope = new DateService(moment, {year: 2017, month: 0});
      expect(scope.daysCount()).to.eql(30);

      scope = new DateService(moment, {year: 2017, month: 5});
      expect(scope.daysCount()).to.eql(29);

      scope = new DateService(moment, {year: 2017, month: 6});
      expect(scope.daysCount()).to.eql(29);

      scope = new DateService(moment, {year: 2017, month: 11});
      expect(scope.daysCount()).to.eql(30);
    });
  });
});
