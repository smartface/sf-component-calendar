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
			"borderRadius": 18,
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
				"borderColor": "#D6D6D6",
				"backgroundColor": "rgba(0,0,0,0)",
			},
			"&-specialDays": {
				"&-selected": {
					"@extend": ".calendar.day-selected",
				},
				"backgroundColor": "rgba(0,0,0,0)",
			},
			"&-weekend": {
				"textColor": "#A3A3A3",
				"borderColor": "#A3A3A3"
			}
		}
	}

};

var styler = flatStyler(styles);

const selectDays = function(name){
	return name.indexOf("_weekDay") > 0;;
}

function createContext(component) {
	var styleContext = StyleContext.fromSFComponent(
		component,
		"calendar",
		//initial classNames
		function(name) {
			if (name.indexOf("_weekDay") > 0) {
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
				case "resetDays":
					Object.keys(newState.actors)
						.filter(selectDays)
						.forEach(function(name){
							newState.actors[name].resetClassNames([".calendar.day"]);
						});
					
					break;
				case "daySelected":
					if (newState.selectedDay){
						newState.actors[newState.selectedDay].removeClassName(".calendar.day-selected");
					}

					newState.actors[target].pushClassName(".calendar.day-selected");
					newState.selectedDay = target;

					return newState;
					break;
				case "clearSelectedDay":
					newState.actors[target].removeClassName(".calendar.day-selected");
					newState.selectedDay = "";
					
					break;
				case "changeState":
					const actor = newState.actors[target];
					// actor.setClassName(".calendar.day");
					
					newState.states = newState.states || {};
					newState.states[target] = action.data;
					
					const classNames = [actor.getClassName()];
					const data = action.data;
					
					if(data.isSpecialDay){
						actor.pushClassName(".calendar.day-specialDays");
					}

					if(data.isWeekend){
						actor.pushClassName(".calendar.day-weekend");
					}

					if(data.month !== "current"){
						actor.pushClassName(".calendar.day-deactiveDays");
					}
					
					// actor.getClassName();
					
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
