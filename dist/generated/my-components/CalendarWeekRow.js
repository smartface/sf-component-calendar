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
var CalendarDay_1 = require("components/CalendarDay");
var CalendarWeekRow = /** @class */ (function (_super) {
    __extends(CalendarWeekRow, _super);
    function CalendarWeekRow(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarWeekRow$$WeekDay1(), 'weekDay1');
        _this.addChildByName(new $CalendarWeekRow$$WeekDay2(), 'weekDay2');
        _this.addChildByName(new $CalendarWeekRow$$WeekDay3(), 'weekDay3');
        _this.addChildByName(new $CalendarWeekRow$$WeekDay4(), 'weekDay4');
        _this.addChildByName(new $CalendarWeekRow$$WeekDay5(), 'weekDay5');
        _this.addChildByName(new $CalendarWeekRow$$WeekDay6(), 'weekDay6');
        _this.addChildByName(new $CalendarWeekRow$$WeekDay7(), 'weekDay7');
        _this.addChildByName(new $CalendarWeekRow$$Line(), 'line');
        return _this;
    }
    CalendarWeekRow.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarWeekRow.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarWeekRow.prototype, "testId", {
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
    CalendarWeekRow.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { backgroundColor: 'rgba( 245, 126, 126, 0 )', flexProps: { flexDirection: 'ROW' }, height: 40, width: 355 }
    };
    return CalendarWeekRow;
}(FlexLayout));
exports.default = CalendarWeekRow;
var $CalendarWeekRow$$WeekDay1 = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$WeekDay1, _super);
    function $CalendarWeekRow$$WeekDay1() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$WeekDay1.prototype, "testId", {
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
    $CalendarWeekRow$$WeekDay1.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekRow$$WeekDay1;
}(CalendarDay_1.default));
var $CalendarWeekRow$$WeekDay2 = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$WeekDay2, _super);
    function $CalendarWeekRow$$WeekDay2() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$WeekDay2.prototype, "testId", {
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
    $CalendarWeekRow$$WeekDay2.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekRow$$WeekDay2;
}(CalendarDay_1.default));
var $CalendarWeekRow$$WeekDay3 = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$WeekDay3, _super);
    function $CalendarWeekRow$$WeekDay3() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$WeekDay3.prototype, "testId", {
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
    $CalendarWeekRow$$WeekDay3.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekRow$$WeekDay3;
}(CalendarDay_1.default));
var $CalendarWeekRow$$WeekDay4 = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$WeekDay4, _super);
    function $CalendarWeekRow$$WeekDay4() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$WeekDay4.prototype, "testId", {
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
    $CalendarWeekRow$$WeekDay4.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekRow$$WeekDay4;
}(CalendarDay_1.default));
var $CalendarWeekRow$$WeekDay5 = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$WeekDay5, _super);
    function $CalendarWeekRow$$WeekDay5() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$WeekDay5.prototype, "testId", {
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
    $CalendarWeekRow$$WeekDay5.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekRow$$WeekDay5;
}(CalendarDay_1.default));
var $CalendarWeekRow$$WeekDay6 = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$WeekDay6, _super);
    function $CalendarWeekRow$$WeekDay6() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$WeekDay6.prototype, "testId", {
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
    $CalendarWeekRow$$WeekDay6.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekRow$$WeekDay6;
}(CalendarDay_1.default));
var $CalendarWeekRow$$WeekDay7 = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$WeekDay7, _super);
    function $CalendarWeekRow$$WeekDay7() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$WeekDay7.prototype, "testId", {
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
    $CalendarWeekRow$$WeekDay7.$$styleContext = {
        classNames: '.calendar.day',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekRow$$WeekDay7;
}(CalendarDay_1.default));
var $CalendarWeekRow$$Line = /** @class */ (function (_super) {
    __extends($CalendarWeekRow$$Line, _super);
    function $CalendarWeekRow$$Line() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekRow$$Line.prototype, "testId", {
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
    $CalendarWeekRow$$Line.$$styleContext = {
        classNames: '',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { backgroundColor: 'rgba( 228, 228, 228, 1 )', bottom: 1, flexProps: { positionType: 'ABSOLUTE' }, height: 1, left: 0, right: 0 }
    };
    return $CalendarWeekRow$$Line;
}(FlexLayout));
//# sourceMappingURL=CalendarWeekRow.js.map