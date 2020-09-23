import CalendarWeeklyDesign from 'generated/my-components/CalendarWeekly';
import createContext from './calendarContext';
import CalendarCore, { CalendarState } from 'core/CalendarCore';
import { CalendarPage } from 'services/CalendarService';
import { DateObject } from 'core/DateObject';
import { DateInfo } from 'core/DateInfo';

const themeFile = require("../theme.json");

export default class CalendarWeekly extends CalendarWeeklyDesign {
    pageName?: string | undefined;
    private styleContext = createContext(this, "calendar", themeFile);
    private calendarCore = new CalendarCore();
    private currentMonth: CalendarPage;
    private _state: CalendarState;

    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;

        this.calendarCore.subscribe((oldState, newState) => this._updateCalendar(oldState, newState));
        this.children.navbar.onNext = () => this.nextMonth();
        this.children.navbar.onPrev = () => this.prevMonth();

        this.children.week.onDaySelected = (weekIndex: number, weekDayIndex: number, notify?: boolean) => this.selectDay(weekIndex, weekDayIndex, notify);
    }

    onBeforeMonthChange: null | ((date: DateObject) => boolean) = null;
    onMonthChange: null | ((date: DateObject) => void) = null;
    onDaySelect: null | ((days: DateInfo[]) => void) = null;
    
    /**
     * Changes current to next month
     */
    nextMonth() {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.nextMonth.normalizedDate) === false
        ) {
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

    /**
     * Selects a day by week and day index
     * 
     * @param {number} weekIndex - Calendar row index
     * @param {number} weekDayIndex - Calendar column index
     * @param {bool} notify - If fires selection event or not.
     */
    selectDay(weekIndex: number, weekDayIndex: number, notify: boolean = true) {
        const state = this.calendarCore.getState();
        if (weekIndex === null && state.selectedDaysByIndex.length > 0) {
            this.calendarCore.selectDay(state.selectedDaysByIndex[0].weekIndex, weekDayIndex);
        } else if (weekIndex !== null && weekDayIndex !== null) {
            this.calendarCore.selectDay(weekIndex, weekDayIndex);
        }
        notify && this.onDaySelect && this.onDaySelect(this.calendarCore.getState().selectedDays);
    };

    /**
     * Changes current to previous month
     *
     */
    prevMonth() {
        if (this.onBeforeMonthChange &&
            this.onBeforeMonthChange(this.currentMonth.previousMonth.normalizedDate) === false
        ) {
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

    /**
     * Jumps to the next week. If the week is the last week then jumps to 
     * the next month and its first week.
     *
     */
    nextWeek() {
        this.dispatch({
            type: "resetDays"
        });

        this.calendarCore.nextWeek();
    };

    /**
     * Jumps to the previous week. If the week is the first week then jumps to 
     * the previous month and its last week.
     *
     */
    prevWeek() {
        this.dispatch({
            type: "resetDays"
        });
        this.calendarCore.prevWeek();
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
     */
    changeCalendar(lang = "en", type = "gregorian", specialDays = null) {
        this.dispatch({
            type: "changeCalendar",
            lang: lang
        });

        this.calendarCore.changeCalendar(lang, type, specialDays);
    };

    _setDate(date) {
        this.dispatch({
            type: "resetDays"
        });

        this.calendarCore.setDate(date);
    };


    /**
     * Sets calendar date and highlight the day
     * @param {Calendar~DateDTO} date
     */
    setSelectedDate(date) {
        this.dispatch({
            type: "resetDays"
        });
        this.calendarCore.setSelectedDate(date);
    };

    _selectDay(currentWeek: number, { weekIndex, weekDayIndex }) {
        weekIndex === currentWeek
            && weekIndex >= 0
            && weekDayIndex != null
            && this.children.week.setSelectedIndex(weekDayIndex);
    };

    /**
     * Subscribes to calendar-core and renders calendar when state is changed
     * @private
     * @param {object} oldState
     * @param {object} newState
     */
    _updateCalendar(oldState: CalendarState, newState: CalendarState) {
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
}

