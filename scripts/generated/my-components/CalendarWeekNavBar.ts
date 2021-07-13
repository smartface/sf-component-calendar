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
import Button = require('@smartface/native/ui/button');

export default class CalendarWeekNavBar extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.flexLayout',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {
			flexProps: { positionType: 'RELATIVE', flexGrow: 1, flexDirection: 'ROW', flexWrap: 'WRAP' },
			height: 20,
			maxHeight: null,
			minHeight: null,
			paddingBottom: null,
			width: 285.9375
		}
	};

	constructor(props?: ConstructorParameters<typeof FlexLayout>) {
		super();

		this.addChildByName(new $CalendarWeekNavBar$$NextWeek(), 'nextWeek');
		this.addChildByName(new $CalendarWeekNavBar$$PrevWeek(), 'prevWeek');
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

class $CalendarWeekNavBar$$NextWeek extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_navbar_arrow',
		defaultClassNames: '.default_common .default_button',
		userProps: { font: { size: 16, family: 'FontAwesome5FreeSolid', bold: false, italic: false }, right: 0 }
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarWeekNavBar$$PrevWeek extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_navbar_arrow',
		defaultClassNames: '.default_common .default_button',
		userProps: { font: { size: 16, family: 'FontAwesome5FreeSolid', bold: false, italic: false } }
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}
