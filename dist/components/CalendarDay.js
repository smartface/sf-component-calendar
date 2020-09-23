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
var CalendarDay_1 = require("generated/my-components/CalendarDay");
var CalendarDay = /** @class */ (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay(props, pageName) {
        var _this = 
        // Initalizes super class for this scope
        _super.call(this, props) || this;
        _this.pageName = pageName;
        _this.children.dayNum.onTouch = function (e) {
            var timeout;
            var isLongPress = false;
            _this.onPress && _this.onPress.call(_this, e);
            timeout = setTimeout(function () {
                isLongPress = true;
                isLongPress && _this.onLongPress && _this.onLongPress.call(_this, e);
            }, 300);
            _this.children.dayNum.onTouchEnded = function () {
                clearTimeout(timeout);
                _this.children.dayNum.onTouchEnded = function () { };
                // !isLongPress && this.onPress && this.onPress.call(this, e);
                isLongPress = false;
            };
        };
        return _this;
    }
    CalendarDay.prototype.setDay = function (data) {
        this.children.dayNum.text = data.localeDay;
        this.children.dayNum.dispatch({
            type: "updateDayType",
            data: data
        });
    };
    ;
    CalendarDay.prototype.activate = function () {
        this.dispatch({
            type: "pushClassNames",
            classNames: ".calendar.day-selected"
        });
        this.children.dayNum.dispatch({
            type: "pushClassNames",
            classNames: ".calendar.day_label-rangeSelected"
        });
    };
    CalendarDay.prototype.select = function () {
        this.children.dayNum.dispatch({
            type: "daySelected"
        });
    };
    ;
    CalendarDay.prototype.clearSelected = function () {
    };
    ;
    return CalendarDay;
}(CalendarDay_1.default));
exports.default = CalendarDay;
//# sourceMappingURL=CalendarDay.js.map