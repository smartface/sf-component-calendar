//------------------------------------------------------------------------------
//
//     This code was auto generated.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
//
//------------------------------------------------------------------------------
import { Styleable } from 'generated/core/Styleable';
import View = require('sf-core/ui/view');
import { ComponentStyleContext } from 'generated/core/ComponentStyleContext';
import System = require('sf-core/device/system');

import FlexLayout = require('sf-core/ui/flexlayout');
import Label = require('sf-core/ui/label');
import Button = require('sf-core/ui/button');

export default class CalendarNavBar extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.flexLayout',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {
			flexProps: { positionType: 'RELATIVE', flexGrow: 1, flexDirection: 'ROW', flexWrap: 'WRAP' },
			height: 45,
			maxHeight: null,
			minHeight: null,
			paddingBottom: null,
			width: 348
		}
	};

	constructor(props?: ConstructorParameters<typeof FlexLayout>) {
		super();

		this.addChildByName(new $CalendarNavBar$$MonthLabel(), 'monthLabel');
		this.addChildByName(new $CalendarNavBar$$PrevWeek(), 'prevWeek');
		this.addChildByName(new $CalendarNavBar$$NextMonth(), 'nextMonth');
		this.addChildByName(new $CalendarNavBar$$NextWeek(), 'nextWeek');
		this.addChildByName(new $CalendarNavBar$$PrevMonth(), 'prevMonth');
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

class $CalendarNavBar$$MonthLabel extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label .calendar.header_navbar_monthLabel',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			backgroundColor: 'rgba( 255, 255, 255, 0 )',
			bottom: 0,
			flexProps: { flexGrow: null, positionType: 'ABSOLUTE' },
			height: null,
			left: 0,
			marginBottom: null,
			marginLeft: null,
			marginRight: null,
			right: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
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

class $CalendarNavBar$$PrevWeek extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_navbar_arrow',
		defaultClassNames: '.default_common .default_button',
		userProps: { alpha: 1, left: 30, visible: false, width: 30 }
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

class $CalendarNavBar$$NextMonth extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_navbar_arrow',
		defaultClassNames: '.default_common .default_button',
		userProps: { right: 0 }
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarNavBar$$NextWeek extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_navbar_arrow',
		defaultClassNames: '.default_common .default_button',
		userProps: { ios: { shadowOpacity: 0 }, right: 30, visible: false, width: 30 }
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

class $CalendarNavBar$$PrevMonth extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_navbar_arrow',
		defaultClassNames: '.default_common .default_button',
		userProps: {}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}
