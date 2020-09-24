import { INIT_CONTEXT_ACTION_TYPE } from "./constants";

let __id = 0;

function addMiddleware(mware) {

}

export function createContext(actors, updater, middlewares, initialState = {}) {
    class Context {
        private actors: any;
        private state: any;
        constructor() {
            // this.__id            = __id++;
            // this._subscribers    = new WeakMap();
            // this._subscriberKeys = new Map();
            this.actors = Object.assign({}, actors);
            this.state = Object.assign({}, initialState);
            // this.dispatch = this.dispatch.bind(this);
            // this.setState = this.setState.bind(this);
            // this.getState = tbbbbbbbbbhis.getState.bind(this);

            this.dispatch({ type: INIT_CONTEXT_ACTION_TYPE });
        }

        setState = (state) => {
            this.state = Object.assign({}, state);
        }

        getState = () => {
            return Object.assign({}, this.state);
        }

        dispatch(action, target?: any) {
            this.setState(updater(this, action, target));
        }

        dispose = () => {
            this.state = null;
            this.actors = null;
        }

        map(fn) {
            return Object.keys(this.actors).map((name, index) => fn(actors[name], name, index));
        }

        subcribe(fn) {
        }
    };

    return new Context();
}
