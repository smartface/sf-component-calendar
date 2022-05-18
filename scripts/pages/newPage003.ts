/* 
		You can modify its contents.
*/
import { withDismissAndBackButton } from '@smartface/mixins';
import NewPage003Design from '../generated/pages/newPage003';
import specialDays from './specialDays';
import { Route, Router } from '@smartface/router';
import Calendar from 'components/Calendar';

export default class NewPage003 extends withDismissAndBackButton(NewPage003Design) {
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.calendarWeekly.onDaySelect = function (date) {
      // 	const day = date.date.day+"/"+(date.date.month)+"/"+date.date.year;
      // 	const sday = date.dayInfo.specialDay.length > 0
      // 		? date.dayInfo.specialDay.join(" - ")
      // 		: "Ozel Gun Yok";
    }.bind(this);

    this.next.onPress = () => {
      this.calendarWeekly.nextWeek();
    };

    this.prev.onPress = () => {
      this.calendarWeekly.prevWeek();
    };

    this.now.onPress = () => {
      this.calendarWeekly.setSelectedDate(new Date());
    };

    this.back.onPress = () => {
      // Router.go("page1");
    };
  }
  changeCalendar(lang, calendar, sp) {
    this.calendarWeekly.changeCalendar(lang, calendar, sp);
    // 	this.calendarWeekly.setSelectedDate({"month":11,"year":2017,"day":1});
    this.calendarWeekly.applyLayout();
  }
  onShow() {
    super.onShow();

    this.changeCalendar('en-us', 'gregorian', specialDays);
    this.calendarWeekly.setSelectedDate({ month: 11, year: 2017, day: 1 });
  }

  onLoad() {
    super.onLoad();
  }
}
