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

class $NewPage004 extends Page {
	dispatch: (action: { [key: string]: any }) => void;
	children: { [key: string]: any } = {};

	static $$styleContext: ComponentStyleContext = {
		classNames: '.sf-page',
		defaultClassNames: ' .default_page',
		userProps: {},
		statusBar: {
			classNames: '.sf-statusBar',
			defaultClassNames: ' .default_statusBar',
			userProps: {}
		},
		headerBar: {
			classNames: '.sf-headerBar',
			defaultClassNames: ' .default_headerBar',
			userProps: {}
		}
	};

	constructor(props?: any) {
		super(
			Object.assign(
				{
					onLoad: () => {
						this.headerBar.title = 'newPage004';
					}
				},
				props
			)
		);
		this.children['statusBar'] = this.statusBar || {};
		this.children['headerBar'] = this.headerBar || {};

		pageContextPatch(this, 'newPage004');
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
export default $NewPage004;
