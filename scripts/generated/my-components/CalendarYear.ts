//------------------------------------------------------------------------------
//
//     This code was auto generated.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
//
//------------------------------------------------------------------------------
import { Styleable } from 'generated/core/Styleable';
import View = require('@smartface/native/ui/view');
import { ComponentStyleContext } from 'generated/core/ComponentStyleContext';
import System = require('@smartface/native/device/system');

import FlexLayout = require('@smartface/native/ui/flexlayout');
import Label = require('@smartface/native/ui/label');

export default class CalendarYear extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.flexLayout',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { backgroundColor: 'rgba( 235, 235, 235, 1 )', height: 40, width: 293.42105263157896 }
	};

	constructor(props?: ConstructorParameters<typeof FlexLayout>) {
		super();

		this.addChildByName(new $CalendarYear$$YearLabel(), 'yearLabel');
	}
	addChildByName(child: View, name: string) {
		this.children[name] = child;
		this.addChild(child);
	}
	addChild(child: View, name?: string, classNames?: string, userProps?: { [key: string]: any }, defaultClassNames?: string): void {
		if (this['layout']) {
			this['layout'].addChild(child);
		} else {
			super.addChild(child);
		}
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarYear$$YearLabel extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			backgroundColor: 'rgba( 255, 255, 255, 0 )',
			bottom: 0,
			flexProps: { flexGrow: 1, positionType: 'ABSOLUTE' },
			font: { size: 12 },
			height: null,
			left: 10,
			marginLeft: null,
			marginRight: 10,
			right: null,
			textAlignment: 'MIDLEFT',
			top: 0,
			width: 80
		}
	};
	constructor() {
		super();
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}
