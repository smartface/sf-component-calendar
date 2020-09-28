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

import CalendarDay from 'components/CalendarDay';

export default class CalendarWeekRow extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.weekRow',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { backgroundColor: 'rgba( 245, 126, 126, 0 )', flexProps: { flexDirection: 'ROW' }, height: 40, width: 355 }
	};

	constructor(props?: ConstructorParameters<typeof FlexLayout>) {
		super();

		this.addChildByName(new $CalendarWeekRow$$WeekDay1(), 'weekDay1');
		this.addChildByName(new $CalendarWeekRow$$WeekDay2(), 'weekDay2');
		this.addChildByName(new $CalendarWeekRow$$WeekDay3(), 'weekDay3');
		this.addChildByName(new $CalendarWeekRow$$WeekDay4(), 'weekDay4');
		this.addChildByName(new $CalendarWeekRow$$WeekDay5(), 'weekDay5');
		this.addChildByName(new $CalendarWeekRow$$WeekDay6(), 'weekDay6');
		this.addChildByName(new $CalendarWeekRow$$WeekDay7(), 'weekDay7');
		this.addChildByName(new $CalendarWeekRow$$Line(), 'line');
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

class $CalendarWeekRow$$WeekDay1 extends CalendarDay implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.day',
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

class $CalendarWeekRow$$WeekDay2 extends CalendarDay implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.day',
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

class $CalendarWeekRow$$WeekDay3 extends CalendarDay implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.day',
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

class $CalendarWeekRow$$WeekDay4 extends CalendarDay implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.day',
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

class $CalendarWeekRow$$WeekDay5 extends CalendarDay implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.day',
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

class $CalendarWeekRow$$WeekDay6 extends CalendarDay implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.day',
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

class $CalendarWeekRow$$WeekDay7 extends CalendarDay implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.day',
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

class $CalendarWeekRow$$Line extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { backgroundColor: 'rgba( 228, 228, 228, 1 )', bottom: 1, flexProps: { positionType: 'ABSOLUTE' }, height: 1, left: 0, right: 0 }
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
