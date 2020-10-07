import CalendarWeekRowDesign from '../generated/my-components/CalendarWeekRow';
import CalendarDay from './CalendarDay';
import { CalendarDayType } from 'services/CalendarDayType';

function onDayPress(index: number) {
    this.onDaySelect && this.onDaySelect(index);
}

function selectRange(indexes) {
    this.rangeIndexes.push(indexes);
    indexes.forEach(index => this.children["weekDay" + (index + 1)].activate());
}

function onDayLongPress(index) {
    this.onDayLongPress && this.onDayLongPress(index);
}

function addDaySelectEvent(day, index) {
    day.onPress = onDayPress.bind(this, index);
    day.onLongPress = onDayLongPress.bind(this, index);
}

export default class CalendarWeekRow extends CalendarWeekRowDesign {
    pageName?: string | undefined;
    private _available: boolean = true;
    private isRangeSelection: boolean = false;
    private _days = ["weekDay1", "weekDay2", "weekDay3", "weekDay4", "weekDay5", "weekDay6", "weekDay7"];
    private rangeIndexes = [];
    private selectedIndex: number = -1;
    private _isEmpty: boolean = false;

    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;

        this.init();
    }

    onMove: null | ((index: number) => void);

    onDayLongPress: null | ((index: number) => void) = null
    onDaySelect: null | ((index: number) => void) = null

    private selectDay(index: number) {
        if (index === -1) {
            throw new Error("Day index cannot be -1");
        }

        this.selectedIndex = index;
        this.rangeIndexes = [];
        // (this.children["weekDay" + (index + 1)] as CalendarDay).select();
    }


    setAvailable(mode) {
        this._available = mode;
    };

    getAvailable() {
        return this._available;
    };

    activateRangeSelection() {
        this.isRangeSelection = true;
        this._days.forEach((day, index) =>
            this.children[day].onTouch = () => this.onMove && this.onMove(index));
    };

    deactivateRangeSelection() {
        this.isRangeSelection = false;
        this._days.forEach((day, index) =>
            this.children[day].onTouch = null);
    };

    getSelectedIndex() {
        return this.selectedIndex;
    };

    isEmpty() {
        return this._isEmpty !== false;
    };

    setSelectedIndex(index: number) {
        return this.selectDay(index);
    };


    setRangeIndex(index) {
        return selectRange.call(this, index);
    };

    isAvailable() {
        return this._available && !this._isEmpty;
    };

    clearSelected() {
        this.selectedIndex > -1 && this.children["weekDay" + (this.selectedIndex + 1)].clearSelected();
        this.selectedIndex = -1;
        this.rangeIndexes = [];
    };

    init() {
        this._days.forEach((day, index) =>
            addDaySelectEvent.call(this, this.children[day], index));
    };

    show() {
        this.dispatch({
            type: "changeUserStyle",
            userStyle: (style) => {

                // delete style.height;
                style.height = 40;
                style.visible = true;

                return style;
            }
        });
    };

    hide() {
        this.dispatch({
            type: "changeUserStyle",
            userStyle: (style) => {
                style.height = 0;
                style.visible = false;

                return style;
            }
        });
    };

    invalidate() {
        this.dispatch({
            type: "changeUserStyle",
            userStyle: (style) => {
                this.isAvailable() ? style.height = 40 : style.height = 0;
                style.visible = this.isAvailable() === true;

                return style;
            }
        });
    };

	/*	subscribeContext = function(e){
			Object.assign(this, e.style);
		};*/

    setDays(days: CalendarDayType, justCurrentDays = false, force = false) {
        if (!force && (days === undefined || !this._available)) {
            return;
        }

        this._isEmpty = true;
        this._days.forEach((day, index) => {
            if (justCurrentDays && days[index].month !== "current") {
                this.children[day].visible = false;
                return;
            } else if (days[index].month === "current") {
                this._isEmpty = false;
            }
            const dayView: CalendarDay = this.children[day];
            dayView.visible = true;
            dayView.setDay(days[index]);
        });

        this.invalidate();
    };
}
