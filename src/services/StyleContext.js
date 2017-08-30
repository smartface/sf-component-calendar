import createContext, { INIT_CONTEXT_ACTION_TYPE } from "./Context";
import merge from "@smartface/styler/lib/utils/merge";

function hooks(hooksList){
  return function hookMaybe(hook){
    return hooksList(hook);
    // ? hooksList[hook] : elseValue;
  };
}

/**
 * Create styleContext tre from a SF Component and flat component tree to create actors
 * 
 * @params {*} component - a SF Component
 * @params {String} name - component name
 * @params {Function} mapper
 */
export function fromSFComponent(component, name, mapper, hooksList={}){
  const flatted = {};
  
  function collect(component, name, mapper){
    const newComp = makeStylable(component, mapper(name), name, hooks(hooksList));
    flat(name, newComp);

    component.children && Object.keys(component.children).forEach((child) => {
      collect(component.children[child], name+"_"+child, mapper);
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
export function fromObject(children, maker, mapper){
  return Object.keys(children).reduce((acc, child) => {
    acc[child] = maker(children[child], child, mapper);
    return acc;
  }, {});
}

/**
 * Creates context from an array
 *
 */
export function fromArray(children, maker, mapper){
  return children.map((child) => {
    return maker(child, mapper);
  });
}

export function makeStylable(component, className, name, hooks){
  return new class Stylable {
    constructor(){
      this.name = name;
      this.initialClassName = className;
      this.classNames = [className];
      this.component = component;
      this.styles = {};
      this.isUgly = true;
    }
    
    setStyles(styles) {
    //   const diffReducer = hooks_(
    //     "reduceDiffStyleHook",
    //     _ => (acc, key) => {
    //       if(this.styles[key] !== undefined) {
    //         if(this.styles[key] !== styles[key]) {
    //           acc[key] = styles[key];
    //         } else {
    //           acc[key] = styles[key];
    //         }
    //       }
          
    //       return acc;
    //     })(this.styles, styles);
    //   // let diffReducer = reduceDiffStyleHook();
      
    //   let diff = Object.keys(styles).reduce(diffReducer, {});

    // /* global.benchmarkLog && 
    //     global.benchmarkLog(Object.keys(diff));*/
      
    //   diff = hooks_("beforeStyleDiffAssign", _=>_)(diff);
      
    //   Object.keys(diff).length && 
    //     Object.assign(this.component, diff);
      
    //   styles = hooks_("afterStyleDiffAssign", _=>_)(styles);
      const reduceDiffStyleHook = hooks("reduceDiffStyleHook");
      let diffReducer = reduceDiffStyleHook
        ? reduceDiffStyleHook(this.styles, styles)
        : (acc, key) => {
            if(this.styles[key] !== undefined) {
              if(this.styles[key] !== styles[key]) {
                acc[key] = styles[key];
              } else {
                acc[key] = styles[key];
              }
            }
            
            return acc;
          };
      
      let diff = Object.keys(styles).reduce(diffReducer, {});
      
     /* global.benchmarkLog && 
        global.benchmarkLog(Object.keys(diff));*/
      
      const beforeHook = hooks("beforeStyleDiffAssign");
      beforeHook && 
        (diff = beforeHook(diff));
      
      Object.keys(diff).length && 
        Object.assign(this.component, diff);
      
      const afterHook = hooks("afterStyleDiffAssign");
      afterHook && (styles = afterHook(styles));
      
      
      this.styles = styles;
    }
    
    setContext(context){
      this.context = context;
      component.setContextDispatcher && 
        component.setContextDispatcher((action) => {
          this.context.dispatch(action, this.name);
        });
    }
    
    getStyles(){
      return Object.assign({}, this.styles);
    }
    
    getInitialClassName(){
      return this.className;
    }
    
    getClassName(){
      return this.classNames.join(" ");
    }
    
    classNamesCount(){
      return this.classNames.length;
    }
    
    removeClassName(className){
      if(this.hasClassName(className)){
        this.isUgly = true;
        this.classNames = this.classNames.filter((cname) => {
          return cname !== className;
        });
      }
      
      return this.getClassName();
    }
    
    resetClassNames(classNames=[]){
      this.classNames = classNames.slice();
      this.isUgly = true;
    }
    
    hasClassName(className){
      return this.classNames.some((cname) => {
        return cname === className;
      })
    }
    
    pushClassName(className){
      if(!this.hasClassName(className)){
        this.classNames.push(className);
        this.isUgly = true;
      }
      
      return this.getClassName();
    }
    
    addClassName(className, index){
      if(!this.hasClassName(className)){
        this.classNames.splice(index, 1, className);
        this.isUgly = true;
      }
      
      return this.getClassName();
    }
    
    dispose(){
      this.component = null;
      this.context = null;
      this.styles = null;
      this.component.setContextDispatcher && 
        this.component.setContextDispatcher(null);
    }
  };
}

export function createStyleContext(actors){
  var context;

  return function composeContext(styler, reducer, filters){
    var latestState = context ? context.getState() : {};
    context && context.dispose();
    
    context = createContext(
      actors, 
      function contextUpdater(context, action, target){
        var state = context.getState(), newState = state;

        if(target || action.type == INIT_CONTEXT_ACTION_TYPE){
          newState = reducer(state, context.actors, action, target);
          // state is not changed
          if(newState === state){
            // return current state instance
            return state;
          }
        }
        
        Object.keys(context.actors).forEach(
          function setInitialStyles(name){
            const comp = context.actors[name];
            
            if(comp.isUgly === true || action.type === INIT_CONTEXT_ACTION_TYPE){
              const className = context.actors[name].getClassName();
              const styles = styler(className+" #"+name)();
              context.actors[name].setStyles(styles);
              comp.isUgly = false;
            }
          });
        
        latestState = newState;
        
        return newState;
      },
      latestState
    );
    
    Object.keys(context.actors).forEach(function assignContext(name){
      context.actors[name].isUgly = true;
      context.actors[name].setContext(context);
    });
    
    return context;
  };
}
