export class ChildComponent {
  constructor(){
  }
}

export default class Component {
  constructor(name){
    this.context = context;
    this.children = {};
    this.name = name;
    this.dispatcher = {};
  }
  
  setContextDispatcher(dispatch){
    this.dispatcher = dispatch;
  }
  
  changeState(state){
    this.dispatcher(state);
  }
  
  addChild(name, child){
    this.children[name] = child;
  }
}
