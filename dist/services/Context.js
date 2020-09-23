"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __id = 0;
function addMiddleware(mware) {
}
exports.INIT_CONTEXT_ACTION_TYPE = '__INIT_CONTEXT__';
function createInitAction() {
    return {
        type: exports.INIT_CONTEXT_ACTION_TYPE
    };
}
exports.createInitAction = createInitAction;
function createContext(actors, updater, middlewares, initialState) {
    if (initialState === void 0) { initialState = {}; }
    var Context = /** @class */ (function () {
        function Context() {
            var _this = this;
            this.setState = function (state) {
                _this.state = Object.assign({}, state);
            };
            this.getState = function () {
                return Object.assign({}, _this.state);
            };
            this.dispose = function () {
                _this.state = null;
                _this.actors = null;
            };
            // this.__id            = __id++;
            // this._subscribers    = new WeakMap();
            // this._subscriberKeys = new Map();
            this.actors = Object.assign({}, actors);
            this.state = Object.assign({}, initialState);
            // this.dispatch = this.dispatch.bind(this);
            // this.setState = this.setState.bind(this);
            // this.getState = tbbbbbbbbbhis.getState.bind(this);
            this.dispatch({ type: exports.INIT_CONTEXT_ACTION_TYPE });
        }
        Context.prototype.dispatch = function (action, target) {
            this.setState(updater(this, action, target));
        };
        Context.prototype.map = function (fn) {
            return Object.keys(this.actors).map(function (name, index) { return fn(actors[name], name, index); });
        };
        Context.prototype.subcribe = function (fn) {
        };
        return Context;
    }());
    ;
    return new Context();
}
exports.default = createContext;
//# sourceMappingURL=Context.js.map