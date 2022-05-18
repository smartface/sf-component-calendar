/**
 * Smartface Calendar Component
 * @module CalendarCore
 * @type {class}
 * @copyright Smartface 2018
 */

import { DateObject } from './DateObject';
import { DateInfo } from './DateInfo';
import { DayInfo } from './DayInfo';
import { DayMonthInfo } from './DayMonthInfo';

import calendarServiceBuilder, { CalendarPage, CalendarService } from '../services/CalendarService';
import { SpecialDaysData } from 'services/SpecialDaysService';
import { ROWCOUNT, COLCOUNT } from './constants';
import { calculateDatePos } from './calculateDatePos';
import { getDatePos } from './getDatePos';
import { RangeSelection } from './RangeSelection';

export type CalendarState = {
  month: CalendarPage | null;
  day: {} | null;
  rangeSelection: { start: DateInfo; end: DateInfo } | null;
  rangeSelectionMode: RangeSelection;
  selectedDays: DateInfo[];
  selectedDaysByIndex: { weekIndex: number; weekDayIndex: number }[];
  weekIndex: number;
};
/**
 * Returns initial state
 * @returns {object}
 */
function getInitialState(): CalendarState {
  return {
    month: null,
    day: null,
    rangeSelection: null,
    rangeSelectionMode: RangeSelection.IDLE,
    selectedDays: [],
    selectedDaysByIndex: [],
    weekIndex: 0
  };
}

function createDate({ year, month, day }) {
  return new Date(year, month, day);
}

/**
 * Notifies subscibers
 * @param {Object) oldState
 * @param {Object} newState
 */
function notify(oldState, newState) {
  this.subscribers.forEach((cb) => {
    cb(oldState, newState);
  });
}

function getValidDate(date): DateObject {
  if (date instanceof Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  } else if (date.year && date.month && date.day) {
    return date;
  } else {
    throw new TypeError('Date object is invalid format : ' + JSON.stringify(date));
  }
}

/**
 * Gets specified date's info data in specified month.
 *
 * @param {object} date
 * @param {object} month
 * @throw {TypeError}
 * @returns {Calendar~DateInfo}
 */
function getDateData(date: DateObject, month: CalendarPage) {
  const pos = getDatePos(date, month);

  if (pos === null) {
    throw new TypeError(JSON.stringify(date) + ' is invalid format.');
  }

  return getDayData(pos.weekIndex, pos.weekDayIndex, month);
}

/**
 * Select specified day
 * @private
 */
function getDayData(weekIndex: number, weekDayIndex: number, currentMonth: CalendarPage) {
  if (!currentMonth || !currentMonth.days || currentMonth.days[weekIndex] === undefined) {
    throw new TypeError('WeekIndex : ' + weekIndex + ', weekDayIndex ' + weekDayIndex + ' selected day cannot be undefined');
  }

  const selectedDay = currentMonth.days[weekIndex][weekDayIndex];

  const dayInfo: DayInfo = {
    weekDay: weekDayIndex,
    longName: currentMonth.daysLong[weekDayIndex],
    shortName: currentMonth.daysShort[weekDayIndex],
    specialDay: selectedDay.specialDay
  };

  const date = {
    day: selectedDay.day,
    month: NaN,
    year: NaN
  };

  const localeDate: DateObject<string> = {
    day: currentMonth.days[weekIndex][weekDayIndex].localeDay,
    month: currentMonth.localeDate.month,
    year: currentMonth.localeDate.year
  };

  let monthInfo: DayMonthInfo;

  switch (selectedDay.month) {
    // if selected day is in the current month.
    case 'current':
      monthInfo = {
        longName: currentMonth.longName,
        shortName: currentMonth.shortName
      };

      date.month = currentMonth.date.month;
      date.year = currentMonth.date.year;
      break;
    // if selected day is in the next month.
    case 'next':
      monthInfo = {
        longName: currentMonth.nextMonth.longName,
        shortName: currentMonth.nextMonth.shortName
      };

      localeDate.month = currentMonth.nextMonth.localeDate.month;
      localeDate.year = currentMonth.nextMonth.localeDate.year;
      date.month = currentMonth.nextMonth.date.month;
      date.year = currentMonth.nextMonth.date.year;
      break;
    // if selected day is in the previous month.
    case 'previous':
      monthInfo = {
        longName: currentMonth.previousMonth.longName,
        shortName: currentMonth.previousMonth.shortName
      };

      localeDate.month = currentMonth.previousMonth.localeDate.month;
      localeDate.year = currentMonth.previousMonth.localeDate.year;
      date.month = currentMonth.previousMonth.date.month;
      date.year = currentMonth.previousMonth.date.year;
      break;

    default:
      throw new Error('Selected day has invalid data');
  }

  const dayData: DateInfo = {
    localeDate,
    date,
    daymonthInfo: monthInfo,
    dayInfo
  };

  return Object.seal(dayData);
}

function validValueMaybe(value, notvalue = null) {
  return !value ? notvalue : value;
}

function isNotValid(value, notvalue = false) {
  return validValueMaybe(value, notvalue) === notvalue ? value : notvalue;
}

function hasSameMonth(date1: DateObject, date2: DateObject) {
  return date1.month === date2.month && date1.year === date2.year;
}

function inSameYear(date1: DateObject, date2: DateObject) {
  return date1.year === date2.year;
}

function isMonthGreater(date1: DateObject, date2: DateObject) {
  return date1.year > date2.year || (date1.month < date2.month && date1.year === date2.year) ? date1 : date2;
}

function isEqual(date1: DateObject, date2: DateObject) {
  return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
}

function monthMin(date1: DateObject, date2: DateObject) {
  return date1.year < date2.year || (date1.year === date2.year && date1.month <= date2.month) ? date1 : date2;
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
  return inSameYear(point, month.date) ? validValueMaybe(getDatePos(point, month), notValidRangePoint()) : notValidRangePoint();
}

/**
 * CalendarCore Application Service
 * Manages all application logic and state of the calendar.
 *
 * @constructor
 * @class
 */
class CalendarCore {
  private _specialDays = {};
  private _state: CalendarState = getInitialState();
  private __locked: boolean = false;
  protected _calendarService: CalendarService;
  private subscribers: ((oldState: CalendarState, newState: CalendarState) => void)[] = [];

  constructor() {
    //subclass initializer
    this.init();
  }

  protected init() {}
  /**
   * Reset calendar state
   *
   */
  reset() {
    this.setState(getInitialState());
  }

  /**
   * Selects a day in current month
   *
   * @param {number} weekIndex
   * @param {number} weekDayIndex
   */
  selectDay(weekIndex: number, weekDayIndex: number) {
    if (this._state.rangeSelectionMode === RangeSelection.STARTED) {
      this.completeRangeSelection({ weekIndex, weekDayIndex });
    } else if (this._state.rangeSelectionMode === RangeSelection.IDLE || this._state.rangeSelectionMode === RangeSelection.COMPLETED) {
      this._state.selectedDays.length === 1 && this._state.selectedDaysByIndex[0]['weekIndex'] === weekIndex && this._state.selectedDaysByIndex[0]['weekDayIndex'] === weekDayIndex
        ? this.clearSelection()
        : this.setState({
            rangeSelection: null,
            rangeSelectionMode: RangeSelection.IDLE,
            selectedDays: [getDayData(weekIndex, weekDayIndex, this._state.month)],
            selectedDaysByIndex: [{ weekIndex, weekDayIndex }],
            weekIndex: weekIndex
          });
    }
  }

  /**
   * Removes selection
   *
   */
  clearSelection() {
    // if (this._state.rangeSelection !== null) {
    this.setState({
      rangeSelection: null,
      rangeSelectionMode: RangeSelection.IDLE,
      selectedDaysByIndex: [],
      selectedDays: []
    });
    // }
  }

  /**
   * Returns the selected day state.
   *
   * @private
   * @param {{weekIndex: number, weekDayIndex: number}}
   */
  _selectDay({ weekIndex, weekDayIndex }) {
    return {
      weekIndex,
      selectedDays: [getDayData(weekIndex, weekDayIndex, this._state.month)],
      selectedDaysByIndex: [
        {
          weekIndex: weekIndex,
          weekDayIndex: weekDayIndex
        }
      ]
    };
  }

  /**
   * Returns days which are between range-selection start and end dates.
   *
   * @private
   *
   * @param {{start:Calendar~DateInfoDTO, end:Calendar~DateInfoDTO, state:object}} start
   * @returns {{selectedDays: Array.<Object>, selectedDaysByIndex: Array.<Object>}
   */
  _getRange({ start, end, state = null }) {
    start = start.date;
    end = end.date;

    const days = [];
    const selectedDaysByIndex = [];
    const currentState = state || this._state;
    const currentMonth = currentState.month;
    const currentDate = currentMonth.date;
    const { month, year } = currentDate;
    const startPos = validateRangePoint(start, currentMonth);
    const endPos = validateRangePoint(end, currentMonth);
    let startWeekIndex = startPos.weekIndex,
      endWeekIndex = endPos.weekIndex;
    const currentMonthintheSelection = monthMin(end, currentDate) === currentDate && monthMax(start, currentDate) === currentDate;
    const startInCurrentPage = startPos.weekIndex !== -2;
    const endInCurrentPage = endPos.weekIndex !== -2;
    const areStartorEndinCurrentPage = startInCurrentPage && endInCurrentPage;

    if (currentState.rangeSelectionMode === RangeSelection.COMPLETED || (currentState.rangeSelectionMode === RangeSelection.STARTED && start !== end)) {
      if (currentMonthintheSelection || areStartorEndinCurrentPage) {
        startWeekIndex = startPos.weekIndex;
        endWeekIndex = endPos.weekDayIndex < 0 ? ROWCOUNT : endPos.weekIndex;
      } else if (currentMonthintheSelection && monthMin(end, currentDate) === currentDate && monthMin(start, currentDate) === start) {
        endPos.weekIndex = endWeekIndex = ROWCOUNT;
        endPos.weekDayIndex = COLCOUNT;
      }
    }

    for (let i = startWeekIndex < 0 ? 0 : startWeekIndex; i <= endWeekIndex; i++) {
      let startDayIndex = 0;
      let endDayIndex = COLCOUNT;

      if (startWeekIndex === i) {
        startDayIndex = startPos.weekDayIndex;
      }

      if (endWeekIndex === i && endPos.weekDayIndex >= 0) {
        endDayIndex = endPos.weekDayIndex;
      }

      selectedDaysByIndex.push({ weekIndex: i, weekDayIndexes: [] });
      let weekDayIndexes = selectedDaysByIndex[selectedDaysByIndex.length - 1].weekDayIndexes;

      for (let j = startDayIndex; j <= endDayIndex; j++) {
        days.push(getDayData(i, j, currentState.month));
        weekDayIndexes.push(j);
      }
    }

    return {
      selectedDays: days,
      selectedDaysByIndex: selectedDaysByIndex
    };
  }

  nextWeek() {
    if (this._state.weekIndex + 1 === ROWCOUNT) {
      const state = this._nextMonth();
      state.weekIndex = 0;

      this.setState(state);
    } else {
      this.setState({
        weekIndex: this._state.weekIndex + 1
      });
    }
  }

  /**
   * Changes week status to previous
   *
   */
  prevWeek() {
    if (this._state.weekIndex === 0) {
      const state = this._prevMonth();
      state.weekIndex = ROWCOUNT - 1;

      this.setState(state);
    } else {
      this.setState({
        weekIndex: this._state.weekIndex - 1
      });
    }
  }

  /**
   * Creates range selection
   *
   * @param {object} start
   * @param {object} end
   *
   */
  setRangeSelection(start: DateObject, end: DateObject) {
    const state: Partial<CalendarState> = this._setDate(Object.assign({}, start));
    start = getValidDate(start);
    end = getValidDate(end);
    state.rangeSelection = {
      start: getDateData(start, this._calendarService.getCalendarMonth(start)),
      end: getDateData(end, this._calendarService.getCalendarMonth(end))
    };

    state.rangeSelectionMode = RangeSelection.STARTED;
    Object.assign(
      state,
      this._getRange({
        start: state.rangeSelection.start,
        end: state.rangeSelection.end,
        state
      })
    );

    state.rangeSelectionMode = RangeSelection.COMPLETED;
    this.setState(state);
  }

  /**
   * Activates range selection and changes its status
   *
   * @param {number} weekIndex
   * @param {numer} weekDayIndex
   */
  rangeSelection({ weekIndex, weekDayIndex, date = null }) {
    switch (this._state.rangeSelectionMode) {
      case RangeSelection.IDLE:
        this.startRangeSelection({ weekIndex, weekDayIndex });
        break;
      case RangeSelection.STARTED:
        this.completeRangeSelection({ weekIndex, weekDayIndex });
        break;
      default:
        this.clearSelection();
    }
  }

  /**
   * Activates to start calendar.
   *
   * @param {{weekIndex:(number|null), weekDayIndex:(number|null), date:(null|Calendar~DateDTO|Date)}}
   */
  startRangeSelection({ weekIndex = null, weekDayIndex = null, date = null }) {
    if (this._state.rangeSelectionMode === RangeSelection.IDLE) {
      const requestedDateInfo =
        date !== null &&
        // if date exists then get valid date format
        (date = getValidDate(date))
          ? getDateData(date, this._calendarService.getCalendarMonth(date))
          : getDayData(weekIndex, weekDayIndex, this._state.month);

      const state = { selectedDaysByIndex: [], selectedDays: [] };

      Object.assign(
        state,
        {
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
        (date && this._setDate(Object.assign({}, date || requestedDateInfo.date))) || {},
        this._selectDay((date && this.getWeekDay(date)) || { weekIndex, weekDayIndex })
      );

      this.setState(state);
    }
  }

  /**
   * Completes range selection
   *
   * @param {{weekIndex:(number|null), weekDayIndex:(number|null), date:(null|Calendar~DateDTO|Date)}}
   */
  completeRangeSelection({ weekIndex = null, weekDayIndex = null, date = null }) {
    if (this._state.rangeSelectionMode === RangeSelection.STARTED) {
      const day = date !== null && (date = getValidDate(date)) ? getDateData(date, this._calendarService.getCalendarMonth(date)) : getDayData(weekIndex, weekDayIndex, this._state.month);

      const state = {
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
  }

  /**
   * Adds callback to subscription list
   *
   * @param {function} cb
   */
  subscribe(cb: (oldState: CalendarState, newState: CalendarState) => void) {
    this.subscribers.push(cb);
    return () => this.unsubscribe(cb);
  }

  /**
   * Removes callback from subscription list
   *
   * @param {function} cb
   */
  unsubscribe(cb: (...params: any[]) => void) {
    const unload = this.subscribers.find((_cb) => cb != _cb);
    unload && unload(null, null);
  }

  /**
   * Selects today
   *
   */
  now() {
    this.setSelectedDate(new Date());
  }

  /**
   * Gets week day index of selected date
   *
   * @returns {number}
   */
  getWeekDay(date = null) {
    const month = (date && this._calendarService.getCalendarMonth(getValidDate(date))) || null;
    return date === null ? calculateDatePos(this._state.month.startDayOfMonth, this._state.month.date.day) : calculateDatePos(month.startDayOfMonth, month.date.day);
  }

  /**
   * Gets latest state
   *
   * @returns {Object}
   */
  getState() {
    return this._state;
  }

  /**
   * Returns state to change to next month
   *
   * @private
   *
   */
  _nextMonth() {
    const state = getInitialState();
    if (this._state.month) {
      state.rangeSelection = this._state.rangeSelection;
      state.rangeSelectionMode = this._state.rangeSelectionMode;
      state.selectedDays = this._state.selectedDays;
      state.month = this._calendarService.getCalendarMonth(this._state.month.nextMonth.normalizedDate);

      if (this._state.rangeSelectionMode === RangeSelection.IDLE && this._state.selectedDays.length === 1)
        state.selectedDaysByIndex = [
          getDatePos(this._state.selectedDays[0].date, state.month, {
            weekIndex: -2,
            weekDayIndex: null
          })
        ];

      if (this._state.rangeSelectionMode !== RangeSelection.IDLE) {
        const { start, end } = state.rangeSelection;
        Object.assign(state, this._getRange({ start, end, state }));
      }

      state.weekIndex = (state.selectedDaysByIndex[0] && state.selectedDaysByIndex[0].weekIndex) || 0;
    }

    return state;
  }

  /**
   * Changes calendar current to next month
   *
   */
  nextMonth() {
    this.setState(this._nextMonth());
  }

  /**
   * Updates state
   *
   * @param {Object} state - State object
   */
  setState(state: Partial<CalendarState>) {
    const oldState = this._state;
    const newState = Object.assign({}, this._state, state);
    // console.log(" set state 1 : ", this._state);
    // console.log(" set state 2 : ", state);
    // console.log(" set state 3 : ", newState);
    Object.freeze(newState);
    this._state = newState;
    notify.call(this, oldState, newState);
  }

  /**
   * Returns calendar setDate state
   * @private
   *
   * @param {(Calendar~DateDTO|Date)}
   */
  _setDate(date) {
    let dateObj = getValidDate(date);

    const month = this._calendarService.getCalendarMonth(dateObj);
    const selectedDaysByIndex = getDatePos(dateObj, month, null);

    return {
      month,
      weekIndex: selectedDaysByIndex !== null ? selectedDaysByIndex.weekIndex : 0
    };
  }

  /**
   * Changes current selected month
   *
   * @param {Calendar~DateDTO} date
   */
  setDate(date: DateObject | Date) {
    this.setState(this._setDate(date));
  }

  isTomonth() {
    this._state.month.tomonth;
  }

  /**
   * Changes current selected date
   *
   * @param {Calendar~DateDTO} date
   */
  setSelectedDate(date: DateObject | Date) {
    const validDate = getValidDate(date);
    if (isMonthGreater) this.setState(Object.assign(this._setDate(validDate), this._selectDay(this.getWeekDay(validDate))));
  }

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
  changeCalendar(lang = 'en', type: string = 'gregorian', specialDays = null, firstDayOfWeek = 0) {
    this._specialDays = specialDays || this._specialDays;
    this._calendarService = calendarServiceBuilder({
      lang: lang,
      type: type,
      specialDays: specialDays,
      firstDayOfWeek
    });

    const state = getInitialState();
    state.month = this._calendarService.getCalendarMonth();

    this.setState(state);
  }

  setSpecialDaysService(specialDays: SpecialDaysData) {
    this._calendarService.setSpecialDaysService(specialDays);
    this.setState({
      month: this._calendarService.getCalendarMonth(this._state.month.normalizedDate)
    });
  }

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
  _prevMonth() {
    const state = getInitialState();

    if (this._state.month) {
      state.month = this._calendarService.getCalendarMonth(this._state.month.previousMonth.normalizedDate);
      state.selectedDays = this._state.selectedDays;
      state.rangeSelection = this._state.rangeSelection;
      state.rangeSelectionMode = this._state.rangeSelectionMode;

      if (this._state.rangeSelectionMode === RangeSelection.IDLE && this._state.selectedDays.length === 1)
        state.selectedDaysByIndex = [
          getDatePos(this._state.selectedDays[0].date, state.month, {
            weekIndex: -2,
            weekDayIndex: null
          })
        ];

      if (this._state.rangeSelectionMode !== RangeSelection.IDLE) {
        const { start, end } = state.rangeSelection;
        Object.assign(state, this._getRange({ start, end, state }));
      }

      state.weekIndex = (state.selectedDaysByIndex[0] && state.selectedDaysByIndex[0].weekIndex) || 0;
    }

    return state;
  }

  /**
   * Changes calendar month to previous month
   *
   */
  prevMonth() {
    this.setState(this._prevMonth());
  }
}

export default CalendarCore;
