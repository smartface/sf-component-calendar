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
var CalendarWeekNavBar = /** @class */ (function (_super) {
    __extends(CalendarWeekNavBar, _super);
    function CalendarWeekNavBar(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarWeekNavBar$$NextWeek(), 'nextWeek');
        _this.addChildByName(new $CalendarWeekNavBar$$PrevWeek(), 'prevWeek');
        return _this;
    }
    CalendarWeekNavBar.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarWeekNavBar.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarWeekNavBar.prototype, "testId", {
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
    CalendarWeekNavBar.$$styleContext = {
        classNames: '.flexLayout',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {
            flexProps: { positionType: 'RELATIVE', flexGrow: 1, flexDirection: 'ROW', flexWrap: 'WRAP' },
            height: 20,
            maxHeight: null,
            minHeight: null,
            paddingBottom: null,
            width: 285.9375
        }
    };
    return CalendarWeekNavBar;
}(FlexLayout));
exports.default = CalendarWeekNavBar;
var $CalendarWeekNavBar$$NextWeek = /** @class */ (function (_super) {
    __extends($CalendarWeekNavBar$$NextWeek, _super);
    function $CalendarWeekNavBar$$NextWeek() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekNavBar$$NextWeek.prototype, "testId", {
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
    $CalendarWeekNavBar$$NextWeek.$$styleContext = {
        classNames: '.calendar.header_navbar_arrow',
        defaultClassNames: '.default_common .default_button',
        userProps: { font: { size: 16, family: 'FontAwesome5FreeSolid', bold: false, italic: false }, right: 0 }
    };
    return $CalendarWeekNavBar$$NextWeek;
}(Button));
var $CalendarWeekNavBar$$PrevWeek = /** @class */ (function (_super) {
    __extends($CalendarWeekNavBar$$PrevWeek, _super);
    function $CalendarWeekNavBar$$PrevWeek() {
        return _super.call(this, { text: '' }) || this;
    }
    Object.defineProperty($CalendarWeekNavBar$$PrevWeek.prototype, "testId", {
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
    $CalendarWeekNavBar$$PrevWeek.$$styleContext = {
        classNames: '.calendar.header_navbar_arrow',
        defaultClassNames: '.default_common .default_button',
        userProps: { font: { size: 16, family: 'FontAwesome5FreeSolid', bold: false, italic: false } }
    };
    return $CalendarWeekNavBar$$PrevWeek;
}(Button));
//# sourceMappingURL=CalendarWeekNavBar.js.map