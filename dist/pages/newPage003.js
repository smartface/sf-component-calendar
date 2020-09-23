"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*
        You can modify its contents.
*/
var newPage003_1 = require("../generated/pages/newPage003");
var specialDays_1 = require("./specialDays");
var NewPage003 = /** @class */ (function (_super) {
    __extends(NewPage003, _super);
    function NewPage003() {
        var _this = _super.call(this) || this;
        _this.children.calendar = _this.children.calendarWeekly;
        delete _this.children.calendarWeekly;
        // overrides super.onShow method
        _this.onShow = onShow.bind(_this, _this.onShow.bind(_this));
        // overrides super.onLoad method
        _this.onLoad = onLoad.bind(_this, _this.onLoad.bind(_this));
        _this.children.calendar.onDaySelect = function (date) {
            // 	const day = date.date.day+"/"+(date.date.month)+"/"+date.date.year;
            // 	const sday = date.dayInfo.specialDay.length > 0 
            // 		? date.dayInfo.specialDay.join(" - ")
            // 		: "Ozel Gun Yok";
        }.bind(_this);
        _this.children.next.onPress = function (argument) {
            _this.children.calendar.nextWeek();
        };
        _this.children.prev.onPress = function (argument) {
            _this.children.calendar.prevWeek();
        };
        _this.children.now.onPress = function (argument) {
            _this.children.calendar.setSelectedDate(new Date());
        };
        _this.children.back.onPress = function (argument) {
            // Router.go("page1");
        };
        return _this;
    }
    return NewPage003;
}(newPage003_1.default));
function changeCalendar(lang, calendar, sp) {
    this.calendar.changeCalendar(lang, calendar, sp);
    // 	this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
    this.calendar.applyLayout();
}
/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    changeCalendar.call(this, "en-us", "gregorian", specialDays_1.default);
    this.calendar.setSelectedDate({ "month": 11, "year": 2017, "day": 1 });
}
/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
}
exports.default = NewPage003;
//# sourceMappingURL=newPage003.js.map