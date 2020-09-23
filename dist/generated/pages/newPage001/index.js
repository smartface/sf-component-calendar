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
var TextView = require("sf-core/ui/textview");
var Button = require("sf-core/ui/button");
var Calendar_1 = require("components/Calendar");
var $NewPage001 = /** @class */ (function (_super) {
    __extends($NewPage001, _super);
    function $NewPage001(props) {
        var _this = _super.call(this, Object.assign({
            onLoad: function () {
                _this.headerBar.title = 'newPage001';
            },
            orientation: Page.Orientation.AUTO
        }, props)) || this;
        _this.children = {};
        _this.ios && (_this.ios.safeAreaLayoutMode = true);
        _this.children['statusBar'] = _this.statusBar || {};
        _this.children['headerBar'] = _this.headerBar || {};
        _this.addChildByName(new $Label2(), 'label2');
        _this.addChildByName(new $Label2_1(), 'label2_1');
        _this.addChildByName(new $Button3(), 'button3');
        _this.addChildByName(new $ButtonTR(), 'buttonTR');
        _this.addChildByName(new $ButtonEN(), 'buttonEN');
        _this.addChildByName(new $ButtonAR(), 'buttonAR');
        _this.addChildByName(new $ButtonHijri(), 'buttonHijri');
        _this.addChildByName(new $ButtonGreg(), 'buttonGreg');
        _this.addChildByName(new $NextPage(), 'nextPage');
        _this.addChildByName(new $ButtonRange(), 'buttonRange');
        _this.addChildByName(new $Calendar(), 'calendar');
        pageContextPatch_1.default(_this, 'newPage001');
        return _this;
    }
    $NewPage001.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            this.addChild(child);
        }
    };
    $NewPage001.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    Object.defineProperty($NewPage001.prototype, "testId", {
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
    $NewPage001.$$styleContext = {
        classNames: '.page',
        defaultClassNames: ' .default_page',
        userProps: { backgroundColor: 'rgba( 163, 163, 163, 1 )' },
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
    return $NewPage001;
}(Page));
exports.default = $NewPage001;
var $Label2 = /** @class */ (function (_super) {
    __extends($Label2, _super);
    function $Label2() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Label2.prototype, "testId", {
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
    $Label2.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_textView',
        userProps: {
            flexProps: { positionType: 'ABSOLUTE' },
            font: { size: 14 },
            height: 35,
            left: 207,
            right: 20,
            textAlignment: 'MIDCENTER',
            top: 465,
            width: 147
        }
    };
    return $Label2;
}(TextView));
var $Label2_1 = /** @class */ (function (_super) {
    __extends($Label2_1, _super);
    function $Label2_1() {
        return _super.call(this, { text: 'Ozel Gunler' }) || this;
    }
    Object.defineProperty($Label2_1.prototype, "testId", {
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
    $Label2_1.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_textView',
        userProps: {
            flexProps: { positionType: 'ABSOLUTE' },
            font: { size: 10 },
            height: 35,
            left: 206,
            right: 20,
            textAlignment: 'MIDCENTER',
            top: 413,
            width: 145
        }
    };
    return $Label2_1;
}(TextView));
var $Button3 = /** @class */ (function (_super) {
    __extends($Button3, _super);
    function $Button3() {
        return _super.call(this, { text: 'Color' }) || this;
    }
    Object.defineProperty($Button3.prototype, "testId", {
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
    $Button3.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            backgroundColor: 'rgba( 208, 2, 27, 1 )',
            flexProps: { positionType: 'ABSOLUTE' },
            height: 37.974683544303794,
            left: 40.506329113924046,
            top: 302.53164556962025,
            width: 64.55696202531645
        }
    };
    return $Button3;
}(Button));
var $ButtonTR = /** @class */ (function (_super) {
    __extends($ButtonTR, _super);
    function $ButtonTR() {
        return _super.call(this, { text: 'TR' }) || this;
    }
    Object.defineProperty($ButtonTR.prototype, "testId", {
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
    $ButtonTR.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            backgroundColor: 'rgba( 208, 2, 27, 1 )',
            borderRadius: 20,
            flexProps: { positionType: 'ABSOLUTE' },
            height: 40,
            left: 20.253164556962023,
            top: 350.63291139240505,
            width: 40
        }
    };
    return $ButtonTR;
}(Button));
var $ButtonEN = /** @class */ (function (_super) {
    __extends($ButtonEN, _super);
    function $ButtonEN() {
        return _super.call(this, { text: 'EN FontAwesome' }) || this;
    }
    Object.defineProperty($ButtonEN.prototype, "testId", {
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
    $ButtonEN.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            backgroundColor: 'rgba( 208, 2, 27, 1 )',
            flexProps: { positionType: 'ABSOLUTE' },
            font: { size: 16, bold: false, italic: false, family: 'AbakuTLSymSans', style: 'n' },
            height: 43.0379746835443,
            left: 116.45569620253164,
            top: 349.3670886075949,
            width: 150.63291139240505
        }
    };
    return $ButtonEN;
}(Button));
var $ButtonAR = /** @class */ (function (_super) {
    __extends($ButtonAR, _super);
    function $ButtonAR() {
        return _super.call(this, { text: 'AR' }) || this;
    }
    Object.defineProperty($ButtonAR.prototype, "testId", {
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
    $ButtonAR.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            backgroundColor: 'rgba( 208, 2, 27, 1 )',
            flexProps: { positionType: 'ABSOLUTE' },
            height: 41.069793701171875,
            left: 287.34177215189874,
            top: 350.63291139240505,
            width: 64.40417641087582
        }
    };
    return $ButtonAR;
}(Button));
var $ButtonHijri = /** @class */ (function (_super) {
    __extends($ButtonHijri, _super);
    function $ButtonHijri() {
        return _super.call(this, { text: 'Hijri' }) || this;
    }
    Object.defineProperty($ButtonHijri.prototype, "testId", {
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
    $ButtonHijri.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            backgroundColor: 'rgba( 126, 211, 33, 1 )',
            flexProps: { positionType: 'ABSOLUTE' },
            height: 34.48275862068966,
            left: 139.6551724137931,
            top: 303.448275862069,
            width: 82.75862068965517
        }
    };
    return $ButtonHijri;
}(Button));
var $ButtonGreg = /** @class */ (function (_super) {
    __extends($ButtonGreg, _super);
    function $ButtonGreg() {
        return _super.call(this, { text: 'Gregoryen' }) || this;
    }
    Object.defineProperty($ButtonGreg.prototype, "testId", {
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
    $ButtonGreg.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            backgroundColor: 'rgba( 74, 144, 226, 1 )',
            flexProps: { positionType: 'ABSOLUTE' },
            height: 39.75400422748766,
            left: 262.0253164556962,
            top: 300,
            width: 86.7725974635074
        }
    };
    return $ButtonGreg;
}(Button));
var $NextPage = /** @class */ (function (_super) {
    __extends($NextPage, _super);
    function $NextPage() {
        return _super.call(this, { text: 'Week Toggle' }) || this;
    }
    Object.defineProperty($NextPage.prototype, "testId", {
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
    $NextPage.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            flexProps: { positionType: 'ABSOLUTE' },
            height: 46.66666666666667,
            left: 20.000000657706426,
            top: 473.33331930226296,
            width: 138.33333333333334
        }
    };
    return $NextPage;
}(Button));
var $ButtonRange = /** @class */ (function (_super) {
    __extends($ButtonRange, _super);
    function $ButtonRange() {
        return _super.call(this, { text: 'Add Range' }) || this;
    }
    Object.defineProperty($ButtonRange.prototype, "testId", {
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
    $ButtonRange.$$styleContext = {
        classNames: '.button',
        defaultClassNames: '.default_common .default_button',
        userProps: {
            flexProps: { positionType: 'ABSOLUTE' },
            height: 51.85185185185185,
            left: 20.000000657706426,
            top: 410.00000526165144,
            width: 135.1851851851852
        }
    };
    return $ButtonRange;
}(Button));
var $Calendar = /** @class */ (function (_super) {
    __extends($Calendar, _super);
    function $Calendar() {
        return _super.call(this) || this;
    }
    Object.defineProperty($Calendar.prototype, "testId", {
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
    $Calendar.$$styleContext = {
        classNames: '.calendar-self',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 300, left: 0, top: 0 }
    };
    return $Calendar;
}(Calendar_1.default));
//# sourceMappingURL=index.js.map