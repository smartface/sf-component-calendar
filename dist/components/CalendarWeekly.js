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
var CalendarWeekly_1 = require("generated/my-components/CalendarWeekly");
var calendarContext_1 = require("./calendarContext");
var CalendarCore_1 = require("core/CalendarCore");
var themeFile = require("../theme.json");
var CalendarWeekly = /** @class */ (function (_super) {
    __extends(CalendarWeekly, _super);
    function CalendarWeekly(props, pageName) {
        var _this = 
        // Initalizes super class for this scope
        _super.call(this, props) || this;
        _this.styleContext = calendarContext_1.default(_this, "calendar", themeFile);
        _this.calendarCore = new CalendarCore_1.default();
        _this.onBeforeMonthChange = null;
        _this.onMonthChange = null;
        _this.onDaySelect = null;
        _this.pageName = pageName;
        _this.calendarCore.subscribe(function (oldState, newState) { return _this._updateCalendar(oldState, newState); });
        _this.children.navbar.onNext = function () { return _this.nextMonth(); };
        _this.children.navbar.onPrev = function () { return _this.prevMonth(); };
        _this.children.week.onDaySelected = function (weekIndex, weekDayIndex, notify) { return _this.selectDay(weekIndex, weekDayIndex, notify); };
        return _this;
    }
    /**
     * Changes current to next month
     */
    CalendarWeekly.prototype.nextMonth = function () {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.nextMonth.normalizedDate) === false) {
            return;
        }
        if (this.currentMonth) {
            this.dispatch({
                type: "resetDays"
            });
            this.calendarCore.nextMonth();
            this.onMonthChange && this.onMonthChange(this.currentMonth.nextMonth.normalizedDate);
        }
    };
    ;
    /**
     * Selects a day by week and day index
     *
     * @param {number} weekIndex - Calendar row index
     * @param {number} weekDayIndex - Calendar column index
     * @param {bool} notify - If fires selection event or not.
     */
    CalendarWeekly.prototype.selectDay = function (weekIndex, weekDayIndex, notify) {
        if (notify === void 0) { notify = true; }
        var state = this.calendarCore.getState();
        if (weekIndex === null && state.selectedDaysByIndex.length > 0) {
            this.calendarCore.selectDay(state.selectedDaysByIndex[0].weekIndex, weekDayIndex);
        }
        else if (weekIndex !== null && weekDayIndex !== null) {
            this.calendarCore.selectDay(weekIndex, weekDayIndex);
        }
        notify && this.onDaySelect && this.onDaySelect(this.calendarCore.getState().selectedDays);
    };
    ;
    /**
     * Changes current to previous month
     *
     */
    CalendarWeekly.prototype.prevMonth = function () {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.previousMonth.normalizedDate) === false) {
            return;
        }
        if (this.currentMonth) {
            // this._updateCalendar(this._calendarService.getCalendarMonth(this.currentMonth.previousMonth.normalizedDate));
            this.dispatch({
                type: "resetDays"
            });
            this.calendarCore.prevMonth();
            this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
        }
    };
    ;
    /**
     * Jumps to the next week. If the week is the last week then jumps to
     * the next month and its first week.
     *
     */
    CalendarWeekly.prototype.nextWeek = function () {
        this.dispatch({
            type: "resetDays"
        });
        this.calendarCore.nextWeek();
    };
    ;
    /**
     * Jumps to the previous week. If the week is the first week then jumps to
     * the previous month and its last week.
     *
     */
    CalendarWeekly.prototype.prevWeek = function () {
        this.dispatch({
            type: "resetDays"
        });
        this.calendarCore.prevWeek();
    };
    ;
    /**
     * Changes calendar creating new calendar data and resets view
     *
     **Supported Calendars:**
      - CalendarTypes.HIJRI
      - CalendarTypes.GREGORIAN
     *
     **Supported Languages:**
      - Turkish : "tr"
      - German : "de"
      - French : "fr"
      - Arabic: "ar"
      - Arabic (Saudi): "ar-sa"
      - Dutch : "nl"
       and all languages that are supported by [moment.js](https://github.com/moment/moment/tree/develop/locale)
     *
     * @param {string} [lang="en"] - Language code like 'en, en-US, tr, ar-SA etc.'
     * @param {string} [type="gregorian"] - Calendar type, values can only be gregorian or hijri.
     * @param {(object|null)} [specialDays=null] - Specialdays objects
     */
    CalendarWeekly.prototype.changeCalendar = function (lang, type, specialDays) {
        if (lang === void 0) { lang = "en"; }
        if (type === void 0) { type = "gregorian"; }
        if (specialDays === void 0) { specialDays = null; }
        this.dispatch({
            type: "changeCalendar",
            lang: lang
        });
        this.calendarCore.changeCalendar(lang, type, specialDays);
    };
    ;
    CalendarWeekly.prototype._setDate = function (date) {
        this.dispatch({
            type: "resetDays"
        });
        this.calendarCore.setDate(date);
    };
    ;
    /**
     * Sets calendar date and highlight the day
     * @param {Calendar~DateDTO} date
     */
    CalendarWeekly.prototype.setSelectedDate = function (date) {
        this.dispatch({
            type: "resetDays"
        });
        this.calendarCore.setSelectedDate(date);
    };
    ;
    CalendarWeekly.prototype._selectDay = function (currentWeek, _a) {
        var weekIndex = _a.weekIndex, weekDayIndex = _a.weekDayIndex;
        weekIndex === currentWeek
            && weekIndex >= 0
            && weekDayIndex != null
            && this.children.week.setSelectedIndex(weekDayIndex);
    };
    ;
    /**
     * Subscribes to calendar-core and renders calendar when state is changed
     * @private
     * @param {object} oldState
     * @param {object} newState
     */
    CalendarWeekly.prototype._updateCalendar = function (oldState, newState) {
        this.currentMonth = newState.month;
        this.children.week.setDays(newState.month.days[newState.weekIndex]);
        if (newState.month !== oldState.month) {
            this.children.navbar.setLabel(newState.month.longName + " " + newState.month.localeDate.year);
            newState.month.daysMin.forEach(function (day, index) {
                this.children.calendarDays.children["dayName_" + index].text = day;
            }.bind(this));
        }
        // newState.selectedDaysByIndex.map(newState.rangeSelectionMode === -1 && this._selectDay(newState.weekIndex);
    };
    ;
    return CalendarWeekly;
}(CalendarWeekly_1.default));
exports.default = CalendarWeekly;
//# sourceMappingURL=CalendarWeekly.js.map