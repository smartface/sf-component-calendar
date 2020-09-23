/**
 * Smartface Calendar Component
 * @module CalendarCore
 * @type {class}
 * @copyright Smartface 2018
 */
'use strict';
var createService = require("../services/CalendarService").default;
/**
 * Returns initial state
 * @returns {object}
 */
function getInitialState() {
    return {
        month: {},
        day: {},
        rangeSelection: null,
        rangeSelectionMode: RangeSelection.IDLE,
        selectedDays: [],
        selectedDaysByIndex: [],
        weekIndex: 0
    };
}
function createDate(_a) {
    var year = _a.year, month = _a.month, day = _a.day;
    return new Date(year, month, day);
}
/**
 * Notifies subscibers
 * @param {Object) oldState
 * @param {Object} newState
 */
function notify(oldState, newState) {
    this.subscribers.forEach(function (cb) {
        cb(oldState, newState);
    });
}
function getValidDate(date) {
    if (date instanceof Date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    else if (date.year && date.month && date.day) {
        return date;
    }
    else {
        throw new TypeError("Date object is invalid format : " + JSON.stringify(date));
    }
}
/**
 * Calcucalte given day's week and weekday index
 *
 * @param {number} startDayOfMonth
 * @param {number} day
 */
function calculateDatePos(startDayOfMonth, day) {
    var start = startDayOfMonth - 1;
    day = day - 1;
    var weekDayIndex = (start + day) % WEEKDAYS;
    var weekIndex = Math.ceil((start + day + 1) / WEEKDAYS) - 1;
    return {
        weekIndex: weekIndex,
        weekDayIndex: weekDayIndex
    };
}
var WEEKDAYS = 7;
var COLCOUNT = WEEKDAYS - 1;
var ROWCOUNT = 5;
var RangeSelection = {
    IDLE: -1,
    STARTED: 0,
    COMPLETED: 1
};
function calculateDatePosinNext(startDayOfCurrentMonth, daysCountofCurrentMonth, day) {
    var start = daysCountofCurrentMonth - 1 + startDayOfCurrentMonth;
    var weekDayIndex = (start + day - 1) % WEEKDAYS;
    var weekIndex = Math.round((start + day + 1) / WEEKDAYS) - 1;
    return {
        weekIndex: weekIndex > ROWCOUNT ? -2 : weekIndex,
        weekDayIndex: weekIndex > ROWCOUNT ? -2 : weekDayIndex
    };
}
function calculateDatePosinPrev(startDayOfMonth, daysCountPrevMonth, day) {
    var weekDayIndex = startDayOfMonth - 2 - (daysCountPrevMonth - day);
    return {
        weekIndex: weekDayIndex < 0 ? -2 : 0,
        weekDayIndex: weekDayIndex < 0 ? 0 : weekDayIndex
    };
}
/**
 * Gets specified date's info data in specified month.
 *
 * @param {object} date
 * @param {object} month
 * @throw {TypeError}
 * @returns {Calendar~DateInfo}
 */
function getDateData(date, month) {
    var pos = getDatePos(date, month);
    if (pos === null) {
        throw new TypeError(JSON.stringify(date) + " is invalid format.");
    }
    return getDayData(pos.weekIndex, pos.weekDayIndex, month);
}
/**
 * Select specified day
 * @private
 */
function getDayData(weekIndex, weekDayIndex, currentMonth) {
    var dayData = {};
    if (!currentMonth || !currentMonth.days || currentMonth.days[weekIndex] === undefined) {
        throw new TypeError("WeekIndex : " + weekIndex + ", weekDayIndex " + weekDayIndex + " selected day cannot be undefined");
    }
    var selectedDay = currentMonth.days[weekIndex][weekDayIndex];
    dayData.dayInfo = {
        weekDay: weekDayIndex,
        longName: currentMonth.daysLong[weekDayIndex],
        shortName: currentMonth.daysShort[weekDayIndex],
        specialDay: selectedDay.specialDay,
    };
    dayData.date = {
        day: selectedDay.day
    };
    dayData.localeDate = {
        day: currentMonth.days[weekIndex][weekDayIndex].localeDay,
        month: currentMonth.localeDate.month,
        year: currentMonth.localeDate.year,
    };
    switch (selectedDay.month) {
        // if selected day is in the current month.
        case 'current':
            dayData.monthInfo = {
                longName: currentMonth.longName,
                shortName: currentMonth.shortName,
            };
            dayData.date.month = currentMonth.date.month;
            dayData.date.year = currentMonth.date.year;
            break;
        // if selected day is in the next month.
        case 'next':
            dayData.monthInfo = {
                longName: currentMonth.nextMonth.longName,
                shortName: currentMonth.nextMonth.shortName,
            };
            dayData.localeDate.month = currentMonth.nextMonth.localeDate.month;
            dayData.localeDate.year = currentMonth.nextMonth.localeDate.year;
            dayData.date.month = currentMonth.nextMonth.date.month;
            dayData.date.year = currentMonth.nextMonth.date.year;
            break;
        // if selected day is in the previous month.
        case 'previous':
            dayData.monthInfo = {
                longName: currentMonth.previousMonth.longName,
                shortName: currentMonth.previousMonth.shortName,
            };
            dayData.localeDate.month = currentMonth.previousMonth.localeDate.month;
            dayData.localeDate.year = currentMonth.previousMonth.localeDate.year;
            dayData.date.month = currentMonth.previousMonth.date.month;
            dayData.date.year = currentMonth.previousMonth.date.year;
            break;
        default:
            throw new Error('Selected day has invalid data');
    }
    Object.seal(dayData);
    return dayData;
}
/**
 * Calculates week and weekday indexes in the month
 *
 * @param {object} date
 * @param {object} month
 * @param {object} notValue
 * @returns {({weekIndex:number, weekDayIndex:number}|*)}
 */
function getDatePos(date, month, notValue) {
    if (notValue === void 0) { notValue = null; }
    var monthPos = (date.month === month.date.month && 'current') ||
        (date.month === month.nextMonth.date.month && 'next') ||
        (date.month === month.previousMonth.date.month && 'prev');
    switch (monthPos) {
        case 'current':
            return calculateDatePos(month.startDayOfMonth, date.day);
        case 'prev':
            return calculateDatePosinPrev(month.startDayOfMonth, month.previousMonth.daysCount, date.day);
        case 'next':
            var posNext = calculateDatePosinNext(month.startDayOfMonth, month.daysCount, date.day);
            return posNext;
        default:
            return notValue;
    }
}
function isValid(value, notvalue) {
    if (notvalue === void 0) { notvalue = false; }
    return (value === false || value === undefined || value === null) ?
        notvalue :
        value;
}
function isNotValid(value, notvalue) {
    if (notvalue === void 0) { notvalue = false; }
    return isValid(value, notvalue) === notvalue ? value : notvalue;
}
function hasSameMonth(date1, date2) {
    return date1.month === date2.month && date1.year === date2.year;
}
function inSameYear(date1, date2) {
    return date1.year === date2.year;
}
function isMonthGreater(date1, date2) {
    return date1.year > date2.year ||
        (date1.month < date2.month && date1.year === date2.year) ? date1 : date2;
}
function monthMin(date1, date2) {
    return date1.year < date2.year ||
        (date1.year === date2.year && date1.month <= date2.month) ?
        date1 :
        date2;
}
function monthMax(date1, date2) {
    return monthMin(date1, date2) === date1 ? date2 : date1;
}
function notValidRangePoint() {
    return {
        weekIndex: -2,
        weekDayIndex: -2
    };
}
function validateRangePoint(point, month) {
    return inSameYear(point, month.date) ?
        isValid(getDatePos(point, month), notValidRangePoint()) :
        notValidRangePoint();
}
/**
 * CalendarCore Application Service
 * Manages all application logic and state of the calendar.
 *
 * @constructor
 * @class
 */
var CalendarCore = function CalendarCore() {
    this._specialDays = {};
    //subclass initializer
    this.init && this.init();
    this._state = getInitialState();
    this.subscribers = [];
    this.__locked = false;
};
/**
 * Reset calendar state
 *
 */
CalendarCore.prototype.reset = function () {
    this.setState(getInitialState());
};
/**
 * Selects a day in current month
 *
 * @param {number} weekIndex
 * @param {number} weekDayIndex
 */
CalendarCore.prototype.selectDay = function (weekIndex, weekDayIndex) {
    if (this._state.rangeSelectionMode === RangeSelection.STARTED) {
        // this.completeRangeSelection({weekIndex, weekDayIndex});
    }
    else if (this._state.rangeSelectionMode === RangeSelection.IDLE || this._state.rangeSelectionMode === RangeSelection.COMPLETED) {
        this.setState({
            rangeSelection: null,
            rangeSelectionMode: RangeSelection.IDLE,
            selectedDays: [getDayData(weekIndex, weekDayIndex, this._state.month)],
            selectedDaysByIndex: [{ weekIndex: weekIndex, weekDayIndex: weekDayIndex }],
            weekIndex: weekIndex
        });
    }
};
/**
 * Removes selection
 *
 */
CalendarCore.prototype.clearSelection = function () {
    if (this._state.rangeSelection !== null) {
        this.setState({
            rangeSelection: null,
            rangeSelectionMode: RangeSelection.IDLE,
            selectedDaysByIndex: [],
            selectedDays: []
        });
    }
};
/**
 * Returns the selected day state.
 *
 * @private
 * @param {{weekIndex: number, weekDayIndex: number}}
 */
CalendarCore.prototype._selectDay = function (_a) {
    var weekIndex = _a.weekIndex, weekDayIndex = _a.weekDayIndex;
    //console.log(weekIndex+" : "+weekDayIndex);
    return {
        weekIndex: weekIndex,
        selectedDays: [getDayData(weekIndex, weekDayIndex, this._state.month)],
        selectedDaysByIndex: [{
                weekIndex: weekIndex,
                weekDayIndex: weekDayIndex
            }]
    };
};
/**
 * Returns days which are between range-selection start and end dates.
 *
 * @private
 *
 * @param {{start:Calendar~DateInfoDTO, end:Calendar~DateInfoDTO, state:object}} start
 * @returns {{selectedDays: Array.<Object>, selectedDaysByIndex: Array.<Object>}
 */
CalendarCore.prototype._getRange = function (_a) {
    var start = _a.start, end = _a.end, _b = _a.state, state = _b === void 0 ? null : _b;
    start = start.date;
    end = end.date;
    var days = [];
    var selectedDaysByIndex = [];
    var currentState = state || this._state;
    var currentMonth = currentState.month;
    var currentDate = currentMonth.date;
    var month = currentDate.month, year = currentDate.year;
    var startPos = validateRangePoint(start, currentMonth);
    var endPos = validateRangePoint(end, currentMonth);
    var startWeekIndex = startPos.weekIndex, endWeekIndex = endPos.weekIndex;
    var currentMonthintheSelection = monthMin(end, currentDate) === currentDate &&
        monthMax(start, currentDate) === currentDate;
    var startInCurrentPage = startPos.weekIndex !== -2;
    var endInCurrentPage = endPos.weekIndex !== -2;
    var areStartorEndinCurrentPage = startInCurrentPage && endInCurrentPage;
    if (currentState.rangeSelectionMode === RangeSelection.COMPLETED ||
        (currentState.rangeSelectionMode === RangeSelection.STARTED && start !== end)) {
        if (currentMonthintheSelection || areStartorEndinCurrentPage) {
            startWeekIndex = startPos.weekIndex;
            endWeekIndex = endPos.weekDayIndex < 0 ? ROWCOUNT : endPos.weekIndex;
        }
        else if (currentMonthintheSelection &&
            monthMin(end, currentDate) === currentDate &&
            monthMin(start, currentDate) === start) {
            endPos.weekIndex = endWeekIndex = ROWCOUNT;
            endPos.weekDayIndex = COLCOUNT;
        }
    }
    for (var i = startWeekIndex < 0 ? 0 : startWeekIndex; i <= endWeekIndex; i++) {
        var startDayIndex = 0;
        var endDayIndex = COLCOUNT;
        if (startWeekIndex === i) {
            startDayIndex = startPos.weekDayIndex;
        }
        if (endWeekIndex === i && endPos.weekDayIndex >= 0) {
            endDayIndex = endPos.weekDayIndex;
        }
        selectedDaysByIndex.push({ weekIndex: i, weekDayIndexes: [] });
        var weekDayIndexes = selectedDaysByIndex[selectedDaysByIndex.length - 1].weekDayIndexes;
        for (var j = startDayIndex; j <= endDayIndex; j++) {
            days.push(getDayData(i, j, currentState.month));
            weekDayIndexes.push(j);
        }
    }
    return {
        selectedDays: days,
        selectedDaysByIndex: selectedDaysByIndex
    };
};
CalendarCore.prototype.nextWeek = function () {
    if (this._state.weekIndex + 1 === ROWCOUNT) {
        var state = this._nextMonth();
        state.weekIndex = 0;
        this.setState(state);
    }
    else {
        this.setState({
            weekIndex: this._state.weekIndex + 1
        });
    }
};
/**
 * Changes week status to previous
 *
 */
CalendarCore.prototype.prevWeek = function () {
    if (this._state.weekIndex === 0) {
        var state = this._prevMonth();
        state.weekIndex = ROWCOUNT - 1;
        this.setState(state);
    }
    else {
        this.setState({
            weekIndex: this._state.weekIndex - 1
        });
    }
};
/**
 * Creates range selection
 *
 * @param {object} start
 * @param {object} end
 *
 */
CalendarCore.prototype.setRangeSelection = function (start, end) {
    var state = this._setDate(Object.assign({}, start));
    start = getValidDate(start);
    end = getValidDate(end);
    state.rangeSelection = {
        start: getDateData(start, this._calendarService.getCalendarMonth(start)),
        end: getDateData(end, this._calendarService.getCalendarMonth(end))
    };
    state.rangeSelectionMode = RangeSelection.STARTED;
    Object.assign(state, this._getRange({ start: state.rangeSelection.start, end: state.rangeSelection.end, state: state }));
    state.rangeSelectionMode = RangeSelection.COMPLETED;
    this.setState(state);
};
/**
 * Activates range selection and changes its status
 *
 * @param {number} weekIndex
 * @param {numer} weekDayIndex
 */
CalendarCore.prototype.rangeSelection = function (_a) {
    var weekIndex = _a.weekIndex, weekDayIndex = _a.weekDayIndex, _b = _a.date, date = _b === void 0 ? null : _b;
    switch (this._state.rangeSelectionMode) {
        case RangeSelection.IDLE:
            this.startRangeSelection({ weekIndex: weekIndex, weekDayIndex: weekDayIndex });
            break;
        case RangeSelection.STARTED:
            this.completeRangeSelection({ weekIndex: weekIndex, weekDayIndex: weekDayIndex });
            break;
        default:
            this.clearSelection();
    }
};
/**
 * Activates to start calendar.
 *
 * @param {{weekIndex:(number|null), weekDayIndex:(number|null), date:(null|Calendar~DateDTO|Date)}}
 */
CalendarCore.prototype.startRangeSelection = function (_a) {
    var _b = _a.weekIndex, weekIndex = _b === void 0 ? null : _b, _c = _a.weekDayIndex, weekDayIndex = _c === void 0 ? null : _c, _d = _a.date, date = _d === void 0 ? null : _d;
    if (this._state.rangeSelectionMode === RangeSelection.IDLE) {
        var requestedDateInfo = date !== null
            // if date exists then get valid date format
            && (date = getValidDate(date))
            ? getDateData(date, this._calendarService.getCalendarMonth(date))
            : getDayData(weekIndex, weekDayIndex, this._state.month);
        var state = { selectedDaysByIndex: [], selectedDays: [] };
        Object.assign(state, {
            rangeSelection: {
                // set start date
                start: requestedDateInfo,
                // it's same instance because it's just started.
                end: requestedDateInfo
            },
            // change selection status
            rangeSelectionMode: RangeSelection.STARTED
        }, 
        // get selected day data
        this._getRange({ start: requestedDateInfo, end: requestedDateInfo }), 
        //if date exists then jump to
        date && this._setDate(Object.assign({}, date || requestedDateInfo.date)) || {}, this._selectDay(date && this.getWeekDay(date) || { weekIndex: weekIndex, weekDayIndex: weekDayIndex }));
        this.setState(state);
    }
};
/**
 * Completes range selection
 *
 * @param {{weekIndex:(number|null), weekDayIndex:(number|null), date:(null|Calendar~DateDTO|Date)}}
 */
CalendarCore.prototype.completeRangeSelection = function (_a) {
    var _b = _a.weekIndex, weekIndex = _b === void 0 ? null : _b, _c = _a.weekDayIndex, weekDayIndex = _c === void 0 ? null : _c, _d = _a.date, date = _d === void 0 ? null : _d;
    if (this._state.rangeSelectionMode === RangeSelection.STARTED) {
        var day = date !== null && (date = getValidDate(date))
            ? getDateData(date, this._calendarService.getCalendarMonth(date))
            : getDayData(weekIndex, weekDayIndex, this._state.month);
        var state = {
            rangeSelection: {
                start: this._state.rangeSelection.start,
                end: day
            },
            rangeSelectionMode: RangeSelection.COMPLETED
        };
        Object.assign(state, this._getRange(state.rangeSelection));
        this.setState(state);
    }
    return true;
};
/**
 * Adds callback to subscription list
 *
 * @param {function} cb
 */
CalendarCore.prototype.subscribe = function (cb) {
    var _this = this;
    this.subscribers.push(cb);
    return function () { return _this.unsubscribe(cb); };
};
/**
 * Removes callback from subscription list
 *
 * @param {function} cb
 */
CalendarCore.prototype.unsubscribe = function (cb) {
    this.subscribers = this.filter(function (_cb) { return cb != _cb; });
};
/**
 * Selects today
 *
 */
CalendarCore.prototype.now = function () {
    this.setSelectedDate(new Date());
};
/**
 * Gets week day index of selected date
 *
 * @returns {number}
 */
CalendarCore.prototype.getWeekDay = function (date) {
    if (date === void 0) { date = null; }
    var month = date && this._calendarService.getCalendarMonth(getValidDate(date)) || null;
    return date === null
        ? calculateDatePos(this._state.month.startDayOfMonth, this._state.month.date.day)
        : calculateDatePos(month.startDayOfMonth, month.date.day);
};
/**
 * Gets latest state
 *
 * @returns {Object}
 */
CalendarCore.prototype.getState = function () {
    return this._state;
};
/**
 * Returns state to change to next month
 *
 * @private
 *
 * @returns {{
 *	rangeSelection: Array,
 *	rangeSelectionMode: number,
 *	selectedDays: Array,
 *	month: Object,
 *  selectedDaysByIndex: Array
 * }}
 */
CalendarCore.prototype._nextMonth = function () {
    var state = getInitialState();
    if (this._state.month) {
        state.rangeSelection = this._state.rangeSelection;
        state.rangeSelectionMode = this._state.rangeSelectionMode;
        state.selectedDays = this._state.selectedDays;
        state.month = this._calendarService.getCalendarMonth(this._state.month.nextMonth.normalizedDate);
        if (this._state.rangeSelectionMode === RangeSelection.IDLE && this._state.selectedDays.length === 1)
            state.selectedDaysByIndex = [getDatePos(this._state.selectedDays[0].date, state.month, { weekIndex: -2, weekDayIndex: null })];
        if (this._state.rangeSelectionMode !== RangeSelection.IDLE) {
            var _a = state.rangeSelection, start = _a.start, end = _a.end;
            Object.assign(state, this._getRange({ start: start, end: end, state: state }));
        }
        state.weekIndex = state.selectedDaysByIndex[0] && state.selectedDaysByIndex[0].weekIndex || 0;
    }
    return state;
};
/**
 * Changes calendar current to next month
 *
 */
CalendarCore.prototype.nextMonth = function () {
    this.setState(this._nextMonth());
};
/**
 * Updates state
 *
 * @param {Object} state - State object
 */
CalendarCore.prototype.setState = function (state) {
    var oldState = this._state;
    var newState = Object.assign({}, this._state, state);
    Object.freeze(newState);
    this._state = newState;
    notify.call(this, oldState, newState);
};
/**
 * Returns calendar setDate state
 * @private
 *
 * @param {(Calendar~DateDTO|Date)}
 */
CalendarCore.prototype._setDate = function (date) {
    var dateObj = getValidDate(date);
    var month = this._calendarService.getCalendarMonth(dateObj);
    var selectedDaysByIndex = getDatePos(dateObj, month, null);
    return {
        month: month,
        weekIndex: selectedDaysByIndex !== null ? selectedDaysByIndex.weekIndex : 0
    };
};
/**
 * Changes current selected month
 *
 * @param {Calendar~DateDTO} date
 */
CalendarCore.prototype.setDate = function (date) {
    this.setState(this._setDate(date));
};
/**
 * Changes current selected date
 *
 * @param {Calendar~DateDTO} date
 */
CalendarCore.prototype.setSelectedDate = function (date) {
    var validDate = getValidDate(date);
    this.setState(Object.assign(this._setDate(validDate), this._selectDay(this.getWeekDay(validDate))));
};
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
 * @param {integer} [firstDayOfWeek=0] - First day of a week [0...6]
 */
CalendarCore.prototype.changeCalendar = function (lang, type, specialDays, firstDayOfWeek) {
    if (lang === void 0) { lang = "en"; }
    if (type === void 0) { type = "gregorian"; }
    if (specialDays === void 0) { specialDays = null; }
    if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
    this._specialDays = specialDays || this._specialDays;
    this._calendarService = createService({
        lang: lang,
        type: type,
        specialDays: specialDays,
        firstDayOfWeek: firstDayOfWeek
    });
    var state = getInitialState();
    state.month = this._calendarService.getCalendarMonth();
    this.setState(state);
};
/**
 * Returns state to change to previous month
 * @private
 *
 * @returns {{
 *	rangeSelection: Array,
 *	rangeSelectionMode: number,
 *	selectedDays: Array,
 *	month: Object,
 *  selectedDaysByIndex: Array
 * }}
 */
CalendarCore.prototype._prevMonth = function () {
    var state = getInitialState();
    if (this._state.month) {
        state.month = this._calendarService.getCalendarMonth(this._state.month.previousMonth.normalizedDate);
        state.selectedDays = this._state.selectedDays;
        state.rangeSelection = this._state.rangeSelection;
        state.rangeSelectionMode = this._state.rangeSelectionMode;
        if (this._state.rangeSelectionMode === RangeSelection.IDLE && this._state.selectedDays.length === 1)
            state.selectedDaysByIndex = [getDatePos(this._state.selectedDays[0].date, state.month, { weekIndex: -2, weekDayIndex: null })];
        if (this._state.rangeSelectionMode !== RangeSelection.IDLE) {
            var _a = state.rangeSelection, start = _a.start, end = _a.end;
            Object.assign(state, this._getRange({ start: start, end: end, state: state }));
        }
        state.weekIndex = state.selectedDaysByIndex[0] && state.selectedDaysByIndex[0].weekIndex || 0;
    }
    return state;
};
/**
 * Changes calendar month to previous month
 *
 */
CalendarCore.prototype.prevMonth = function () {
    this.setState(this._prevMonth());
};
module.exports = CalendarCore;
//# sourceMappingURL=CalendarCore.js.map