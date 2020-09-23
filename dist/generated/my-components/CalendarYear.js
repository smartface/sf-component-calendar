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
var CalendarYear = /** @class */ (function (_super) {
    __extends(CalendarYear, _super);
    function CalendarYear(props) {
        var _this = _super.call(this) || this;
        _this.children = {};
        _this.addChildByName(new $CalendarYear$$YearLabel(), 'yearLabel');
        return _this;
    }
    CalendarYear.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    CalendarYear.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            _super.prototype.addChild.call(this, child);
        }
    };
    Object.defineProperty(CalendarYear.prototype, "testId", {
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
    CalendarYear.$$styleContext = {
        classNames: '.flexLayout',
        defaultClassNames: '.default_common .default_flexLayout',
        userProps: { backgroundColor: 'rgba( 235, 235, 235, 1 )', height: 40, width: 293.42105263157896 }
    };
    return CalendarYear;
}(FlexLayout));
exports.default = CalendarYear;
var $CalendarYear$$YearLabel = /** @class */ (function (_super) {
    __extends($CalendarYear$$YearLabel, _super);
    function $CalendarYear$$YearLabel() {
        return _super.call(this) || this;
    }
    Object.defineProperty($CalendarYear$$YearLabel.prototype, "testId", {
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
    $CalendarYear$$YearLabel.$$styleContext = {
        classNames: '.label',
        defaultClassNames: '.default_common .default_label',
        userProps: {
            backgroundColor: 'rgba( 255, 255, 255, 0 )',
            bottom: 0,
            flexProps: { flexGrow: 1, positionType: 'ABSOLUTE' },
            font: { size: 12 },
            height: null,
            left: 10,
            marginLeft: null,
            marginRight: 10,
            right: null,
            textAlignment: 'MIDLEFT',
            top: 0,
            width: 80
        }
    };
    return $CalendarYear$$YearLabel;
}(Label));
//# sourceMappingURL=CalendarYear.js.map