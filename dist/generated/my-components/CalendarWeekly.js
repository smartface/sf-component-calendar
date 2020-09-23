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
var Label = require("sf-core/ui/label");
var CalendarNavBar_1 = require("components/CalendarNavBar");
var CalendarWeekRow_1 = require("components/CalendarWeekRow");
var CalendarWeekly = /** @class */ (function (_super) {
    __extends(CalendarWeekly, _super);
    function CalendarWeekly(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarWeekly$$Navbar(), 'navbar');
        _this.addChildByName(new $CalendarWeekly$$CalendarDays(), 'calendarDays');
        _this.addChildByName(new $CalendarWeekly$$Week(), 'week');
        return _this;
    }
    CalendarWeekly.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarWeekly.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarWeekly.prototype, "testId", {
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
    CalendarWeekly.$$styleContext = {
        classNames: '.calendarWeekly',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return CalendarWeekly;
}(FlexLayout));
exports.default = CalendarWeekly;
var $CalendarWeekly$$Navbar = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$Navbar, _super);
    function $CalendarWeekly$$Navbar() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$Navbar.prototype, "testId", {
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
    $CalendarWeekly$$Navbar.$$styleContext = {
        classNames: ' .calendar.header_navbar',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekly$$Navbar;
}(CalendarNavBar_1.default));
var $CalendarWeekly$$CalendarDays = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays, _super);
    function $CalendarWeekly$$CalendarDays() {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarWeekly$$CalendarDays$$DayName_0(), 'dayName_0');
        _this.addChildByName(new $CalendarWeekly$$CalendarDays$$DayName_1(), 'dayName_1');
        _this.addChildByName(new $CalendarWeekly$$CalendarDays$$DayName_2(), 'dayName_2');
        _this.addChildByName(new $CalendarWeekly$$CalendarDays$$DayName_3(), 'dayName_3');
        _this.addChildByName(new $CalendarWeekly$$CalendarDays$$DayName_4(), 'dayName_4');
        _this.addChildByName(new $CalendarWeekly$$CalendarDays$$DayName_5(), 'dayName_5');
        _this.addChildByName(new $CalendarWeekly$$CalendarDays$$DayName_6(), 'dayName_6');
        return _this;
    }
    $CalendarWeekly$$CalendarDays.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            this.addChild(child);
        }
    };
    Object.defineProperty($CalendarWeekly$$CalendarDays.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays.$$styleContext = {
        classNames: '.calendar.header_dayNames',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays;
}(FlexLayout));
var $CalendarWeekly$$CalendarDays$$DayName_0 = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays$$DayName_0, _super);
    function $CalendarWeekly$$CalendarDays$$DayName_0() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$CalendarDays$$DayName_0.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays$$DayName_0.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays$$DayName_0;
}(Label));
var $CalendarWeekly$$CalendarDays$$DayName_1 = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays$$DayName_1, _super);
    function $CalendarWeekly$$CalendarDays$$DayName_1() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$CalendarDays$$DayName_1.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays$$DayName_1.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays$$DayName_1;
}(Label));
var $CalendarWeekly$$CalendarDays$$DayName_2 = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays$$DayName_2, _super);
    function $CalendarWeekly$$CalendarDays$$DayName_2() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$CalendarDays$$DayName_2.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays$$DayName_2.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays$$DayName_2;
}(Label));
var $CalendarWeekly$$CalendarDays$$DayName_3 = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays$$DayName_3, _super);
    function $CalendarWeekly$$CalendarDays$$DayName_3() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$CalendarDays$$DayName_3.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays$$DayName_3.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays$$DayName_3;
}(Label));
var $CalendarWeekly$$CalendarDays$$DayName_4 = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays$$DayName_4, _super);
    function $CalendarWeekly$$CalendarDays$$DayName_4() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$CalendarDays$$DayName_4.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays$$DayName_4.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays$$DayName_4;
}(Label));
var $CalendarWeekly$$CalendarDays$$DayName_5 = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays$$DayName_5, _super);
    function $CalendarWeekly$$CalendarDays$$DayName_5() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$CalendarDays$$DayName_5.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays$$DayName_5.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays$$DayName_5;
}(Label));
var $CalendarWeekly$$CalendarDays$$DayName_6 = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$CalendarDays$$DayName_6, _super);
    function $CalendarWeekly$$CalendarDays$$DayName_6() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$CalendarDays$$DayName_6.prototype, "testId", {
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
    $CalendarWeekly$$CalendarDays$$DayName_6.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $CalendarWeekly$$CalendarDays$$DayName_6;
}(Label));
var $CalendarWeekly$$Week = /** @class */ (function (_super) {
    __extends($CalendarWeekly$$Week, _super);
    function $CalendarWeekly$$Week() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly$$Week.prototype, "testId", {
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
    $CalendarWeekly$$Week.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekly$$Week;
}(CalendarWeekRow_1.default));
//# sourceMappingURL=CalendarWeekly.js.map