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
  exports.contextConnector = contextConnector;
  exports.createInitAction = createInitAction;
  exports.default = createContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var __id = 0;

  function contextConnector(context) {
    return function contextWrapper(component, contextMap) {};
  }

  var INIT_CONTEXT_ACTION_TYPE = exports.INIT_CONTEXT_ACTION_TYPE = '__INIT_CONTEXT__';

  function createInitAction() {
    return {
      type: INIT_CONTEXT_ACTION_TYPE
    };
  }

  function createContext(actors, updater) {
    var state = { actors: actors };

    var Context = function () {
      function Context() {
        _classCallCheck(this, Context);

        // this.__id            = __id++;
        // this._subscribers    = new WeakMap();
        // this._subscriberKeys = new Map();
        updater(state, { type: INIT_CONTEXT_ACTION_TYPE });
      }

      Context.prototype.dispatch = function dispatch(action, target) {
        Object.assign(state, updater(state, action, target));
      };

      Context.prototype.map = function map(fn) {
        return Object.keys(actors).map(function (name, index) {
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