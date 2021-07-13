import NavigationController = require('@smartface/native/ui/navigationcontroller');
import Page = require('@smartface/native/ui/page');
import View = require('@smartface/native/ui/view');
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




