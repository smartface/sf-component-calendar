import NewPage004Design from "generated/pages/newPage004";
import Button = require("@smartface/native/ui/button");
import pageContextPatch from "@smartface/contx/lib/smartface/pageContextPatch";
import Calendar from "components/Calendar";
import CalendarCore from "core/CalendarCore";
import specialDays from "./specialDays";
import { Route, Router } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";

export default class NewPage004 extends withDismissAndBackButton(
  NewPage004Design
) {
  calendar = new Calendar({ useRangeSelection: false });
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.calendar.changeCalendar("tr");

    this.addChild(this.calendar);
    this.calendar.top = 100;
    this.calendar.onDaySelect = (data) => {
      console.log(data);
    };
    this.button1.onPress = () => {
      this.calendar.setSpecialDays(specialDays);
    };
  }

  onShow() {
    super.onShow();

    // this.addChild(this.calendar);
    // this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
    this.calendar.applyLayout();
  }

  onLoad() {
    super.onLoad();
  }
}
