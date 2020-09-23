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
var CalendarWeekRowWithLabel_1 = require("generated/my-components/CalendarWeekRowWithLabel");
var CalendarWeekRowWithLabel = /** @class */ (function (_super) {
    __extends(CalendarWeekRowWithLabel, _super);
    function CalendarWeekRowWithLabel(props, pageName) {
        var _this = 
        // Initalizes super class for this scope
        _super.call(this, props) || this;
        _this.pageName = pageName;
        return _this;
    }
    return CalendarWeekRowWithLabel;
}(CalendarWeekRowWithLabel_1.default));
exports.default = CalendarWeekRowWithLabel;
//# sourceMappingURL=CalendarWeekRowWithLabel.js.map