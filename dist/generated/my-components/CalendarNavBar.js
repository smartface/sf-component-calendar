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
var Button = require("sf-core/ui/button");
var CalendarNavBar = /** @class */ (function (_super) {
    __extends(CalendarNavBar, _super);
    function CalendarNavBar(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarNavBar$$MonthLabel(), 'monthLabel');
        _this.addChildByName(new $CalendarNavBar$$PrevWeek(), 'prevWeek');
        _this.addChildByName(new $CalendarNavBar$$NextMonth(), 'nextMonth');
        _this.addChildByName(new $CalendarNavBar$$NextWeek(), 'nextWeek');
        _this.addChildByName(new $CalendarNavBar$$PrevMonth(), 'prevMonth');
        return _this;
    }
    CalendarNavBar.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarNavBar.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarNavBar.prototype, "testId", {
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
    CalendarNavBar.$$styleContext = {
        classNames: '.flexLayout',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {
            flexProps: { positionType: 'RELATIVE', flexGrow: 1, flexDirection: 'ROW', flexWrap: 'WRAP' },
            height: 45,
            maxHeight: null,
            minHeight: null,
            paddingBottom: null,
            width: 348
        }
    };
    return CalendarNavBar;
}(FlexLayout));
exports.default = CalendarNavBar;
var $CalendarNavBar$$MonthLabel = /** @class */ (function (_super) {
    __extends($CalendarNavBar$$MonthLabel, _super);
    function $CalendarNavBar$$MonthLabel() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarNavBar$$MonthLabel.prototype, "testId", {
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
    $CalendarNavBar$$MonthLabel.$$styleContext = {
        classNames: '.label .calendar.header_navbar_monthLabel',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            backgroundColor: 'rgba( 255, 255, 255, 0 )',
            bottom: 0,
            flexProps: { flexGrow: null, positionType: 'ABSOLUTE' },
            height: null,
            left: 0,
            marginBottom: null,
            marginLeft: null,
            marginRight: null,
            right: 0,
            textAlignment: 'MIDCENTER',
            top: 0,
            width: null
        }
    };
    return $CalendarNavBar$$MonthLabel;
}(Label));
var $CalendarNavBar$$PrevWeek = /** @class */ (function (_super) {
    __extends($CalendarNavBar$$PrevWeek, _super);
    function $CalendarNavBar$$PrevWeek() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarNavBar$$PrevWeek.prototype, "testId", {
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
    $CalendarNavBar$$PrevWeek.$$styleContext = {
        classNames: '.calendar.header_navbar_arrow',
        defaultClassNames: '.default_common .default_button',
        userProps: { alpha: 1, left: 30, visible: false, width: 30 }
    };
    return $CalendarNavBar$$PrevWeek;
}(Button));
var $CalendarNavBar$$NextMonth = /** @class */ (function (_super) {
    __extends($CalendarNavBar$$NextMonth, _super);
    function $CalendarNavBar$$NextMonth() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarNavBar$$NextMonth.prototype, "testId", {
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
    $CalendarNavBar$$NextMonth.$$styleContext = {
        classNames: '.calendar.header_navbar_arrow',
        defaultClassNames: '.default_common .default_button',
        userProps: { right: 0 }
    };
    return $CalendarNavBar$$NextMonth;
}(Button));
var $CalendarNavBar$$NextWeek = /** @class */ (function (_super) {
    __extends($CalendarNavBar$$NextWeek, _super);
    function $CalendarNavBar$$NextWeek() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarNavBar$$NextWeek.prototype, "testId", {
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
    $CalendarNavBar$$NextWeek.$$styleContext = {
        classNames: '.calendar.header_navbar_arrow',
        defaultClassNames: '.default_common .default_button',
        userProps: { ios: { shadowOpacity: 0 }, right: 30, visible: false, width: 30 }
    };
    return $CalendarNavBar$$NextWeek;
}(Button));
var $CalendarNavBar$$PrevMonth = /** @class */ (function (_super) {
    __extends($CalendarNavBar$$PrevMonth, _super);
    function $CalendarNavBar$$PrevMonth() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarNavBar$$PrevMonth.prototype, "testId", {
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
    $CalendarNavBar$$PrevMonth.$$styleContext = {
        classNames: '.calendar.header_navbar_arrow',
        defaultClassNames: '.default_common .default_button',
        userProps: {}
    };
    return $CalendarNavBar$$PrevMonth;
}(Button));
//# sourceMappingURL=CalendarNavBar.js.map