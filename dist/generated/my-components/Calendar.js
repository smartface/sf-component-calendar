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
var CalendarBody_1 = require("components/CalendarBody");
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $Calendar$$Navbar(), 'navbar');
        _this.addChildByName(new $Calendar$$CalendarDays(), 'calendarDays');
        _this.addChildByName(new $Calendar$$Line1(), 'line1');
        _this.addChildByName(new $Calendar$$Line2(), 'line2');
        _this.addChildByName(new $Calendar$$Body(), 'body');
        return _this;
    }
    Calendar.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    Calendar.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(Calendar.prototype, "testId", {
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
    Calendar.$$styleContext = {
        classNames: '.calendar-self',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { height: 300 }
    };
    return Calendar;
}(FlexLayout));
exports.default = Calendar;
var $Calendar$$Navbar = /** @class */ (function (_super) {
    __extends($Calendar$$Navbar, _super);
    function $Calendar$$Navbar() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$Navbar.prototype, "testId", {
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
    $Calendar$$Navbar.$$styleContext = {
        classNames: '.calendar.header_navbar',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { backgroundColor: 'rgba( 255, 255, 255, 1 )' }
    };
    return $Calendar$$Navbar;
}(CalendarNavBar_1.default));
var $Calendar$$CalendarDays = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays, _super);
    function $Calendar$$CalendarDays() {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $Calendar$$CalendarDays$$DayName_0(), 'dayName_0');
        _this.addChildByName(new $Calendar$$CalendarDays$$DayName_1(), 'dayName_1');
        _this.addChildByName(new $Calendar$$CalendarDays$$DayName_2(), 'dayName_2');
        _this.addChildByName(new $Calendar$$CalendarDays$$DayName_3(), 'dayName_3');
        _this.addChildByName(new $Calendar$$CalendarDays$$DayName_4(), 'dayName_4');
        _this.addChildByName(new $Calendar$$CalendarDays$$DayName_5(), 'dayName_5');
        _this.addChildByName(new $Calendar$$CalendarDays$$DayName_6(), 'dayName_6');
        return _this;
    }
    $Calendar$$CalendarDays.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            this.addChild(child);
        }
    };
    Object.defineProperty($Calendar$$CalendarDays.prototype, "testId", {
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
    $Calendar$$CalendarDays.$$styleContext = {
        classNames: '.calendar.header_dayNames',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $Calendar$$CalendarDays;
}(FlexLayout));
var $Calendar$$CalendarDays$$DayName_0 = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays$$DayName_0, _super);
    function $Calendar$$CalendarDays$$DayName_0() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$CalendarDays$$DayName_0.prototype, "testId", {
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
    $Calendar$$CalendarDays$$DayName_0.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $Calendar$$CalendarDays$$DayName_0;
}(Label));
var $Calendar$$CalendarDays$$DayName_1 = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays$$DayName_1, _super);
    function $Calendar$$CalendarDays$$DayName_1() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$CalendarDays$$DayName_1.prototype, "testId", {
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
    $Calendar$$CalendarDays$$DayName_1.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $Calendar$$CalendarDays$$DayName_1;
}(Label));
var $Calendar$$CalendarDays$$DayName_2 = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays$$DayName_2, _super);
    function $Calendar$$CalendarDays$$DayName_2() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$CalendarDays$$DayName_2.prototype, "testId", {
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
    $Calendar$$CalendarDays$$DayName_2.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $Calendar$$CalendarDays$$DayName_2;
}(Label));
var $Calendar$$CalendarDays$$DayName_3 = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays$$DayName_3, _super);
    function $Calendar$$CalendarDays$$DayName_3() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$CalendarDays$$DayName_3.prototype, "testId", {
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
    $Calendar$$CalendarDays$$DayName_3.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $Calendar$$CalendarDays$$DayName_3;
}(Label));
var $Calendar$$CalendarDays$$DayName_4 = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays$$DayName_4, _super);
    function $Calendar$$CalendarDays$$DayName_4() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$CalendarDays$$DayName_4.prototype, "testId", {
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
    $Calendar$$CalendarDays$$DayName_4.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $Calendar$$CalendarDays$$DayName_4;
}(Label));
var $Calendar$$CalendarDays$$DayName_5 = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays$$DayName_5, _super);
    function $Calendar$$CalendarDays$$DayName_5() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$CalendarDays$$DayName_5.prototype, "testId", {
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
    $Calendar$$CalendarDays$$DayName_5.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $Calendar$$CalendarDays$$DayName_5;
}(Label));
var $Calendar$$CalendarDays$$DayName_6 = /** @class */ (function (_super) {
    __extends($Calendar$$CalendarDays$$DayName_6, _super);
    function $Calendar$$CalendarDays$$DayName_6() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$CalendarDays$$DayName_6.prototype, "testId", {
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
    $Calendar$$CalendarDays$$DayName_6.$$styleContext = {
        classNames: '.calendar.header_dayNames_dayName.weekday',
        defaultClassNames: '.default_common .default_label',
        userProps: {}
    };
    return $Calendar$$CalendarDays$$DayName_6;
}(Label));
var $Calendar$$Line1 = /** @class */ (function (_super) {
    __extends($Calendar$$Line1, _super);
    function $Calendar$$Line1() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$Line1.prototype, "testId", {
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
    $Calendar$$Line1.$$styleContext = {
        classNames: '.flexLayout',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { backgroundColor: 'rgba( 228, 228, 228, 1 )', height: 1, width: null }
    };
    return $Calendar$$Line1;
}(FlexLayout));
var $Calendar$$Line2 = /** @class */ (function (_super) {
    __extends($Calendar$$Line2, _super);
    function $Calendar$$Line2() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$Line2.prototype, "testId", {
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
    $Calendar$$Line2.$$styleContext = {
        classNames: '.flexLayout',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { alpha: 1, backgroundColor: 'rgba( 228, 228, 228, 1 )', height: 1, width: null }
    };
    return $Calendar$$Line2;
}(FlexLayout));
var $Calendar$$Body = /** @class */ (function (_super) {
    __extends($Calendar$$Body, _super);
    function $Calendar$$Body() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar$$Body.prototype, "testId", {
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
    $Calendar$$Body.$$styleContext = {
        classNames: '.calendar.body',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $Calendar$$Body;
}(CalendarBody_1.default));
//# sourceMappingURL=Calendar.js.map