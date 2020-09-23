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
var CalendarDayLabel_1 = require("components/CalendarDayLabel");
var CalendarWeekRowWithLabel = /** @class */ (function (_super) {
    __extends(CalendarWeekRowWithLabel, _super);
    function CalendarWeekRowWithLabel(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel1(), 'weekDayLabel1');
        _this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel2(), 'weekDayLabel2');
        _this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel3(), 'weekDayLabel3');
        _this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel4(), 'weekDayLabel4');
        _this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel5(), 'weekDayLabel5');
        _this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel6(), 'weekDayLabel6');
        _this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel7(), 'weekDayLabel7');
        return _this;
    }
    CalendarWeekRowWithLabel.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarWeekRowWithLabel.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarWeekRowWithLabel.prototype, "testId", {
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
    CalendarWeekRowWithLabel.$$styleContext = {
        classNames: '.flexLayout',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { flexProps: { flexDirection: 'ROW' }, height: 63.28767227799925, paddingLeft: 3, paddingRight: 3, width: 344.6575426075557 }
    };
    return CalendarWeekRowWithLabel;
}(FlexLayout));
exports.default = CalendarWeekRowWithLabel;
var $CalendarWeekRowWithLabel$$WeekDayLabel1 = /** @class */ (function (_super) {
    __extends($CalendarWeekRowWithLabel$$WeekDayLabel1, _super);
    function $CalendarWeekRowWithLabel$$WeekDayLabel1() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekRowWithLabel$$WeekDayLabel1.prototype, "testId", {
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
    $CalendarWeekRowWithLabel$$WeekDayLabel1.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            borderRadius: 18,
            borderWidth: 1,
            flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
            font: { bold: true },
            height: null,
            left: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarWeekRowWithLabel$$WeekDayLabel1;
}(CalendarDayLabel_1.default));
var $CalendarWeekRowWithLabel$$WeekDayLabel2 = /** @class */ (function (_super) {
    __extends($CalendarWeekRowWithLabel$$WeekDayLabel2, _super);
    function $CalendarWeekRowWithLabel$$WeekDayLabel2() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekRowWithLabel$$WeekDayLabel2.prototype, "testId", {
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
    $CalendarWeekRowWithLabel$$WeekDayLabel2.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            borderRadius: 18,
            borderWidth: 1,
            flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
            font: { bold: true },
            height: null,
            left: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarWeekRowWithLabel$$WeekDayLabel2;
}(CalendarDayLabel_1.default));
var $CalendarWeekRowWithLabel$$WeekDayLabel3 = /** @class */ (function (_super) {
    __extends($CalendarWeekRowWithLabel$$WeekDayLabel3, _super);
    function $CalendarWeekRowWithLabel$$WeekDayLabel3() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekRowWithLabel$$WeekDayLabel3.prototype, "testId", {
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
    $CalendarWeekRowWithLabel$$WeekDayLabel3.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            borderRadius: 18,
            borderWidth: 1,
            flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
            font: { bold: true },
            height: null,
            left: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarWeekRowWithLabel$$WeekDayLabel3;
}(CalendarDayLabel_1.default));
var $CalendarWeekRowWithLabel$$WeekDayLabel4 = /** @class */ (function (_super) {
    __extends($CalendarWeekRowWithLabel$$WeekDayLabel4, _super);
    function $CalendarWeekRowWithLabel$$WeekDayLabel4() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekRowWithLabel$$WeekDayLabel4.prototype, "testId", {
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
    $CalendarWeekRowWithLabel$$WeekDayLabel4.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            borderRadius: 18,
            borderWidth: 1,
            flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
            font: { bold: true },
            height: null,
            left: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarWeekRowWithLabel$$WeekDayLabel4;
}(CalendarDayLabel_1.default));
var $CalendarWeekRowWithLabel$$WeekDayLabel5 = /** @class */ (function (_super) {
    __extends($CalendarWeekRowWithLabel$$WeekDayLabel5, _super);
    function $CalendarWeekRowWithLabel$$WeekDayLabel5() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekRowWithLabel$$WeekDayLabel5.prototype, "testId", {
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
    $CalendarWeekRowWithLabel$$WeekDayLabel5.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            borderRadius: 18,
            borderWidth: 1,
            flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
            font: { bold: true },
            height: null,
            left: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarWeekRowWithLabel$$WeekDayLabel5;
}(CalendarDayLabel_1.default));
var $CalendarWeekRowWithLabel$$WeekDayLabel6 = /** @class */ (function (_super) {
    __extends($CalendarWeekRowWithLabel$$WeekDayLabel6, _super);
    function $CalendarWeekRowWithLabel$$WeekDayLabel6() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekRowWithLabel$$WeekDayLabel6.prototype, "testId", {
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
    $CalendarWeekRowWithLabel$$WeekDayLabel6.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            borderRadius: 18,
            borderWidth: 1,
            flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
            font: { bold: true },
            height: null,
            left: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarWeekRowWithLabel$$WeekDayLabel6;
}(CalendarDayLabel_1.default));
var $CalendarWeekRowWithLabel$$WeekDayLabel7 = /** @class */ (function (_super) {
    __extends($CalendarWeekRowWithLabel$$WeekDayLabel7, _super);
    function $CalendarWeekRowWithLabel$$WeekDayLabel7() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekRowWithLabel$$WeekDayLabel7.prototype, "testId", {
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
    $CalendarWeekRowWithLabel$$WeekDayLabel7.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            borderRadius: 18,
            borderWidth: 1,
            flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
            font: { bold: true },
            height: null,
            left: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarWeekRowWithLabel$$WeekDayLabel7;
}(CalendarDayLabel_1.default));
//# sourceMappingURL=CalendarWeekRowWithLabel.js.map