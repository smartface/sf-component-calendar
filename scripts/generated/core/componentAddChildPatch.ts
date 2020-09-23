import View = require('sf-core/ui/view');
import FlexLayout = require('sf-core/ui/flexlayout');
import { ComponentConstructor, ComponentWithNamedChildren, ViewType } from './Styleable';
export function componentAddChildPatch<T extends new (...args: any[]) => Function = any>(klass: any) {
    return class extends klass implements ComponentWithNamedChildren {
        public children: {
            [key: string]: ViewType;
        } = {};
        public layout?: FlexLayout;
        public addChild?: (child: View) => void;

        addChildByName(name: string, child: View) {
            this.children[name] = child;
            if (this.layout) {
                this.layout.addChild(child);
            }
            else if (this.addChild) {
                this.addChild(child);
            }
        }
    };
}
