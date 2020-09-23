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
var $NewPage004 = /** @class */ (function (_super) {
    __extends($NewPage004, _super);
    function $NewPage004(props) {
        var _this = _super.call(this, Object.assign({
            onLoad: function () {
                _this.headerBar.title = 'newPage004';
            }
        }, props)) || this;
        _this.children = {};
        _this.children['statusBar'] = _this.statusBar || {};
        _this.children['headerBar'] = _this.headerBar || {};
        pageContextPatch_1.default(_this, 'newPage004');
        return _this;
    }
    $NewPage004.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
        if (this['layout']) {
            this['layout'].addChild(child);
        }
        else {
            this.addChild(child);
        }
    };
    $NewPage004.prototype.addChildByName = function (child, name) {
        this.children[name] = child;
        this.addChild(child);
    };
    Object.defineProperty($NewPage004.prototype, "testId", {
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
    $NewPage004.$$styleContext = {
        classNames: '.sf-page',
        defaultClassNames: ' .default_page',
        userProps: {},
        statusBar: {
            classNames: '.sf-statusBar',
            defaultClassNames: ' .default_statusBar',
            userProps: {}
        },
        headerBar: {
            classNames: '.sf-headerBar',
            defaultClassNames: ' .default_headerBar',
            userProps: {}
        }
    };
    return $NewPage004;
}(Page));
exports.default = $NewPage004;
//# sourceMappingURL=index.js.map