import * as DateWrapper from "../src/application/DateWrapper";
import * as CalendarService from "../src/application/CalendarService";
import {expect} from "chai";

describe("Calendar", function() {
  describe("Month", function() {
    it("should return all needed calendar data a month", function() {
      const data = CalendarService.getMonth(1);
      console.log(data);
      expect("").to.eql("");
    });
  });
});
