import NavigationController = require('sf-core/ui/navigationcontroller');
import Page = require('sf-core/ui/page');
import View = require('sf-core/ui/view');
import { ComponentStyleContext } from "./ComponentStyleContext";

export declare abstract class Styleable {
    static $$styleContext: ComponentStyleContext;
}

export type ViewType = View | NavigationController;

export interface ComponentWithNamedChildren {
    addChildByName(name: string, child: View);
}

export interface ComponentConstructor {
    new(params?:any);
}




