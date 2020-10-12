/**
 * Smartface Calendar Component
 * @module Calendar
 * @type {class}
 * @copyright Smartface 2018
*/

import CalendarDesign from '../generated/my-components/Calendar';
import CalendarCore, { CalendarState } from '../core/CalendarCore';
import { CalendarPage } from '../services/CalendarService';
import { DateObject } from '../core/DateObject';
import calendarContext from "./calendarContext";
import CalendarWeekRow from './CalendarWeekRow';
import { SpecialDaysData } from '../services/SpecialDaysService';
import CalendarBody from './CalendarBody';
import CalendarNavBar from './CalendarNavBar';

const themeFile = require("../theme.json");

type CalendarOptions = {
    useRangeSelection?: boolean,
    theme?: any,
    justCurrentDays?: boolean,
    calendarCore?: CalendarCore | null,
    useContext?: boolean,
    useDaySelection?: boolean
}
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
class Calendar extends CalendarDesign {
    private _styleContext;
    private _calendarCore = this.options && this.options.calendarCore || new CalendarCore();
    // private _updateCalendar = this._updateCalendar.bind(this);
    private _unsubsciber: (...params: any[]) => void;
    private _weeks: CalendarWeekRow[] = [];
    private _weekMode = false;
    protected currentMonth: CalendarPage;

    constructor(private options?: CalendarOptions | undefined) {
        super();

        const {
            useRangeSelection = true,
            theme = null,
            justCurrentDays = false,
            calendarCore = null,
            useContext = true,
            useDaySelection = true
        } = this.options || {};

        this.options = {
            useRangeSelection,
            useDaySelection,
            justCurrentDays,
            theme,
            calendarCore,
            useContext,
        };
        this._styleContext = useContext ? calendarContext(this, "calendar", theme || themeFile) : null;
        this._unsubsciber = this._calendarCore.subscribe((oldState: CalendarState, newState: CalendarState) => this._updateCalendar(oldState, newState));
        this.children.navbar.onNext = this.nextMonth.bind(this);
        this.children.navbar.onPrev = this.prevMonth.bind(this);

        this._weeks.push(this.children.body.children.week1);
        this._weeks.push(this.children.body.children.week2);
        this._weeks.push(this.children.body.children.week3);
        this._weeks.push(this.children.body.children.week4);
        this._weeks.push(this.children.body.children.week5);
        this._weeks.push(this.children.body.children.week6);

        this._weeks.forEach((row, weekIndex) => {
            row.onDayLongPress = (weekDayIndex) => this._onLongPress(weekIndex, weekDayIndex);
            if (useDaySelection === true) {
                row.onDaySelect = (weekDayIndex) => this.selectDay(weekIndex, weekDayIndex);
            }

            if (useRangeSelection === true) {
                if (useDaySelection === true) {
                    row.onDayLongPress = (weekDayIndex) => {
                        this._onSelectRange(weekIndex, weekDayIndex);
                        this._onLongPress(weekIndex, weekDayIndex);
                    };
                } else {
                    row.onDaySelect = (weekDayIndex) => {
                        this._onSelectRange(weekIndex, weekDayIndex);
                        this._onLongPress(weekIndex, weekDayIndex);
                    };
                }
            }
        });

        this.children.navbar.children.nextWeek.onPress = () => {
            this._calendarCore.nextWeek();
        };
        this.children.navbar.children.prevWeek.onPress = () => {
            this._calendarCore.prevWeek();
        };
    }

    setSpecialDays(specialDays: SpecialDaysData) {
        this._calendarCore.setSpecialDaysService(specialDays);
    }

    /**
     * @event
     * @param {DateInfoDTO} start - Range start date
     */
    onRangeSelectionStart = (start) => { };

    /**
     * @event
     * @param {DateInfoDTO} start - Range start date
     * @param {DateInfoDTO} end - Range end date
     */
    onRangeSelectionComplete = (start, end) => { };
    onDayLongPress = () => { }
    /**
     * @private
     * 
     * @fires onRangeSelectionComplete
     * @fires onRangeSelectionStart
     * @fires onDaySelect
     */
    private _onSelectRange(weekIndex, weekDayIndex) {
        // this.onBeforeRangeSelectStart && this.onBeforeRangeSelectStart(weekIndex, weekDayIndex);
        // this.isRangeSelection !== true && activateRangeSelection.call(this);
        this._calendarCore.rangeSelection({ weekIndex, weekDayIndex });
        const state = this._calendarCore.getState();

        if (state.rangeSelectionMode === 0) {
            this.onRangeSelectionStart
                && this.onRangeSelectionStart(Object.assign({}, state.rangeSelection.start));
        } else if (state.rangeSelectionMode === 1) {
            this.onRangeSelectionComplete
                && this.onRangeSelectionComplete(Object.assign({}, state.rangeSelection.start), Object.assign({}, state.rangeSelection.end));
            this.onDaySelect && this.onDaySelect && this.onDaySelect(this._calendarCore.getState().selectedDays || []);
        }
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
     * @param {SpecialDaysData} [specialDays={}] - Specialdays objects
     * @param {number} [firstDayOfWeek=0] - First day of a week [0...6]
     */
    changeCalendar(lang = "en", type = "gregorian", specialDays: SpecialDaysData = {}, firstDayOfWeek = 0) {
        this.dispatch({
            type: "changeCalendar",
            lang: lang
        });

        this._calendarCore.changeCalendar(lang, type, specialDays, firstDayOfWeek);
    };

    /**
     * Subscribes to calendar-core and renders calendar when state is changed
     * @private
     * @param {object} oldState
     * @param {object} newState
     */
    private _updateCalendar(oldState: CalendarState, newState: CalendarState) {
        // console.log(JSON.stringify(newState, " ", "\t"));
        if ((oldState.rangeSelectionMode === -1 && newState.rangeSelectionMode === 0)
            || (oldState.rangeSelectionMode === 1 && newState.rangeSelectionMode === -1)
        ) {
            this.dispatch({
                type: "deselectDays"
            });
        }

        if (newState.month !== oldState.month) {
            this.dispatch({
                type: "resetDays"
            });

            this.currentMonth = newState.month;
            this.updateRows.call(this, newState.month.days, newState.month.date);
            this.children.navbar.setLabel(newState.month.longName + " " + newState.month.localeDate.year);
            this._weeks.forEach((row, i) => {
                row.invalidate();
            });

        }
        
        newState.selectedDaysByIndex.map(newState.rangeSelectionMode === -1
            ? this._selectDay.bind(this)
            : this._selectDayasRange.bind(this)
        );

        newState.month.daysMin.forEach((day, index) => {
            this.children.calendarDays.children["dayName_" + index].text = day;
        });

        (this.children.body as CalendarBody).setTomonth(newState.month.tomonth);
        (this.children.navbar as CalendarNavBar).setTomonth(newState.month.tomonth);

        this._weekMode ? this.setWeekMode(this._weekMode) : this.children.body.applyLayout();

        this.applyLayout();
    };

    /**
     * Changes Calendar styles
     * 
     * @param {Object} styles - A style object
     */
    addStyles(styles) {
        this._styleContext && this._styleContext(styles);
    };

    private _selectDay({ weekIndex, weekDayIndex }) {
        weekIndex >= 0 && weekDayIndex != null
            && this._weeks[weekIndex].setSelectedIndex(weekDayIndex);
    };

    /**
     * Returns calendar weekmode
     * 
     * @returns {boolean}
     *
     */
    getWeekMode() {
        return this._weekMode;
    };

    /**
     * Displays only a week row
     * 
     * @param {boolean} value
     */
    setWeekMode(value: boolean) {
        this._weekMode = value;
        const weekIndex = this._calendarCore.getState().weekIndex;
        this.children.navbar.weekMode(value);

        this._weeks.forEach((row, i) => {
            const available = !(value && i !== weekIndex);
            row.setAvailable(available);
            row.invalidate();
        });

        this.applyLayout();
    };

    _selectDayasRange({ weekIndex, weekDayIndexes, weekDayIndex }) {
        if (this._weeks[weekIndex] === undefined)
            throw new TypeError(`${weekIndex} Week cannot be undefined`);
        this._weeks[weekIndex].setRangeIndex(
            weekDayIndexes
                ? weekDayIndexes
                : weekDayIndex
                    ? [weekDayIndex]
                    : []
        );
    };

    /**
     * LongPress
     * @event
     * 
     * @param {number} weekIndex
     * @param {number} weekDayIndex
     */
    onLongPress: (weekIndex: number, weekDayIndexes: number) => void = null;

    private _onLongPress = function (weekIndex, weekDayIndexes) {
        this.onLongPress && this.onLongPress(weekIndex, weekDayIndexes);
    };

    /**
     * Sets calendar day without the day selection
     * 
     * @param {DateDTO} date
     */
    setDate(date) {
        this.dispatch({
            type: "deselectDays"
        });
        const newDate = Object.assign({}, date);
        this._calendarCore.setDate(newDate);
    };

    /**
     * Sets range dates
     * 
     * @param {DateObject} start - Start date {@link DateObject}
     * @param {DateObject} end - Final date {@link DateObject}
     */
    setRangeDates(start: DateObject, end: DateObject) {
        this.dispatch({
            type: "deselectDays"
        });
        this._calendarCore.setRangeSelection(start, end);
    };

    /**
     * Sets calendar date and highlight the day
     * @param {DateObject} date {@link DateObject}
     */
    setSelectedDate(date: DateObject | Date) {
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

    /**
     * Disposes the Component instance
     */
    dispose() {
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

    /**
     * @event
     * @param {DateDTO} date
     */
    onBeforeMonthChange = (date: DateObject<number | string>) => {
        return true;
    };

    /**
     * @event
     * @params {DateDtO} date
     */
    onMonthChange = (date) => { };

    /**
     * Changes current to next month
     * 
     * @fires onBeforeMonthChange
     * @fires onMonthChange
     */
    nextMonth() {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.nextMonth.normalizedDate) === false
        ) {
            return;
        }

        if (this.currentMonth) {
            this._calendarCore.nextMonth();
            this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
        }
    };

    /**
     * Changes selected date to now
     */
    now() {
        this._calendarCore.now();
    };

    /**
     * Changes current to previous month
     * @fires onBeforeMonthChange
     * @fires onMonthChange
     */
    prevMonth() {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.previousMonth.normalizedDate) === false
        ) {
            return;
        }

        if (this.currentMonth) {
            this._calendarCore.prevMonth();
            this.onMonthChange && this.onMonthChange(this.currentMonth.normalizedDate);
        }
    };

    /**
     * @event
     * @param {Array.<DateInfoDTO>} date - Selected date
     */
    onDaySelect = (date) => { };

    /**
     * Selects a day by week and day index
     * 
     * @fires onDaySelect
     * @param {number} weekIndex - Calendar row index
     * @param {number} weekDayIndex - Calendar column index
     * @param {boolean} [notify=true] - If fires selection event or not.
     */
    selectDay(weekIndex: number, weekDayIndex: number, notify = true) {
        this._calendarCore.selectDay(weekIndex, weekDayIndex);
        // this._calendarCore.getState().selectedDays.length > 0
        notify && this.onDaySelect && this.onDaySelect(this._calendarCore.getState().selectedDays || []);
    };

    private updateRows(days, date) {
        this._weeks.forEach((row, index) => {
            row.setDays(days[index], this.options.justCurrentDays, true);
        });
    }
}

export default Calendar;