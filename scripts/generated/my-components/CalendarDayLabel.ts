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

import Label = require('@smartface/native/ui/label');

export default class CalendarDayLabel extends Label implements Styleable {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};
	static $$styleContext: ComponentStyleContext = {
		classNames: '.label',
		defaultClassNames: '.default_common .default_label',
		userProps: { borderRadius: 18, borderWidth: 1, height: 61.66666622819572, width: 58.218390366126755 }
	};

	constructor(props?: ConstructorParameters<typeof Label>) {
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
