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

import CalendarWeekRow from '../../components/CalendarWeekRow';

export default class CalendarBody extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: ' .calendar.body',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
	};

	constructor(props?: ConstructorParameters<typeof FlexLayout>) {
		super();

		this.addChildByName(new $CalendarBody$$Week1(), 'week1');
		this.addChildByName(new $CalendarBody$$Week2(), 'week2');
		this.addChildByName(new $CalendarBody$$Week3(), 'week3');
		this.addChildByName(new $CalendarBody$$Week4(), 'week4');
		this.addChildByName(new $CalendarBody$$Week5(), 'week5');
		this.addChildByName(new $CalendarBody$$Week6(), 'week6');
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

class $CalendarBody$$Week1 extends CalendarWeekRow implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.weekRow',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
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

class $CalendarBody$$Week2 extends CalendarWeekRow implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.weekRow',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
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

class $CalendarBody$$Week3 extends CalendarWeekRow implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.weekRow',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
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

class $CalendarBody$$Week4 extends CalendarWeekRow implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.weekRow',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
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

class $CalendarBody$$Week5 extends CalendarWeekRow implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.weekRow',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
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

class $CalendarBody$$Week6 extends CalendarWeekRow implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.weekRow',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
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
