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
var CalendarNavBar_1 = require("generated/my-components/CalendarNavBar");
var CalendarNavBar = /** @class */ (function (_super) {
    __extends(CalendarNavBar, _super);
    function CalendarNavBar(props, pageName) {
        var _this = 
        // Initalizes super class for this scope
        _super.call(this, props) || this;
        _this.pageName = pageName;
        _this.children.nextMonth.onPress = function () {
            _this.onNext();
        };
        _this.children.prevMonth.onPress = function () {
            _this.onPrev();
        };
        return _this;
    }
    CalendarNavBar.prototype.weekMode = function (mode) {
        this.children.prevWeek.dispatch({
            type: "updateUserStyle",
            userStyle: {
                visible: mode
            }
        });
        this.children.nextWeek.dispatch({
            type: "updateUserStyle",
            userStyle: {
                visible: mode
            }
        });
    };
    CalendarNavBar.prototype.setLabel = function (text) {
        this.children.monthLabel.text = text;
    };
    ;
    return CalendarNavBar;
}(CalendarNavBar_1.default));
exports.default = CalendarNavBar;
//# sourceMappingURL=CalendarNavBar.js.map