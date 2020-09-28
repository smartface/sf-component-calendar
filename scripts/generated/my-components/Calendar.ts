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

import CalendarNavBar from 'components/CalendarNavBar';
import CalendarBody from 'components/CalendarBody';

export default class Calendar extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar-self',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { height: 300 }
	};

	constructor(props?: ConstructorParameters<typeof FlexLayout>) {
		super();

		this.addChildByName(new $Calendar$$Navbar(), 'navbar');
		this.addChildByName(new $Calendar$$CalendarDays(), 'calendarDays');
		this.addChildByName(new $Calendar$$Line1(), 'line1');
		this.addChildByName(new $Calendar$$Line2(), 'line2');
		this.addChildByName(new $Calendar$$Body(), 'body');
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

class $Calendar$$Navbar extends CalendarNavBar implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_navbar',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { backgroundColor: 'rgba( 255, 255, 255, 1 )' }
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

class $Calendar$$CalendarDays extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: {}
	};
	constructor() {
		super();

		this.addChildByName(new $Calendar$$CalendarDays$$DayName_0(), 'dayName_0');
		this.addChildByName(new $Calendar$$CalendarDays$$DayName_1(), 'dayName_1');
		this.addChildByName(new $Calendar$$CalendarDays$$DayName_2(), 'dayName_2');
		this.addChildByName(new $Calendar$$CalendarDays$$DayName_3(), 'dayName_3');
		this.addChildByName(new $Calendar$$CalendarDays$$DayName_4(), 'dayName_4');
		this.addChildByName(new $Calendar$$CalendarDays$$DayName_5(), 'dayName_5');
		this.addChildByName(new $Calendar$$CalendarDays$$DayName_6(), 'dayName_6');
	}
	addChildByName(child: View, name: string) {
		this.children[name] = child;
		if (this['layout']) {
			this['layout'].addChild(child);
		} else {
			this.addChild(child);
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
class $Calendar$$CalendarDays$$DayName_0 extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames_dayName.weekday',
		defaultClassNames: '.default_common .default_label',
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

class $Calendar$$CalendarDays$$DayName_1 extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames_dayName.weekday',
		defaultClassNames: '.default_common .default_label',
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

class $Calendar$$CalendarDays$$DayName_2 extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames_dayName.weekday',
		defaultClassNames: '.default_common .default_label',
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

class $Calendar$$CalendarDays$$DayName_3 extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames_dayName.weekday',
		defaultClassNames: '.default_common .default_label',
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

class $Calendar$$CalendarDays$$DayName_4 extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames_dayName.weekday',
		defaultClassNames: '.default_common .default_label',
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

class $Calendar$$CalendarDays$$DayName_5 extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames_dayName.weekday',
		defaultClassNames: '.default_common .default_label',
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

class $Calendar$$CalendarDays$$DayName_6 extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.header_dayNames_dayName.weekday',
		defaultClassNames: '.default_common .default_label',
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

class $Calendar$$Line1 extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.flexLayout',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { backgroundColor: 'rgba( 228, 228, 228, 1 )', height: 1, width: null }
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

class $Calendar$$Line2 extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.flexLayout',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { alpha: 1, backgroundColor: 'rgba( 228, 228, 228, 1 )', height: 1, width: null }
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

class $Calendar$$Body extends CalendarBody implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar.body',
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
