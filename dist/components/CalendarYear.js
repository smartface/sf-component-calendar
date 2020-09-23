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
var CalendarYear_1 = require("generated/my-components/CalendarYear");
var CalendarYear = /** @class */ (function (_super) {
    __extends(CalendarYear, _super);
    function CalendarYear(props, pageName) {
        var _this = 
        // Initalizes super class for this scope
        _super.call(this, props) || this;
        _this.pageName = pageName;
        return _this;
    }
    CalendarYear.prototype.setYear = function (year) {
        this.children.yearLabel.text = year;
    };
    ;
    return CalendarYear;
}(CalendarYear_1.default));
exports.default = CalendarYear;
//# sourceMappingURL=CalendarYear.js.map