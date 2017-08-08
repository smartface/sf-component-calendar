(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
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
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.contextConnector = contextConnector;
  exports.createContext = createContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var __id = 0;

  function contextConnector(context) {
    return function contextWrapper(component, contextMap) {};
  }

  function createContext(actors, variables) {
    return new (function () {
      function Context() {
        _classCallCheck(this, Context);

        /*s
          this._unsubcribe = store.subscribe((state) => {
            this.propagateAll();
          });
        */

        this.__id = __id++;
        this._subscribers = new WeakMap();
        this._subscriberKeys = new Map();
      }

      Context.prototype.dispatch = function dispatch(action) {};

      Context.prototype.map = function map(fn) {};

      Context.prototype.subcribe = function subcribe(fn) {};

      return Context;
    }())();
  }
});