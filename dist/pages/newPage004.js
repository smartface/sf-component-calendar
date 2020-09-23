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
var newPage004_1 = require("generated/pages/newPage004");
var NewPage004 = /** @class */ (function (_super) {
    __extends(NewPage004, _super);
    function NewPage004() {
        var _this = _super.call(this) || this;
        // Overrides super.onShow method
        _this.onShow = onShow.bind(_this, _this.onShow.bind(_this));
        // Overrides super.onLoad method
        _this.onLoad = onLoad.bind(_this, _this.onLoad.bind(_this));
        return _this;
    }
    return NewPage004;
}(newPage004_1.default));
exports.default = NewPage004;
/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
}
/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
}
//# sourceMappingURL=newPage004.js.map