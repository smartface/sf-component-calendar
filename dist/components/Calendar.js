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
var Calendar_1 = require("generated/my-components/Calendar");
var CalendarCore_1 = require("core/CalendarCore");
// export default class Calendar extends CalendarDesign {
// 	pageName?: string | undefined;
// 	constructor(props?: any, pageName?: string) {
// 		// Initalizes super class for this scope
// 		super(props);
// 		this.pageName = pageName;
// 	}
// }
/**
 * Smartface Calendar Component
 * @module Calendar
 * @type {class}
 * @copyright Smartface 2018
*/
/**
 * @typedef LocaleDateDTO
 * @property {string} day
 * @property {string} month
 * @property {string} year
 */
var calendarContext = require("./calendarContext");
var themeFile = require("../theme.json");
/**
 * Calendar Component
 *
 * @example
 *
 * const {Calendar} = require('@smartface/sf-component-calendar/components');
 * const specialDaysConf = require('./specialDays.json');
 *
 * const myCalendar = new Calendar();
 *
 * // Please use after Page:onShow event.
 * myCalendar.changeCalendar("en", "gregorian", specialDaysConf)
 * // when user select a date
 * myCalendar.onDaySelect = function(dateInfo){
 *	  //...
 * }
 *
 * // changing calendar date
 * myCalendar.setSelectedDate({month:2, year:2017, day:12});
 *
 * @class
 * @param {CalendarOptions} options
 */
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this._calendarCore = _this.options && _this.options.calendarCore || new CalendarCore_1.default();
        _this._weeks = [];
        _this._weekMode = false;
        /**
     * @event
     * @param {DateInfoDTO} start - Range start date
     */
        _this.onRangeSelectionStart = function (start) { };
        /**
         * @event
         * @param {DateInfoDTO} start - Range start date
         * @param {DateInfoDTO} end - Range end date
         */
        _this.onRangeSelectionComplete = function (start, end) { };
        _this.onDayLongPress = function () { };
        /**
         * LongPress
         * @event
         *
         * @param {number} weekIndex
         * @param {number} weekDayIndex
         */
        _this.onLongPress = null;
        _this._onLongPress = function (weekIndex, weekDayIndexes) {
            this.onLongPress && this.onLongPress(weekIndex, weekDayIndexes);
        };
        /**
         * @event
         * @param {DateDTO} date
         */
        _this.onBeforeMonthChange = function (date) {
            return true;
        };
        /**
         * @event
         * @params {DateDtO} date
         */
        _this.onMonthChange = function (date) { };
        /**
         * @event
         * @param {Array.<DateInfoDTO>} date - Selected date
         */
        _this.onDaySelect = function (date) { };
        var _a = _this.options || {}, _b = _a.useRangeSelection, useRangeSelection = _b === void 0 ? true : _b, _c = _a.theme, theme = _c === void 0 ? null : _c, _d = _a.justCurrentDays, justCurrentDays = _d === void 0 ? false : _d, _e = _a.calendarCore, calendarCore = _e === void 0 ? null : _e, _f = _a.useContext, useContext = _f === void 0 ? true : _f, _g = _a.useDaySelection, useDaySelection = _g === void 0 ? true : _g;
        _this.options = {
            useRangeSelection: useRangeSelection,
            useDaySelection: useDaySelection,
            justCurrentDays: justCurrentDays,
            theme: theme,
            calendarCore: calendarCore,
            useContext: useContext,
        };
        _this._unsubsciber = _this._calendarCore.subscribe(function (oldState, newState) { return _this._updateCalendar(oldState, newState); });
        _this.children.navbar.onNext = _this.nextMonth.bind(_this);
        _this.children.navbar.onPrev = _this.prevMonth.bind(_this);
        _this._weeks.push(_this.children.body.children.week1);
        _this._weeks.push(_this.children.body.children.week2);
        _this._weeks.push(_this.children.body.children.week3);
        _this._weeks.push(_this.children.body.children.week4);
        _this._weeks.push(_this.children.body.children.week5);
        _this._weeks.push(_this.children.body.children.week6);
        _this._weeks.forEach(function (row, weekIndex) {
            row.onDayLongPress = _this._onLongPress.bind(_this, weekIndex);
            if (useDaySelection === true) {
                row.onDaySelect = _this.selectDay.bind(_this, weekIndex);
            }
            if (useRangeSelection === true) {
                if (useDaySelection === true) {
                    row.onDayLongPress = function (weekDayIndex) {
                        _this._onSelectRange(weekIndex, weekDayIndex);
                        _this._onLongPress(weekIndex, weekDayIndex);
                    };
                }
                else {
                    row.onDaySelect = function (weekDayIndex) {
                        _this._onSelectRange(weekIndex, weekDayIndex);
                        _this._onLongPress(weekIndex, weekDayIndex);
                    };
                }
            }
        });
        _this.children.navbar.children.nextWeek.onPress = function () {
            _this._calendarCore.nextWeek();
        };
        _this.children.navbar.children.prevWeek.onPress = function () {
            _this._calendarCore.prevWeek();
        };
        return _this;
    }
    /**
     * @private
     *
     * @fires onRangeSelectionComplete
     * @fires onRangeSelectionStart
     * @fires onDaySelect
     */
    Calendar.prototype._onSelectRange = function (weekIndex, weekDayIndex) {
        // this.onBeforeRangeSelectStart && this.onBeforeRangeSelectStart(weekIndex, weekDayIndex);
        // this.isRangeSelection !== true && activateRangeSelection.call(this);
        this._calendarCore.rangeSelection({ weekIndex: weekIndex, weekDayIndex: weekDayIndex });
        var state = this._calendarCore.getState();
        if (state.rangeSelectionMode === 0) {
            this.onRangeSelectionStart
                && this.onRangeSelectionStart(Object.assign({}, state.rangeSelection.start));
        }
        else if (state.rangeSelectionMode === 1) {
            this.onRangeSelectionComplete
                && this.onRangeSelectionComplete(Object.assign({}, state.rangeSelection.start), Object.assign({}, state.rangeSelection.end));
            this.onDaySelect && this.onDaySelect && this.onDaySelect(this._calendarCore.getState().selectedDays || []);
        }
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
     * @param {number} [firstDayOfWeek=0] - First day of a week [0...6]
     */
    Calendar.prototype.changeCalendar = function (lang, type, specialDays, firstDayOfWeek) {
        if (lang === void 0) { lang = "en"; }
        if (type === void 0) { type = "gregorian"; }
        if (specialDays === void 0) { specialDays = null; }
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        this.dispatch({
            type: "changeCalendar",
            lang: lang
        });
        this._calendarCore.changeCalendar(lang, type, specialDays, firstDayOfWeek);
    };
    ;
    /**
     * Subscribes to calendar-core and renders calendar when state is changed
     * @private
     * @param {object} oldState
     * @param {object} newState
     */
    Calendar.prototype._updateCalendar = function (oldState, newState) {
        var _this = this;
        // console.log(JSON.stringify(newState, " ", "\t"));
        if ((oldState.rangeSelectionMode === -1 && newState.rangeSelectionMode === 0)
            || (oldState.rangeSelectionMode === 1 && newState.rangeSelectionMode === -1)) {
            this.dispatch({
                type: "deselectDays"
            });
        }
        if (newState.month !== oldState.month) {
            this.dispatch({
                type: "resetDays"
            });
            this.currentMonth = newState.month;
            updateRows.call(this, newState.month.days, newState.month.date);
            this.children.navbar.setLabel(newState.month.longName + " " + newState.month.localeDate.year);
            this._weeks.forEach(function (row, i) {
                row.invalidate();
            });
        }
        // newState.selectedDaysByIndex.map(newState.rangeSelectionMode === -1
        //     ? this._selectDay.bind(this)
        //     : this._selectDayasRange.bind(this)
        // );
        newState.month.daysMin.forEach(function (day, index) {
            _this.children.calendarDays.children["dayName_" + index].text = day;
        });
        this._weekMode ? this.setWeekMode(this._weekMode) : this.children.body.applyLayout();
        this.applyLayout();
    };
    ;
    /**
     * Changes Calendar styles
     *
     * @param {Object} styles - A style object
     */
    Calendar.prototype.addStyles = function (styles) {
        this._styleContext && this._styleContext(styles);
    };
    ;
    Calendar.prototype._selectDay = function (_a) {
        var weekIndex = _a.weekIndex, weekDayIndex = _a.weekDayIndex;
        weekIndex >= 0 && weekDayIndex != null
            && this._weeks[weekIndex].setSelectedIndex(weekDayIndex);
    };
    ;
    /**
     * Returns calendar weekmode
     *
     * @returns {boolean}
     *
     */
    Calendar.prototype.getWeekMode = function () {
        return this._weekMode;
    };
    ;
    /**
     * Displays only a week row
     *
     * @param {boolean} value
     */
    Calendar.prototype.setWeekMode = function (value) {
        this._weekMode = value;
        var weekIndex = this._calendarCore.getState().weekIndex;
        this.children.navbar.weekMode(value);
        this._weeks.forEach(function (row, i) {
            var available = !(value && i !== weekIndex);
            row.setAvailable(available);
            row.invalidate();
        });
        this.applyLayout();
    };
    ;
    Calendar.prototype._selectDayasRange = function (_a) {
        var weekIndex = _a.weekIndex, weekDayIndexes = _a.weekDayIndexes, weekDayIndex = _a.weekDayIndex;
        if (this._weeks[weekIndex] === undefined)
            throw new TypeError(weekIndex + " Week cannot be undefined");
        this._weeks[weekIndex].setRangeIndex(weekDayIndexes
            ? weekDayIndexes
            : weekDayIndex
                ? [weekDayIndex]
                : []);
    };
    ;
    /**
     * Sets calendar day without the day selection
     *
     * @param {DateDTO} date
     */
    Calendar.prototype.setDate = function (date) {
        this.dispatch({
            type: "deselectDays"
        });
        var newDate = Object.assign({}, date);
        this._calendarCore.setDate(newDate);
    };
    ;
    /**
     * Sets range dates
     *
     * @param {DateDTO} start - Start date {@link DateDTO}
     * @param {DateDTO} end - Final date {@link DateDTO}
     */
    Calendar.prototype.setRangeDates = function (start, end) {
        this.dispatch({
            type: "deselectDays"
        });
        this._calendarCore.setRangeSelection(start, end);
    };
    ;
    /**
     * Sets calendar date and highlight the day
     * @param {DateDTO} date {@link DateDTO}
     */
    Calendar.prototype.setSelectedDate = function (date) {
        this.dispatch({
            type: "deselectDays"
        });
        if (this.options.useDaySelection === true) {
            this._calendarCore.setSelectedDate(date);
        }
        // } else {
        // this._calendarCore.startRangeSelection({date});
        // }
    };
    ;
    /**
     * Disposes the Component instance
     */
    Calendar.prototype.dispose = function () {
        this._unsubsciber();
        this.onDaySelect = null;
        this.onDayLongPress = null;
        this._unsubsciber = null;
        this._calendarCore = null;
        this._weeks = [];
        this._styleContext(null);
        this.dispatch = null;
        this._styleContext = null;
        // this._calendarService = null;
        this.currentMonth = null;
        // this.onChanged = null;
    };
    ;
    /**
     * Changes current to next month
     *
     * @fires onBeforeMonthChange
     * @fires onMonthChange
     */
    Calendar.prototype.nextMonth = function () {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.nextMonth.normalizedDate) === false) {
            return;
        }
        if (this.currentMonth) {
            this._calendarCore.nextMonth();
            this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
        }
    };
    ;
    /**
     * Changes selected date to now
     */
    Calendar.prototype.now = function () {
        this._calendarCore.now();
    };
    ;
    /**
     * Changes current to previous month
     * @fires onBeforeMonthChange
     * @fires onMonthChange
     */
    Calendar.prototype.prevMonth = function () {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.previousMonth.normalizedDate) === false) {
            return;
        }
        if (this.currentMonth) {
            this._calendarCore.prevMonth();
            this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
        }
    };
    ;
    /**
     * Selects a day by week and day index
     *
     * @fires onDaySelect
     * @param {number} weekIndex - Calendar row index
     * @param {number} weekDayIndex - Calendar column index
     * @param {boolean} [notify=true] - If fires selection event or not.
     */
    Calendar.prototype.selectDay = function (weekIndex, weekDayIndex, notify) {
        if (notify === void 0) { notify = true; }
        this._calendarCore.selectDay(weekIndex, weekDayIndex);
        notify && this.onDaySelect && this.onDaySelect(this._calendarCore.getState().selectedDays || []);
    };
    ;
    return Calendar;
}(Calendar_1.default));
function updateRows(days, date) {
    var _this = this;
    this._weeks.forEach(function (row, index) {
        row.setDays(days[index], _this.__options.justCurrentDays, true);
    });
}
// Calendar.$$_styleContext = {
// 	'no-context': true
// };
exports.default = Calendar;
//# sourceMappingURL=Calendar.js.map