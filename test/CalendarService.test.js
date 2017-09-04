import DateService from "../src/services/DateWrapper";
import createService from "../src/services/CalendarService";
import {expect} from "chai";
import moment from "moment";
import specialDays from "./mock/specialDays";

describe("Calendar Service", function() {
  
  var calendarService = createService({});
  describe("Turkish", function() {
    
  });
  
  describe("Month", function() {
    it("should return all needed data for a month", function() {
      var data = calendarService.getMonth({year: 2016, month: "02", day: "01"});
      
      expect(data).to.eql({
        longName: 'February',
        shortName: 'Feb',
        daysCount: 29,
        startDayOfMonth: 2
      });
      
      data = calendarService.getMonth({year: 2017, month: 1, day: 1});

      expect(data).to.eql(
      {
        longName: 'January',
        shortName: 'Jan',
        daysCount: 31,
        startDayOfMonth: 1
      });
    });
    
    it("should return all needed calendar data for a month of calendar", function() {
      calendarService = createService({});
      var data = calendarService.getCalendarMonth({year: 2016, month: 2, day : 9});
      
      calendarService = createService({lang: "tr"});
      var data2 = calendarService.getCalendarMonth("9-2-2016");

      expect({
        daysCount: data.daysCount,
        startDayOfMonth: data.startDayOfMonth
      }).to.eql({
        daysCount: data2.daysCount,
        startDayOfMonth: data2.startDayOfMonth
      });
      
      expect([ 
            'Pazar',
            'Pazartesi',
            'Salı',
            'Çarşamba',
            'Perşembe',
            'Cuma',
            'Cumartesi' 
          ]).to.eql(data2.daysLong);
          
      calendarService = createService({specialDays});
      expect(data.days).to.eql(data2.days);
      expect(data.startDayOfMonth).to.equal(2);
      
      expect(data).to.eql({
          longName: 'February',
          shortName: 'Feb',
          daysCount: 29,
          startDayOfMonth: 2,
          localeDate: {
            day: "9",
            month: "2",
            year: "2016"
          },
          daysLong: 
          [ 'Sunday',
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
                { day: 31, localeDay: '31', month: 'previous', specialDay: [], isWeekend: true },
                { day: 1, localeDay: '1', month: 'current', specialDay: [] },
                { day: 2, localeDay: '2', month: 'current', specialDay: [] },
                { day: 3, localeDay: '3', month: 'current', specialDay: [] },
                { day: 4, localeDay: '4', month: 'current', specialDay: [] },
                { day: 5, localeDay: '5', month: 'current', specialDay: [] },
                { day: 6, localeDay: '6', month: 'current', specialDay: [], isWeekend: true } 
              ],
              [ 
                { day: 7, localeDay: '7', month: 'current', specialDay: [], isWeekend: true },
                { day: 8, localeDay: '8', month: 'current', specialDay: [] },
                { day: 9, localeDay: '9', month: 'current', specialDay: [] },
                { day: 10, localeDay: '10', month: 'current', specialDay: [] },
                { day: 11, localeDay: '11', month: 'current', specialDay: [] },
                { day: 12, localeDay: '12', month: 'current', specialDay: [] },
                { day: 13, localeDay: '13', month: 'current', specialDay: [], isWeekend: true } 
              ],
              [
                { day: 14, localeDay: '14', month: 'current', specialDay: [], isWeekend: true },
                { day: 15, localeDay: '15', month: 'current', specialDay: [] },
                { day: 16, localeDay: '16', month: 'current', specialDay: [] },
                { day: 17, localeDay: '17', month: 'current', specialDay: [] },
                { day: 18, localeDay: '18', month: 'current', specialDay: [] },
                { day: 19, localeDay: '19', month: 'current', specialDay: [] },
                { day: 20, localeDay: '20', month: 'current', specialDay: [], isWeekend: true } 
              ],
              [
                { day: 21, localeDay: '21', month: 'current', specialDay: [], isWeekend: true },
                { day: 22, localeDay: '22', month: 'current', specialDay: [] },
                { day: 23, localeDay: '23', month: 'current', specialDay: [] },
                { day: 24, localeDay: '24', month: 'current', specialDay: [] },
                { day: 25, localeDay: '25', month: 'current', specialDay: [] },
                { day: 26, localeDay: '26', month: 'current', specialDay: [] },
                { day: 27, localeDay: '27', month: 'current', specialDay: [], isWeekend: true } 
              ],
              [ 
                { day: 28, localeDay: '28', month: 'current', specialDay: [], isWeekend: true },
                { day: 29, localeDay: '29', month: 'current', specialDay: [] },
                { day: 1, localeDay: '1', month: 'next', specialDay: [] },
                { day: 2, localeDay: '2', month: 'next', specialDay: [] },
                { day: 3, localeDay: '3', month: 'next', specialDay: [] },
                { day: 4, localeDay: '4', month: 'next', specialDay: [] },
                { day: 5, localeDay: '5', month: 'next', specialDay: [], isWeekend: true } 
              ],
              [ 
                { day: 6, localeDay: '6', month: 'next', specialDay: [], isWeekend: true },
                { day: 7, localeDay: '7', month: 'next', specialDay: [] },
                { day: 8, localeDay: '8', month: 'next', specialDay: [] },
                { day: 9, localeDay: '9', month: 'next', specialDay: [] },
                { day: 10, localeDay: '10', month: 'next', specialDay: [] },
                { day: 11, localeDay: '11', month: 'next', specialDay: [] },
                { day: 12, localeDay: '12', month: 'next', specialDay: [], isWeekend: true } 
              ]
            ],
          date: {
            day: 9,
            month: 2,
            year: 2016
          },
          normalizedDate: { year: 2016, day: 9, month: 2 },
          previousMonth: {
            daysCount: 31,
            longName: "January",
            shortName: "Jan",
            date: {
              day: 9,
              month: 1,
              year: 2016
            },
            localeDate: {
              day: "9",
              month: "1",
              year: "2016"
            },
            normalizedDate: { year: 2016, day: 9, month: 1 } 
          },
          nextMonth: {
            daysCount: 31,
            longName: "March",
            shortName: "Mar",
            date: {
              day: 9,
              month: 3,
              year: 2016
            },
            localeDate: {
              day: "9",
              month: "3",
              year: "2016"
            },
            normalizedDate: { year: 2016, day: 9, month: 3 } 
          }
      });

      data = calendarService.getCalendarMonth({year: 2017, month: 1, day: 15});

      expect(data).to.eql(
        {
          longName: 'January',
          shortName: 'Jan',
          daysCount: 31,
          startDayOfMonth: 1,
          daysLong: 
          [ 'Sunday',
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
                    { day: 1, localeDay: '1', month: 'current', specialDay: ["in all langs"], isWeekend: true },
                    { day: 2, localeDay: '2', month: 'current', specialDay: ["in all langs"] },
                    { day: 3, localeDay: '3', month: 'current', specialDay: [] },
                    { day: 4, localeDay: '4', month: 'current', specialDay: [] },
                    { day: 5, localeDay: '5', month: 'current', specialDay: [] },
                    { day: 6, localeDay: '6', month: 'current', specialDay: [] },
                    { day: 7, localeDay: '7', month: 'current', specialDay: ["in all langs"], isWeekend: true } 
                  ],
                  [
                    { day: 8, localeDay: '8', month: 'current', specialDay: [], isWeekend: true },
                    { day: 9, localeDay: '9', month: 'current', specialDay: [] },
                    { day: 10, localeDay: '10', month: 'current', specialDay: [] },
                    { day: 11, localeDay: '11', month: 'current', specialDay: [] },
                    { day: 12, localeDay: '12', month: 'current', specialDay: [] },
                    { day: 13, localeDay: '13', month: 'current', specialDay: [] },
                    { day: 14, localeDay: '14', month: 'current', specialDay: [], isWeekend: true } 
                  ],
                  [
                    { day: 15, localeDay: '15', month: 'current', specialDay: [], isWeekend: true },
                    { day: 16, localeDay: '16', month: 'current', specialDay: [] },
                    { day: 17, localeDay: '17', month: 'current', specialDay: [] },
                    { day: 18, localeDay: '18', month: 'current', specialDay: [] },
                    { day: 19, localeDay: '19', month: 'current', specialDay: [] },
                    { day: 20, localeDay: '20', month: 'current', specialDay: [] },
                    { day: 21, localeDay: '21', month: 'current', specialDay: [], isWeekend: true } 
                  ],
                  [
                    { day: 22, localeDay: '22', month: 'current', specialDay: [], isWeekend: true },
                    { day: 23, localeDay: '23', month: 'current', specialDay: [] },
                    { day: 24, localeDay: '24', month: 'current', specialDay: [] },
                    { day: 25, localeDay: '25', month: 'current', specialDay: [] },
                    { day: 26, localeDay: '26', month: 'current', specialDay: [] },
                    { day: 27, localeDay: '27', month: 'current', specialDay: [] },
                    { day: 28, localeDay: '28', month: 'current', specialDay: [], isWeekend: true } 
                  ],
                  [
                    { day: 29, localeDay: '29', month: 'current', specialDay: [], isWeekend: true },
                    { day: 30, localeDay: '30', month: 'current', specialDay: [] },
                    { day: 31, localeDay: '31', month: 'current', specialDay: [] },
                    { day: 1, localeDay: '1', month: 'next', specialDay: [] },
                    { day: 2, localeDay: '2', month: 'next', specialDay: [] },
                    { day: 3, localeDay: '3', month: 'next', specialDay: [] },
                    { day: 4, localeDay: '4', month: 'next', specialDay: [], isWeekend: true } 
                  ],
                  [
                    { day: 5, localeDay: '5', month: 'next', specialDay: [], isWeekend: true },
                    { day: 6, localeDay: '6', month: 'next', specialDay: [] },
                    { day: 7, localeDay: '7', month: 'next', specialDay: [] },
                    { day: 8, localeDay: '8', month: 'next', specialDay: [] },
                    { day: 9, localeDay: '9', month: 'next', specialDay: [] },
                    { day: 10, localeDay: '10', month: 'next', specialDay: [] },
                    { day: 11, localeDay: '11', month: 'next', specialDay: [], isWeekend: true } 
                  ]
               ],
        localeDate: {
           day: "15",
           month: "1",
           year: "2017"
         },
        date: {
            day: 15,
            month: 1,
            year: 2017
          },
          normalizedDate: { year: 2017, day: 15, month: 1 },
          previousMonth: {
            daysCount: 31,
            longName: "December",
            shortName: "Dec",
            localeDate: {
               day: "15",
               month: "12",
               year: "2016"
             },
            date: {
              day: 15,
              month: 12,
              year: 2016
            },
            normalizedDate: { year: 2016, day: 15, month: 12 }
          },
          nextMonth: {
            daysCount: 28,
            longName: "February",
            shortName: "Feb",
            localeDate: {
              day: "15",
              month: "2",
              year: "2017"
            },
            date: {
              day: 15,
              month: 2,
              year: 2017
            },
            normalizedDate: { year: 2017, day: 15, month: 2 }
          }
      });
    });
  });
});
