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

  function hooks(hooksList) {
    return function hookMaybe(hook) {
      return hooksList ? hooksList(hook) : null;
      // ? hooksList[hook] : elseValue;
    };
  }

  /**
   * Create styleContext tree from a SF Component and flat component tree to create actors
   * 
   * @param {Object} component - A sf-core component
   * @param {string} name - component name
   * @param {function} initialClassNameMap - classNames mapping with specified component and children
   * @param {?function} hookList - callback function to capture context's hooks
   * 
   * @return {function} - context helper
   */
  function fromSFComponent(component, name, initialClassNameMap) {
    var hooksList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var flatted = {};

    function collect(component, name, initialClassNameMap) {
      var newComp = makeStylable(component, initialClassNameMap(name), name, hooks(hooksList));
      flat(name, newComp);

      component.children && Object.keys(component.children).forEach(function (child) {
        collect(component.children[child], name + "_" + child, initialClassNameMap);
      });
    }

    function flat(name, comp) {
      flatted[name] = comp;
    }

    collect(component, name, initialClassNameMap);

    return createStyleContext(flatted, hooks(hooksList));
  }

  /**
   * Creates context from a children hash (not tested)
   * 
   * 
   */
  // export function fromObject(children, maker, mapper){
  //   return Object.keys(children).reduce((acc, child) => {
  //     acc[child] = maker(children[child], child, mapper);
  //     return acc;
  //   }, {});
  // }

  /**
   * Creates context from an array
   *
   */
  // export function fromArray(children, maker, mapper){
  //   return children.map((child) => {
  //     return maker(child, mapper);
  //   });
  // }

  /**
   * Styleable Actor HOC. Decorates specifeid component and return an actor component
   * 
   * @param {object} component - A component to decorate
   * @param {string} className - initial className for actor
   * @param {function} hooks - context's hooks dispatcher
   * 
   * @returns {Object} - A Stylable Actor
   */
  function makeStylable(component, className, name, hooks) {
    /**
     * Styable actor
     * @class
     */
    return new (function () {
      function Stylable() {
        _classCallCheck(this, Stylable);

        this.name = name;
        this.initialClassName = className;
        this.classNames = ["#" + name];
        className && this.classNames.push(className);
        this.component = component;
        this.styles = {};
        this.isUgly = true;
      }

      /**
       * Sets styles
       *
       * @param {object} styles - a style object
       */


      Stylable.prototype.setStyles = function setStyles(style) {
        var _this = this;

        var reduceDiffStyleHook = hooks("reduceDiffStyleHook");
        var diffReducer = reduceDiffStyleHook ? reduceDiffStyleHook(this.styles, style) : function (acc, key) {
          if (_this.styles[key] !== undefined) {
            if (_this.styles[key] !== style[key]) {
              acc[key] = style[key];
            } else {
              acc[key] = style[key];
            }
          }

          return acc;
        };

        var diff = Object.keys(style).reduce(diffReducer, {});

        /* global.benchmarkLog && 
           global.benchmarkLog(Object.keys(diff));*/

        var beforeHook = hooks("beforeStyleDiffAssign");
        beforeHook && (diff = beforeHook(diff));

        Object.keys(diff).length && Object.assign(this.component, diff);

        var afterHook = hooks("afterStyleDiffAssign");
        afterHook && (style = afterHook(style));

        this.styles = style;
      };

      Stylable.prototype.setContext = function setContext(context) {
        var _this2 = this;

        this.context = context;
        component.setContextDispatcher && component.setContextDispatcher(function (action) {
          _this2.context.dispatch(action, _this2.name);
        });
      };

      Stylable.prototype.getDefaultClassNames = function getDefaultClassNames() {
        return this.getInitialClassName() ? ["#" + this.name, this.getInitialClassName()] : ["#" + this.name];
      };

      Stylable.prototype.getStyles = function getStyles() {
        return Object.assign({}, this.styles);
      };

      Stylable.prototype.getInitialClassName = function getInitialClassName() {
        return this.initialClassName;
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

        this.classNames = ["#" + this.name].concat(classNames) || this.getDefaultClassNames();
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

  /**
   * Style Context. Returns context composer
   * 
   * @param {Array.<Object>} actors - Actors List
   * @param {function} hooks - Hooks callback
   * @returns {function} - Context Composer Function
   */
  function createStyleContext(actors, hooks) {
    var context;

    /**
     * Composes a context.
     * 
     * @param {function) styling - Styling function from styler.
     * @param {function} reducer - Reducer function to run actions
     */
    return function composeContext(styling, reducer) {
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
            var beforeHook = hooks("beforeAssignComponentStyles");
            beforeHook && (className = beforeHook(name, className));

            var styles = styling(className + " #" + name)();
            context.actors[name].setStyles(styles);
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