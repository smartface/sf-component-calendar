let __id = 0;

export function contextConnector(context){
  return function contextWrapper(component, contextMap){
  };
}

export default function createContext(actors, updater){
  const state = {actors};
  
  class Context {
    constructor(){
      // this.__id            = __id++;
      // this._subscribers    = new WeakMap();
      // this._subscriberKeys = new Map();
      updater(state);
    }
    
    dispatch(action, target){
      Object.assign(state, updater(state, action, target));
    }
    
    map(fn){
      return Object.keys(actors).map((name,index) => fn(actors[name], name, index));
    }
    
    subcribe(fn){
    }
  };
  
  return new Context();
}
