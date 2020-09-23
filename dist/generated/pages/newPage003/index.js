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
//------------------------------------------------------------------------------
//
//     This code was auto generated.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
//
//------------------------------------------------------------------------------
var pageContextPatch_1 = require("@smartface/contx/lib/smartface/pageContextPatch");
var Page = require("sf-core/ui/page");
var System = require("sf-core/device/system");
var Button = require("sf-core/ui/button");
var CalendarWeekly_1 = require("components/CalendarWeekly");
var $NewPage003 = /** @class */ (function (_super) {
    __extends($NewPage003, _super);
    function $NewPage003(props) {
        var _this = _super.call(this, Object.assign({
            onLoad: function () {
                _this.headerBar.title = 'newPage003';
            }
        }, props)) || this;
        _this.children = {};
        _this.children['statusBar'] = _this.statusBar || {};
        _this.children['headerBar'] = _this.headerBar || {};
        _this.addChildByName(new $CalendarWeekly(), 'calendarWeekly');
        _this.addChildByName(new $Prev(), 'prev');
        _this.addChildByName(new $Next(), 'next');
        _this.addChildByName(new $Now(), 'now');
        _this.addChildByName(new $Back(), 'back');
        pageContextPatch_1.default(_this, 'newPage003');
        return _this;
    }
    $NewPage003.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            this.addChild(child);
        }
    };
    $NewPage003.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    Object.defineProperty($NewPage003.prototype, "testId", {
        set: function (value) {
            if (System.OS === 'iOS') {
                this['layout'].nativeObject.setValueForKey(value, 'accessibilityIdentifier');
            }
            else {
                this['layout'].nativeObject.setContentDescription(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    $NewPage003.$$styleContext = {
        classNames: '.page',
        defaultClassNames: ' .default_page',
        userProps: { flexProps: { positionType: 'ABSOLUTE' } },
        statusBar: {
            classNames: '.statusBar',
            defaultClassNames: ' .default_statusBar',
            userProps: {}
        },
        headerBar: {
            classNames: '.headerBar',
            defaultClassNames: ' .default_headerBar',
            userProps: {}
        }
    };
    return $NewPage003;
}(Page));
exports.default = $NewPage003;
var $CalendarWeekly = /** @class */ (function (_super) {
    __extends($CalendarWeekly, _super);
    function $CalendarWeekly() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarWeekly.prototype, "testId", {
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
    $CalendarWeekly.$$styleContext = {
        classNames: '.calendarWeekly',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: {}
    };
    return $CalendarWeekly;
}(CalendarWeekly_1.default));
var $Prev = /** @class */ (function (_super) {
    __extends($Prev, _super);
    function $Prev() {
        return _super.call(this, { text: 'Onceki Hafta' }) || this;
    }
    Object.defineProperty($Prev.prototype, "testId", {
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
    $Prev.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 70, left: 16.666666666666668, top: 138.33333333333334, width: 111.66666666666667 }
    };
    return $Prev;
}(Button));
var $Next = /** @class */ (function (_super) {
    __extends($Next, _super);
    function $Next() {
        return _super.call(this, { text: 'Sonraki Hafta' }) || this;
    }
    Object.defineProperty($Next.prototype, "testId", {
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
    $Next.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 70, left: 248.33333333333334, top: 138.33333333333334, width: 111.66666666666667 }
    };
    return $Next;
}(Button));
var $Now = /** @class */ (function (_super) {
    __extends($Now, _super);
    function $Now() {
        return _super.call(this, { text: 'Bugun' }) || this;
    }
    Object.defineProperty($Now.prototype, "testId", {
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
    $Now.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 70, left: 130.35713721965922, top: 235.77586206896552, width: 111.66666666666667 }
    };
    return $Now;
}(Button));
var $Back = /** @class */ (function (_super) {
    __extends($Back, _super);
    function $Back() {
        return _super.call(this, { text: 'Aylik Takvim' }) || this;
    }
    Object.defineProperty($Back.prototype, "testId", {
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
    $Back.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: { flexProps: { positionType: 'ABSOLUTE' }, left: 66.66666885902143, top: 413.33334034886855 }
    };
    return $Back;
}(Button));
//# sourceMappingURL=index.js.map