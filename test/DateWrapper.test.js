import * as DateWrapper from "../src/services/DateWrapper";
import {expect} from "chai";

describe("DateWrapper", function() {
  describe("Week", function() {
    it("should be set English as default lang", function() {
      const names = DateWrapper.weekdaysShort();
      expect(DateWrapper.dateLang()).to.eql("en");
    });
    
    it("should return the starting weekday of the months", function() {
      let day = DateWrapper.date("2017-09-28").startDayOfMonth();
      expect(day).to.eql(4);
      
      day = DateWrapper.date("2017-08-28").startDayOfMonth();
      expect(day).to.eql(1);
  
      day = DateWrapper.date("2017-10-28").startDayOfMonth();
      expect(day).to.eql(6);
    });
  
    it("should return all weekdays short in English", function() {
      const names = DateWrapper.weekdaysShort();
      expect(names).to.eql([ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]);
    });
  
    it("should return all weekdays long in English", function() {
      const names = DateWrapper.weekdaysLong();
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
      expect(DateWrapper.date({month: 0}).daysCount()).to.eql(31);
      expect(DateWrapper.date({month: 5}).daysCount()).to.eql(30);
      expect(DateWrapper.date({month: 6}).daysCount()).to.eql(31);
      expect(DateWrapper.date({month: 11}).daysCount()).to.eql(31);
    });
  });
});

