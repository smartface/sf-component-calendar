(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Context", "@smartface/styler/lib/utils/merge"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Context"), require("@smartface/styler/lib/utils/merge"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Context, global.merge);
    global.StyleContext = mod.exports;
  }
})(this, function (exports, _Context, _merge) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromSFComponent = fromSFComponent;
  exports.fromObject = fromObject;
  exports.fromArray = fromArray;
  exports.makeStylable = makeStylable;
  exports.createStyleContext = createStyleContext;

  var _Context2 = _interopRequireDefault(_Context);

  var _merge2 = _interopRequireDefault(_merge);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * Create styleContext tre from a SF Component and flat component tree to create actors
   * 
   * @params {*} component - a SF Component
   * @params {String} name - component name
   * @params {Function} mapper
   */
  function fromSFComponent(component, name, mapper) {
    var flatted = {};

    function collect(component, name, mapper) {
      var newComp = makeStylable(component, mapper(name), name);
      flat(name, newComp);

      component.children && Object.keys(component.children).forEach(function (child) {
        collect(component.children[child], name + "_" + child, mapper);
      });
    }

    function flat(name, comp) {
      flatted[name] = comp;
    }

    collect(component, name, mapper);

    return createStyleContext(flatted);
  }

  /**
   * Creates context from a hash list
   *
   */
  function fromObject(children, maker, mapper) {
    return Object.keys(children).reduce(function (acc, child) {
      acc[child] = maker(children[child], child, mapper);
      return acc;
    }, {});
  }

  /**
   * Creates context from an array
   *
   */
  function fromArray(children, maker, mapper) {
    return children.map(function (child) {
      return maker(child, mapper);
    });
  }

  function makeStylable(component, className, name) {
    return new (function () {
      function Stylable() {
        _classCallCheck(this, Stylable);

        this.name = name;
        this.initialClassName = className;
        this.classNames = [className];
        this.component = component;
        this.styles;
        this.isUgly = true;
      }

      Stylable.prototype.setStyles = function setStyles(styles) {
        this.styles = styles;
        Object.keys(styles).length && Object.assign(this.component, this.styles);
      };

      Stylable.prototype.setContext = function setContext(context) {
        this.context = context;
        component.setContextDispatcher && component.setContextDispatcher(function (action) {
          this.context.dispatch(action, this.name);
        }.bind(this));
      };

      Stylable.prototype.getStyles = function getStyles() {
        return Object.assign({}, this.styles);
      };

      Stylable.prototype.getInitialClassName = function getInitialClassName() {
        return this.className;
      };

      Stylable.prototype.getClassName = function getClassName() {
        return this.classNames.join(" ");
      };

      Stylable.prototype.classNamesCount = function classNamesCount() {
        return this.classNames.length;
      };

      Stylable.prototype.removeClassName = function removeClassName(className) {
        if (this.hasClassName(className)) {
          this.isUgly = true;
          this.classNames = this.classNames.filter(function (cname) {
            return cname !== className;
          });
        }

        return this.getClassName();
      };

      Stylable.prototype.resetClassNames = function resetClassNames() {
        var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this.classNames = classNames.slice();
        this.isUgly = true;
      };

      Stylable.prototype.hasClassName = function hasClassName(className) {
        return this.classNames.some(function (cname) {
          return cname === className;
        });
      };

      Stylable.prototype.pushClassName = function pushClassName(className) {
        if (!this.hasClassName(className)) {
          this.classNames.push(className);
          this.isUgly = true;
        }

        return this.getClassName();
      };

      Stylable.prototype.addClassName = function addClassName(className, index) {
        if (!this.hasClassName(className)) {
          this.classNames.splice(index, 1, className);
          this.isUgly = true;
        }

        return this.getClassName();
      };

      Stylable.prototype.dispose = function dispose() {
        this.component = null;
        this.context = null;
        this.styles = null;
        this.component.setContextDispatcher && this.component.setContextDispatcher(null);
      };

      return Stylable;
    }())();
  }

  function createStyleContext(actors) {
    var context;

    return function composeContext(styler, reducer) {
      var latestState = context ? context.getState() : {};
      context && context.dispose();

      context = (0, _Context2.default)(actors, function contextUpdater(context, action, target) {
        var state = context.getState(),
            newState = state;

        if (target || action.type == _Context.INIT_CONTEXT_ACTION_TYPE) {
          newState = reducer(state, context.actors, action, target);
          // state is not changed
          if (newState === state) {
            // return current state instance
            return state;
          }
        }

        Object.keys(context.actors).forEach(function setInitialStyles(name) {
          var comp = context.actors[name];

          if (comp.isUgly === true || action.type === _Context.INIT_CONTEXT_ACTION_TYPE) {
            var className = context.actors[name].getClassName();
            var styles = styler(className);

            context.actors[name].setStyles(styles());
            comp.isUgly = false;
          }
        });

        latestState = newState;

        return newState;
      }, latestState);

      Object.keys(context.actors).forEach(function assignContext(name) {
        context.actors[name].isUgly = true;
        context.actors[name].setContext(context);
      });

      return context;
    };
  }
});