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
var CalendarWeekRow_1 = require("generated/my-components/CalendarWeekRow");
function selectDay(index) {
    if (index === -1) {
        throw new Error("Day index cannot be -1");
    }
    this.selectedIndex = index;
    this.rangeIndexes = [];
    this.children["weekDay" + (index + 1)].select();
}
function onDayPress(index) {
    this.onDaySelect && this.onDaySelect(index);
}
function selectRange(indexes) {
    var _this = this;
    this.rangeIndexes.push(indexes);
    indexes.forEach(function (index) { return _this.children["weekDay" + (index + 1)].activate(); });
}
function onDayLongPress(index) {
    this.onDayLongPress && this.onDayLongPress(index);
}
function addDaySelectEvent(day, index) {
    day.onPress = onDayPress.bind(this, index);
    day.onLongPress = onDayLongPress.bind(this, index);
}
var CalendarWeekRow = /** @class */ (function (_super) {
    __extends(CalendarWeekRow, _super);
    function CalendarWeekRow(props, pageName) {
        var _this = 
        // Initalizes super class for this scope
        _super.call(this, props) || this;
        _this._available = true;
        _this.isRangeSelection = false;
        _this._days = ["weekDay1", "weekDay2", "weekDay3", "weekDay4", "weekDay5", "weekDay6", "weekDay7"];
        _this.rangeIndexes = [];
        _this.selectedIndex = -1;
        _this._isEmpty = false;
        _this.pageName = pageName;
        _this.init();
        return _this;
    }
    CalendarWeekRow.prototype.setAvailable = function (mode) {
        this._available = mode;
    };
    ;
    CalendarWeekRow.prototype.getAvailable = function () {
        return this._available;
    };
    ;
    CalendarWeekRow.prototype.activateRangeSelection = function () {
        var _this = this;
        this.isRangeSelection = true;
        this._days.forEach(function (day, index) {
            return _this.children[day].onTouch = function () { return _this.onMove && _this.onMove(index); };
        });
    };
    ;
    CalendarWeekRow.prototype.deactivateRangeSelection = function () {
        var _this = this;
        this.isRangeSelection = false;
        this._days.forEach(function (day, index) {
            return _this.children[day].onTouch = null;
        });
    };
    ;
    CalendarWeekRow.prototype.getSelectedIndex = function () {
        return this.selectedIndex;
    };
    ;
    CalendarWeekRow.prototype.isEmpty = function () {
        return this._isEmpty !== false;
    };
    ;
    CalendarWeekRow.prototype.setSelectedIndex = function (index) {
        return selectDay.call(this, index);
    };
    ;
    CalendarWeekRow.prototype.setRangeIndex = function (index) {
        return selectRange.call(this, index);
    };
    ;
    CalendarWeekRow.prototype.isAvailable = function () {
        return this._available && !this._isEmpty;
    };
    ;
    CalendarWeekRow.prototype.clearSelected = function () {
        this.selectedIndex > -1 && this.children["weekDay" + (this.selectedIndex + 1)].clearSelected();
        this.selectedIndex = -1;
        this.rangeIndexes = [];
    };
    ;
    CalendarWeekRow.prototype.init = function () {
        var _this = this;
        this._days.forEach(function (day, index) {
            return addDaySelectEvent.call(_this, _this.children[day], index);
        });
    };
    ;
    CalendarWeekRow.prototype.show = function () {
        this.dispatch({
            type: "changeUserStyle",
            userStyle: function (style) {
                // delete style.height;
                style.height = 40;
                style.visible = true;
                return style;
            }
        });
    };
    ;
    CalendarWeekRow.prototype.hide = function () {
        this.dispatch({
            type: "changeUserStyle",
            userStyle: function (style) {
                style.height = 0;
                style.visible = false;
                return style;
            }
        });
    };
    ;
    CalendarWeekRow.prototype.invalidate = function () {
        var _this = this;
        this.dispatch({
            type: "changeUserStyle",
            userStyle: function (style) {
                _this.isAvailable() ? style.height = 40 : style.height = 0;
                style.visible = _this.isAvailable() === true;
                return style;
            }
        });
    };
    ;
    /*	subscribeContext = function(e){
            Object.assign(this, e.style);
        };*/
    CalendarWeekRow.prototype.setDays = function (days, justCurrentDays, force) {
        var _this = this;
        if (justCurrentDays === void 0) { justCurrentDays = false; }
        if (force === void 0) { force = false; }
        if (!force && (days === undefined || !this._available)) {
            return;
        }
        this._isEmpty = true;
        this._days.forEach(function (day, index) {
            if (justCurrentDays && days[index].month !== "current") {
                _this.children[day].visible = false;
                return;
            }
            else if (days[index].month === "current") {
                _this._isEmpty = false;
            }
            _this.children[day].visible = true;
            _this.children[day].setDay(days[index]);
        });
        this.invalidate();
    };
    ;
    return CalendarWeekRow;
}(CalendarWeekRow_1.default));
exports.default = CalendarWeekRow;
//# sourceMappingURL=CalendarWeekRow.js.map