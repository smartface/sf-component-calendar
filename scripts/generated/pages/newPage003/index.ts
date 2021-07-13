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
import Page = require('@smartface/native/ui/page');
import View = require('@smartface/native/ui/view');
import { ComponentStyleContext } from 'generated/core/ComponentStyleContext';
import System = require('@smartface/native/device/system');

import Button = require('@smartface/native/ui/button');

import CalendarWeekly from 'components/CalendarWeekly';
class $NewPage003 extends Page {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};

	static $$styleContext: ComponentStyleContext = {
		classNames: '.page',
		defaultClassNames: ' .default_page',
		userProps: { flexProps: { positionType: 'ABSOLUTE' } },
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
						this.headerBar.title = 'newPage003';
					}
				},
				props
			)
		);
		this.children['statusBar'] = this.statusBar || {};
		this.children['headerBar'] = this.headerBar || {};
		this.addChildByName(new $CalendarWeekly(), 'calendarWeekly');
		this.addChildByName(new $Prev(), 'prev');
		this.addChildByName(new $Next(), 'next');
		this.addChildByName(new $Now(), 'now');
		this.addChildByName(new $Back(), 'back');

		pageContextPatch(this, 'newPage003');
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
export default $NewPage003;

class $CalendarWeekly extends CalendarWeekly implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.calendarWeekly',
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

class $Prev extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 70, left: 16.666666666666668, top: 138.33333333333334, width: 111.66666666666667 }
	};
	constructor() {
		super({ text: 'Onceki Hafta' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $Next extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 70, left: 248.33333333333334, top: 138.33333333333334, width: 111.66666666666667 }
	};
	constructor() {
		super({ text: 'Sonraki Hafta' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $Now extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: { flexProps: { positionType: 'ABSOLUTE' }, height: 70, left: 130.35713721965922, top: 235.77586206896552, width: 111.66666666666667 }
	};
	constructor() {
		super({ text: 'Bugun' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}

class $Back extends Button implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	static $$styleContext: ComponentStyleContext = {
		classNames: '.button',
		defaultClassNames: '.default_common .default_button',
		userProps: { flexProps: { positionType: 'ABSOLUTE' }, left: 66.66666885902143, top: 413.33334034886855 }
	};
	constructor() {
		super({ text: 'Aylik Takvim' });
	}

	set testId(value: string) {
		if (System.OS === 'iOS') {
			this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
		} else {
			this.nativeObject.setContentDescription(value);
		}
	}
}
