(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Context = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createInitAction = createInitAction;
  exports.default = createContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var __id = 0;

  var INIT_CONTEXT_ACTION_TYPE = exports.INIT_CONTEXT_ACTION_TYPE = '__INIT_CONTEXT__';

  function createInitAction() {
    return {
      type: INIT_CONTEXT_ACTION_TYPE
    };
  }

  function createContext(actors, updater) {
    var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var Context = function () {
      function Context() {
        var _this = this;

        _classCallCheck(this, Context);

        this.setState = function (state) {
          _this.state = Object.assign({}, state);
        };

        this.getState = function () {
          return Object.assign({}, _this.state);
        };

        this.dispatch = function (action, target) {
          _this.setState(updater(_this, action, target));
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
        // this.getState = this.getState.bind(this);

        this.dispatch({ type: INIT_CONTEXT_ACTION_TYPE });
      }

      Context.prototype.map = function map(fn) {
        return Object.keys(this.actors).map(function (name, index) {
          return fn(actors[name], name, index);
        });
      };

      Context.prototype.subcribe = function subcribe(fn) {};

      return Context;
    }();

    ;

    return new Context();
  }
});