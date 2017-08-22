import DateService from "../src/services/DateWrapperHijri";
import {expect} from "chai";
import moment from "moment";
import 'moment/locale/ar-sa';
import momentHijri from "moment-hijri";

describe("DateWrapper Hijri", function() {
  describe("Week", function() {
    it("should return the starting weekday of the month", function() {
      var scope = new DateService(momentHijri, "2017-01-30");
      let day = scope.startDayOfMonth();
      expect(day).to.eql(0);
      
      scope = new DateService(momentHijri, "2017-08-01");
      day = scope.startDayOfMonth();
      expect(day).to.eql(1);
  
      scope = new DateService(momentHijri, "2017-10-01");
      day = scope.startDayOfMonth();
      expect(day).to.eql(4);
    });
  });
  
  describe("Month", function() {
    it("should get all hijri months in arabic", function() {
      momentHijri.locale("ar-sa");
      var scope = new DateService(momentHijri, {year: 2017, month: 0});

      expect(scope.monthsLong()).to.eql([ 
        'محرم',
        'صفر',
        'ربيع الأول',
        'ربيع الثاني',
        'جمادى الأولى',
        'جمادى الآخرة',
        'رجب',
        'شعبان',
        'رمضان',
        'شوال',
        'ذو القعدة',
        'ذو الحجة' 
        ]);
    });
    
    it("should return end of a month", function() {
      var scope = new DateService(momentHijri, {year: 2017, month: 0});
      expect(scope.daysCount()).to.eql(30);

      scope = new DateService(momentHijri, {year: 2017, month: 5});
      expect(scope.daysCount()).to.eql(29);

      scope = new DateService(momentHijri, {year: 2017, month: 6});
      expect(scope.daysCount()).to.eql(29);

      scope = new DateService(momentHijri, {year: 2017, month: 11});
      expect(scope.daysCount()).to.eql(30);
    });
  });
});
