import DateService from "../dist/services/DateWrapperHijri";
import {expect} from "chai";
import moment from "moment";
import momentHijri from "moment-hijri";
import 'moment/locale/ar-sa';

describe("DateWrapper Hijri", function() {
  describe("Week", function() {
    it("should return the starting weekday of the month", function() {
      var scope = new DateService(momentHijri, "30-1-2017");
      let day = scope.startDayOfMonth();
      expect(day).to.eql(1);
      
      scope = new DateService(momentHijri, "01-08-2017");
      day = scope.startDayOfMonth();
      expect(day).to.eql(2);
  
      scope = new DateService(momentHijri, "01-10-2017");
      day = scope.startDayOfMonth();
      expect(day).to.eql(5);
    });
  });
  
  describe("Month", function() {
    it("should get all hijri months in arabic", function() {
      momentHijri.locale("ar-sa");
      var scope = new DateService(momentHijri, {year: 2017, month: 1});

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
      var scope = new DateService(momentHijri, {year: 2017, month: 1});
      expect(scope.daysCount()).to.eql(30);

      scope = new DateService(momentHijri, {year: 2017, month: 6});
      expect(scope.daysCount()).to.eql(29);

      scope = new DateService(momentHijri, {year: 2017, month: 7});
      expect(scope.daysCount()).to.eql(29);

      scope = new DateService(momentHijri, {year: 2017, month: 12});
      expect(scope.daysCount()).to.eql(30);
    });
  });
});
