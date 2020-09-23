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
var System = require("sf-core/device/system");
var Label = require("sf-core/ui/label");
var CalendarDayLabel = /** @class */ (function (_super) {
    __extends(CalendarDayLabel, _super);
    function CalendarDayLabel(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        return _this;
    }
    Object.defineProperty(CalendarDayLabel.prototype, "testId", {
        set: function (value) {
            if (System.OS === 'iOS') {
                this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
            }
            else {
                this.nativeObject.setContentDescription(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarDayLabel.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: { borderRadius: 18, borderWidth: 1, height: 61.66666622819572, width: 58.218390366126755 }
    };
    return CalendarDayLabel;
}(Label));
exports.default = CalendarDayLabel;
//# sourceMappingURL=CalendarDayLabel.js.map