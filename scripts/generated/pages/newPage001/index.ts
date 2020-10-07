//------------------------------------------------------------------------------
//
//     This code was auto generated.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
//
//------------------------------------------------------------------------------
import pageContextPatch from '@smartface/contx/lib/smartface/pageContextPatch';
import { Styleable, ViewType } from 'generated/core/Styleable';
import Page = require('sf-core/ui/page');
import View = require('sf-core/ui/view');
import { ComponentStyleContext } from 'generated/core/ComponentStyleContext';
import System = require('sf-core/device/system');

import TextView = require('sf-core/ui/textview');
import Button = require('sf-core/ui/button');

import Calendar from 'components/Calendar';
class $NewPage001 extends Page {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};

	static $$styleContext: ComponentStyleContext = {
		classNames: '.page',
		defaultClassNames: ' .default_page',
		userProps: { backgroundColor: 'rgba( 163, 163, 163, 1 )' },
		statusBar: {
			classNames: '.statusBar',
			defaultClassNames: ' .default_statusBar',
			userProps: {}
		},
		headerBar: {
			classNames: '.headerBar',
			defaultClassNames: ' .default_headerBar',
			userProps: {}
		}
	};

	constructor(props?: any) {
		super(
			Object.assign(
				{
					onLoad: () => {
						this.headerBar.title = 'newPage001';
					},
					orientation: Page.Orientation.AUTO
				},
				props
			)
		);
		this.ios && (this.ios.safeAreaLayoutMode = true);
		this.children['statusBar'] = this.statusBar || {};
		this.children['headerBar'] = this.headerBar || {};
		this.addChildByName(new $Label2(), 'label2');
		this.addChildByName(new $Label2_1(), 'label2_1');
		this.addChildByName(new $Button3(), 'button3');
		this.addChildByName(new $ButtonTR(), 'buttonTR');
		this.addChildByName(new $ButtonEN(), 'buttonEN');
		this.addChildByName(new $ButtonAR(), 'buttonAR');
		this.addChildByName(new $ButtonHijri(), 'buttonHijri');
		this.addChildByName(new $ButtonGreg(), 'buttonGreg');
		this.addChildByName(new $NextPage(), 'nextPage');
		this.addChildByName(new $ButtonRange(), 'buttonRange');
		this.addChildByName(new $Calendar(), 'calendar');

		pageContextPatch(this, 'newPage001');
	}
	addChild(child: View, name?: string, classNames?: string, userProps?: { [key: string]: any }, defaultClassNames?: string): void {
		if (this['layout']) {
			this['layout'].addChild(child);
		} else {
			this.addChild(child);
		}
	}
	addChildByName(child: View, name: string) {
		this.children[name] = child;
		this.addChild(child);
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this['layout'].nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this['layout'].nativeObject.setContentDescription(value);
		}
	}
}
export default $NewPage001;

class $Label2 extends TextView implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_textView',
		userProps: {
			flexProps: { positionType: 'ABSOLUTE' },
			font: { size: 14 },
			height: 35,
			left: 207,
			right: 20,
			textAlignment: 'MIDCENTER',
			top: 465,
			width: 147
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

class $Label2_1 extends TextView implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_textView',
		userProps: {
			flexProps: { positionType: 'ABSOLUTE' },
			font: { size: 10 },
			height: 35,
			left: 206,
			right: 20,
			textAlignment: 'MIDCENTER',
			top: 413,
			width: 145
		}
	};
	constructor() {
		super({ text: 'Ozel Gunler' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $Button3 extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			backgroundColor: 'rgba( 208, 2, 27, 1 )',
			flexProps: { positionType: 'ABSOLUTE' },
			height: 37.974683544303794,
			left: 40.506329113924046,
			top: 302.53164556962025,
			width: 64.55696202531645
		}
	};
	constructor() {
		super({ text: 'Color' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $ButtonTR extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			backgroundColor: 'rgba( 208, 2, 27, 1 )',
			borderRadius: 20,
			flexProps: { positionType: 'ABSOLUTE' },
			height: 40,
			left: 20.253164556962023,
			top: 350.63291139240505,
			width: 40
		}
	};
	constructor() {
		super({ text: 'TR' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $ButtonEN extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			backgroundColor: 'rgba( 208, 2, 27, 1 )',
			flexProps: { positionType: 'ABSOLUTE' },
			font: { size: 16, bold: false, italic: false, family: 'AbakuTLSymSans', style: 'n' },
			height: 47.61904761904762,
			left: 116.45569620253164,
			top: 349.3670886075949,
			width: 157.14285714285714
		}
	};
	constructor() {
		super({ text: 'EN FontAwesome' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $ButtonAR extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			backgroundColor: 'rgba( 208, 2, 27, 1 )',
			flexProps: { positionType: 'ABSOLUTE' },
			height: 41.069793701171875,
			left: 287.34177215189874,
			top: 350.63291139240505,
			width: 64.40417641087582
		}
	};
	constructor() {
		super({ text: 'AR' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $ButtonHijri extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			backgroundColor: 'rgba( 126, 211, 33, 1 )',
			flexProps: { positionType: 'ABSOLUTE' },
			height: 34.48275862068966,
			left: 139.6551724137931,
			top: 303.448275862069,
			width: 82.75862068965517
		}
	};
	constructor() {
		super({ text: 'Hijri' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $ButtonGreg extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			backgroundColor: 'rgba( 74, 144, 226, 1 )',
			flexProps: { positionType: 'ABSOLUTE' },
			height: 39.75400422748766,
			left: 262.0253164556962,
			top: 300,
			width: 86.7725974635074
		}
	};
	constructor() {
		super({ text: 'Gregoryen' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $NextPage extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			flexProps: { positionType: 'ABSOLUTE' },
			height: 46.66666666666667,
			left: 20.000000657706426,
			top: 473.33331930226296,
			width: 138.33333333333334
		}
	};
	constructor() {
		super({ text: 'Week Toggle' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $ButtonRange extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: {
			flexProps: { positionType: 'ABSOLUTE' },
			height: 51.85185185185185,
			left: 20.000000657706426,
			top: 410.00000526165144,
			width: 135.1851851851852
		}
	};
	constructor() {
		super({ text: 'Add Range' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $Calendar extends Calendar implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendar-self',
		defaultClassNames: '.default_common .default_flexLayout',
		userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 300, left: 0, top: 0 }
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
