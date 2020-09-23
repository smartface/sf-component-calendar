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
function componentAddChildPatch(klass) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.children = {};
            return _this;
        }
        class_1.prototype.addChildByName = function (name, child) {
            this.children[name] = child;
            if (this.layout) {
                this.layout.addChild(child);
            }
            else if (this.addChild) {
                this.addChild(child);
            }
        };
        return class_1;
    }(klass));
}
exports.componentAddChildPatch = componentAddChildPatch;
//# sourceMappingURL=componentAddChildPatch.js.map