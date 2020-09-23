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
var FlexLayout = require("sf-core/ui/flexlayout");
var Button = require("sf-core/ui/button");
var CalendarDay = /** @class */ (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarDay$$DayNum(), 'dayNum');
        return _this;
    }
    CalendarDay.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarDay.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarDay.prototype, "testId", {
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
    CalendarDay.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { height: 63.15789473684211, width: 80.70175438596492 }
    };
    return CalendarDay;
}(FlexLayout));
exports.default = CalendarDay;
var $CalendarDay$$DayNum = /** @class */ (function (_super) {
    __extends($CalendarDay$$DayNum, _super);
    function $CalendarDay$$DayNum() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarDay$$DayNum.prototype, "testId", {
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
    $CalendarDay$$DayNum.$$styleContext = {
        classNames: '.calendar.day_label',
        defaultClassNames: '.default_common .default_button',
        userProps: {}
    };
    return $CalendarDay$$DayNum;
}(Button));
//# sourceMappingURL=CalendarDay.js.map