import createContext from "./Context";
import merge from "@smartface/styler/lib/utils/merge";

/**
 * Create styleContext from a SF Component
 * 
 * @params {*} component - a SF Component
 * @params {String} name - component name
 * @params {Function} mapper
 */
export function fromSFComponent(component, name, mapper){
  const flatted = {};
  
  function collect(component, name, mapper){
    const newComp = makeStylable(component, mapper(name), name);
    flat(name, newComp);

    component.children && Object.keys(component.children).forEach(function(child){
      collect(component.children[child], name+"_"+child, mapper);
    });
  }
  
  function flat(name, comp) {
    flatted[name] = comp
  }
  collect(component, name, mapper)
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

export function makeStylable(component, className, name){
  return new class Stylable {
    constructor(){
      this.name = name;
      this.className = className;
      this.component = component;
      this.styles;
    }
    
    setStyles(styles) {
      this.styles = styles;
      Object.keys(styles).length && Object.assign(this.component, merge({}, this.styles));
    }
    
    setContext(context){
      this.context = context;
      component.setContextDispatcher && 
        component.setContextDispatcher(function(action){
          this.context.dispatch(action, this.name);
        }.bind(this))
    }
    
    getStyles(){
      return Object.assign({}, this.styles);
    }
    
    getClassName(){
      return this.className;
    }
    
    setClassName(className){
      return this.className = className;
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
  return function changeStyles(styler, reducer){
    const context = createContext(
      actors, 
      function contextUpdate(state, action, target){
        var newState = state;

        if(target){
          newState = reducer(state, action, target);

          if(newState === state){
            return state;
          }
        }
        
        newState = Object.assign({}, state);
        Object.keys(newState.actors).forEach(function setInitialStyles(name){
          const className = newState.actors[name].getClassName();
          const styles = styler(className);
          newState.actors[name].setStyles(styles());
        });
        
        return newState;
    });
    
    Object.keys(actors).forEach(function assignContext(name){
      actors[name].setContext(context);
    });
    
    return context;
  };
}
