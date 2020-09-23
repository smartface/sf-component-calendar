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
var CalendarWeekRow_1 = require("components/CalendarWeekRow");
var CalendarBody = /** @class */ (function (_super) {
    __extends(CalendarBody, _super);
    function CalendarBody(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarBody$$Week1(), 'week1');
        _this.addChildByName(new $CalendarBody$$Week2(), 'week2');
        _this.addChildByName(new $CalendarBody$$Week3(), 'week3');
        _this.addChildByName(new $CalendarBody$$Week4(), 'week4');
        _this.addChildByName(new $CalendarBody$$Week5(), 'week5');
        _this.addChildByName(new $CalendarBody$$Week6(), 'week6');
        return _this;
    }
    CalendarBody.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarBody.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarBody.prototype, "testId", {
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
    CalendarBody.$$styleContext = {
        classNames: '',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { height: 247.3684210526316, width: 356.140350877193 }
    };
    return CalendarBody;
}(FlexLayout));
exports.default = CalendarBody;
var $CalendarBody$$Week1 = /** @class */ (function (_super) {
    __extends($CalendarBody$$Week1, _super);
    function $CalendarBody$$Week1() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarBody$$Week1.prototype, "testId", {
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
    $CalendarBody$$Week1.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarBody$$Week1;
}(CalendarWeekRow_1.default));
var $CalendarBody$$Week2 = /** @class */ (function (_super) {
    __extends($CalendarBody$$Week2, _super);
    function $CalendarBody$$Week2() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarBody$$Week2.prototype, "testId", {
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
    $CalendarBody$$Week2.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarBody$$Week2;
}(CalendarWeekRow_1.default));
var $CalendarBody$$Week3 = /** @class */ (function (_super) {
    __extends($CalendarBody$$Week3, _super);
    function $CalendarBody$$Week3() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarBody$$Week3.prototype, "testId", {
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
    $CalendarBody$$Week3.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarBody$$Week3;
}(CalendarWeekRow_1.default));
var $CalendarBody$$Week4 = /** @class */ (function (_super) {
    __extends($CalendarBody$$Week4, _super);
    function $CalendarBody$$Week4() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarBody$$Week4.prototype, "testId", {
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
    $CalendarBody$$Week4.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarBody$$Week4;
}(CalendarWeekRow_1.default));
var $CalendarBody$$Week5 = /** @class */ (function (_super) {
    __extends($CalendarBody$$Week5, _super);
    function $CalendarBody$$Week5() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarBody$$Week5.prototype, "testId", {
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
    $CalendarBody$$Week5.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarBody$$Week5;
}(CalendarWeekRow_1.default));
var $CalendarBody$$Week6 = /** @class */ (function (_super) {
    __extends($CalendarBody$$Week6, _super);
    function $CalendarBody$$Week6() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarBody$$Week6.prototype, "testId", {
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
    $CalendarBody$$Week6.$$styleContext = {
        classNames: '.calendar.weekRow',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarBody$$Week6;
}(CalendarWeekRow_1.default));
//# sourceMappingURL=CalendarBody.js.map