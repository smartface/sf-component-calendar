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

import CalendarDayLabel from 'components/CalendarDayLabel';

export default class CalendarWeekRowWithLabel extends FlexLayout implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.flexLayout',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { flexProps: { flexDirection: 'ROW' }, height: 63.28767227799925, paddingLeft: 3, paddingRight: 3, width: 344.6575426075557 }
	};

	constructor(props?: ConstructorParameters<typeof FlexLayout>) {
		super();

		this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel1(), 'weekDayLabel1');
		this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel2(), 'weekDayLabel2');
		this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel3(), 'weekDayLabel3');
		this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel4(), 'weekDayLabel4');
		this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel5(), 'weekDayLabel5');
		this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel6(), 'weekDayLabel6');
		this.addChildByName(new $CalendarWeekRowWithLabel$$WeekDayLabel7(), 'weekDayLabel7');
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

class $CalendarWeekRowWithLabel$$WeekDayLabel1 extends CalendarDayLabel implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			borderRadius: 18,
			borderWidth: 1,
			flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
			font: { bold: true },
			height: null,
			left: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
		}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarWeekRowWithLabel$$WeekDayLabel2 extends CalendarDayLabel implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			borderRadius: 18,
			borderWidth: 1,
			flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
			font: { bold: true },
			height: null,
			left: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
		}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarWeekRowWithLabel$$WeekDayLabel3 extends CalendarDayLabel implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			borderRadius: 18,
			borderWidth: 1,
			flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
			font: { bold: true },
			height: null,
			left: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
		}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarWeekRowWithLabel$$WeekDayLabel4 extends CalendarDayLabel implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			borderRadius: 18,
			borderWidth: 1,
			flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
			font: { bold: true },
			height: null,
			left: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
		}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarWeekRowWithLabel$$WeekDayLabel5 extends CalendarDayLabel implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			borderRadius: 18,
			borderWidth: 1,
			flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
			font: { bold: true },
			height: null,
			left: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
		}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarWeekRowWithLabel$$WeekDayLabel6 extends CalendarDayLabel implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			borderRadius: 18,
			borderWidth: 1,
			flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
			font: { bold: true },
			height: null,
			left: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
		}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $CalendarWeekRowWithLabel$$WeekDayLabel7 extends CalendarDayLabel implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: {
			borderRadius: 18,
			borderWidth: 1,
			flexProps: { positionType: 'RELATIVE', flexGrow: 1 },
			font: { bold: true },
			height: null,
			left: 0,
			textAlignment: 'MIDCENTER',
			top: 0,
			width: null
		}
	};
	constructor() {
		super({ text: '' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}
