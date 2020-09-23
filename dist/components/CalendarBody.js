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
var CalendarBody_1 = require("generated/my-components/CalendarBody");
var CalendarBody = /** @class */ (function (_super) {
    __extends(CalendarBody, _super);
    function CalendarBody(props, pageName) {
        var _this = 
        // Initalizes super class for this scope
        _super.call(this, props) || this;
        _this.componentDidEnter = function (dispatch) {
            this.dispatch = dispatch;
            dispatch({
                type: "changeUserStyle",
                animated: true,
                userStyle: function (style) {
                    style.height = null;
                    style.flexGrow = 0;
                    delete style.alignSelf;
                    return style;
                }
            });
        };
        _this.pageName = pageName;
        return _this;
    }
    return CalendarBody;
}(CalendarBody_1.default));
exports.default = CalendarBody;
//# sourceMappingURL=CalendarBody.js.map