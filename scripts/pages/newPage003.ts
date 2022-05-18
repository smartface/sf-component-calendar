/* 
		You can modify its contents.
*/
import { withDismissAndBackButton } from "@smartface/mixins";
import NewPage003Design from "../generated/pages/newPage003";
import specialDays from "./specialDays";
import { Route, Router } from "@smartface/router";

export default class NewPage003 extends withDismissAndBackButton(
  NewPage003Design
) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.children.calendar = this.children.calendarWeekly;
    delete this.children.calendarWeekly;

    this.children.calendar.onDaySelect = function (date) {
      // 	const day = date.date.day+"/"+(date.date.month)+"/"+date.date.year;
      // 	const sday = date.dayInfo.specialDay.length > 0
      // 		? date.dayInfo.specialDay.join(" - ")
      // 		: "Ozel Gun Yok";
    }.bind(this);

    this.children.next.onPress = (argument) => {
      this.children.calendar.nextWeek();
    };

    this.children.prev.onPress = (argument) => {
      this.children.calendar.prevWeek();
    };

    this.children.now.onPress = (argument) => {
      this.children.calendar.setSelectedDate(new Date());
    };

    this.children.back.onPress = (argument) => {
      // Router.go("page1");
    };
  }
  changeCalendar(lang, calendar, sp) {
    this.calendar.changeCalendar(lang, calendar, sp);
    // 	this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
    this.calendar.applyLayout();
  }
  onShow() {
    super.onShow();

    this.changeCalendar("en-us", "gregorian", specialDays);
    this.calendar.setSelectedDate({ month: 11, year: 2017, day: 1 });
  }

  onLoad() {
    super.onLoad();
  }
}
