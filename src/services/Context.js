let __id = 0;

export function contextConnector(context){
  return function contextWrapper(component, contextMap){
  };
}

export const INIT_CONTEXT_ACTION_TYPE = '__INIT_CONTEXT__';

export function createInitAction(){
  return {
    type: INIT_CONTEXT_ACTION_TYPE
  }
}

export default function createContext(actors, updater){
  const state = {actors};
  
  class Context {
    constructor(){
      // this.__id            = __id++;
      // this._subscribers    = new WeakMap();
      // this._subscriberKeys = new Map();
      updater(state, {type: INIT_CONTEXT_ACTION_TYPE});
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
