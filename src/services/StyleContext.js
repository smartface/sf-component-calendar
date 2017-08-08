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
  function collect(component, name, mapper){
    const hasChildren = !!component.children && Object.keys(component.children).length > 0;
    const newComp = makeStylable(component, mapper(name), name);
    
    const comps = hasChildren
      ? Object.assign(
          fromObject(component.children, collect, mapper), 
          {[name]: newComp}
        )
      : newComp;
    
    // children[name] = newComp;
    return comps;
  }
  
  return createStyleContext(collect(component, name, mapper));
}

export function fromObject(children, maker, mapper){
  return Object.keys(children).reduce((acc, child) => {
    acc[child] = maker(children[child], child, mapper);
    return acc;
  }, {});
}

export function fromArray(children, maker, mapper){
  return children.map((child) => {
    return maker(child, mapper);
  });
}

export function makeStylable(component, className, name){
  var _styles;
  var _context;
  var _className = className;
  
  return new class Stylable {
    setStyles(styles) {
      _styles = styles;
      Object.assign(component, styles);
    }
    
    setContext(context){
      _context = context;
      component.setContextDispatcher(function(action){
        _context.dispatch(action, name);
      })
    }
    
    getStyles(){
      return Object.assign({}, _styles);
    }
    
    getClassName(){
      return _className;
    }
    
    setClassName(className){
      return _className = className;
    }
    
    dispose(){
      component = null;
      _context = null;
      _styles = null;
      component.setContextDispatcher(null);
    }
  };
}

export default function createStyleContext(actors){
  return function changeStyles(styler, reducer){
    const context = createContext(
      actors, 
      function(state, action, target){
        var newState = state;

        if(target){
          newState = reducer(state, action, target);

          if(newState === state){
            return state;
          }
        }
        
        newState = Object.assign({}, state);
        Object.keys(newState.actors).forEach(function(name){
          const className = newState.actors[name].getClassName();
          const styles = styler(className);
          newState.actors[name].setStyles(styles());
        });
        
        return newState;
    });
    
    Object.keys(actors).forEach(function(name){
      actors[name].setContext(context);
    });
    
    return context;
  };
}
