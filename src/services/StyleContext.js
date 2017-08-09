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

export function makeStylable(component, className, name){
  return new class Stylable {
    constructor(){
      this.name = name;
      this.initialClassName = className;
      this.classNames = [className];
      this.component = component;
      this.styles;
      this.isUgly = true;
    }
    
    setStyles(styles) {
      this.styles = styles;
      Object.keys(styles).length && Object.assign(this.component, this.styles);
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
    
    getInitialClassName(){
      return this.className;
    }
    
    getClassName(){
      return this.classNames.join(" ");
    }
    
    removeClassName(className){
      if(this.hasClassName(className)){
        this.isUgly = true;
        this.classNames = this.classNames.filter(function(cname){
          return cname !== className;
        });
      }
      
      return this.getClassName();
    }
    
    resetClassNames(classNames){
      this.isUgly = true;
      this.classNames = classNames.slice();
    }
    
    hasClassName(className){
      return this.classNames.some(function(cname){
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
        } else {
          newState = Object.assign({}, state);
        }
        
        Object.keys(newState.actors).forEach(
          function setInitialStyles(name){
            const comp = newState.actors[name];
            
            if(comp.isUgly === true){
              const className = newState.actors[name].getClassName();
              const styles = styler(className);
              
              newState.actors[name].setStyles(styles());
              comp.isUgly = false;
            }
          });
        
        return newState;
    });
    
    Object.keys(actors).forEach(function assignContext(name){
      actors[name].setContext(context);
    });
    
    return context;
  };
}
