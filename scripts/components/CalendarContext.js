const flatStyler = require("@smartface/styler/lib/flatStyler");
const StyleContext = require("../services/StyleContext");
const getPropsFromStyle = require("library/styler-builder").getPropsFromStyle;

const styles = {
	".calendar": {
		".header": {
			"&_navbar": {
				"&_arrow": {
					"flexProps": {
						"flexGrow": 1,
						"textColor": "#5E5E5E",
					}
				},
				"&_label": {
					"textColor": "#000000",
				},
				"&_daynames": {
					".weekday": {
						"textColor": "#000000",
						"backgroundColor": "rgba(0,185,255,42)"
					},
					".weekend": {
						"textColor": "#000000",
						"backgroundColor": "rgba(0,185,255,42)"
					}
				}
			}
		},
		".body": {},
		".day": {
			"font": {
				"size": 16,
				"bold": false,
				"italic": false,
				"family": "Arial"
			},
			"borderRadius": 20,
			"textColor": "#000000",
			"backgroundColor": "rgba(0,0,0,0)",
			"&-inrange": {
				"backgroundColor": "rgba(0,185,255,42)",
				"textColor": "#000000",
			},
			"&-selected": {
				"backgroundColor": "rgba(0,185,255,42)",
				"textColor": "#000000",
			},
			"&-deactiveDays": {
				"textColor": "#D6D6D6",
				"backgroundColor": "rgba(0,0,0,0)",
			},
			"&-specialDays": {
				"&-selected": {
					"@extend": ".calendar.day-selected",
				},
				"backgroundColor": "rgba(0,0,0,0)",
			},
			"&-weekend": {
				"textColor": "#E6E6E6",
			}
		}
	}

};

var styler = flatStyler(styles);

function createContext(component) {
	var styleContext = StyleContext.fromSFComponent(
		component,
		"calendar",
		//initial classNames
		function(name) {
			if (name.indexOf("weekday") == 0) {
				return '.calendar.day';
			}

			switch (name) {
				case 'navbar':
					return ".calendar.header .calendar.header_navbar";
				case 'body':
					return ".body";
			}

			return ".calendar";
		}
	);

	var context = styleContext(
		function(className) {
			return function getStyle() {
				return getPropsFromStyle(styler, className);
			}
		},
		// reducer for context's components
		function(state, action, target) {
			const newState = Object.assign({}, state);

			switch (action.type) {
				case "daySelected":
					if (newState.selectedDay)
						newState.actors[newState.selectedDay].setClassName(".calendar.day");

					newState.actors[target].setClassName(".calendar.day .calendar.day-selected");
					newState.selectedDay = target;

					return newState;
					break;
				case "clearSelectedDay":
					newState.actors[target].setClassName(".calendar.day");
					newState.selectedDay = "";
					
					break;
				case "changeState":
					const actor = newState.actors[target];
					actor.setClassName(".calendar.day");
					newState.states = newState.states || {};
					newState.states[target] = action.data;
					const classNames = [actor.getClassName()];
					const data = action.data;
					
					if(data.isWeekend){
						classNames.push(".calendar.day-weekend");
					}

					if(data.isSpecialDay){
						classNames.push(".calendar.day-specialDays");
					}
					
					if(data.month !== "current"){
						classNames.push(".calendar.day-deactiveDays");
					}
					
					actor.setClassName(classNames.join(" "));
					
					// console.log(actor.getClassName());
					break;
			}
			
			return newState;
		}
	);
}

module.exports = {
	registerStyle: function(style) {

	},
	createContext: createContext
}
