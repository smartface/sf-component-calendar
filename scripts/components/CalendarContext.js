const flatStyler = require("@smartface/styler/lib/flatStyler");
const StyleContext = require("../services/StyleContext");
const getPropsFromStyle = require("library/styler-builder").getPropsFromStyle;

const styles = {
	".calendar": {
		"&-size": {
			"right":0,
			"left":0,
			"top":0,
			"bottom": 0, 
			"minHeight": 300,
			"maxHeight": 300,
			"paddingLeft": 0,
			"paddingRight": 0,
			flexProps: {
				positionType: "ABSOLUTE",
			}
		},
		".header": {
			"&_navbar": {
				"&_monthLabel": {
					"textColor": "#1775D0"
				},
				"&_yearLabel": {
					"textColor": "#B1B1B4"
				},
				"&_arrow": {
					"flexProps": {
						"flexGrow": 1,
						"textColor": "#B1B1B4",
					}
				},
				"&_label": {
					"textColor": "#000000",
				},
				"&_daynames": {
					".weekday": {
						"textColor": "#000000",
					},
					".weekend": {
						"textColor": "#000000",
					}
				}
			}
		},
		".body": {
		},
		".weekRow": {
			"backgroundColor": "rgba(0,0,0,0)",
			"maxHeight": 26,
			"minHeight": 26,
		},
		".day": {
			"font": {
				"size": 14,
				"bold": false,
				"italic": false,
				"family": "Arial"
			},
			"borderWidth": 0,
			"borderRadius": 12,
			"maxWidth": 40,
			"minWidth": 40,
			"maxHeight": 24,
			"minHeight": 24,
			"textColor": "#000000",
			"backgroundColor": "rgba(0,0,0,0)",
			"&-inrange": {
				"textColor": "#000000",
			},
			"&-selected": {
				"borderWidth": 0,
				"backgroundColor": "rgba(0,185,255,42)",
				"textColor": "#000000"
			},
			"&-deactiveDays": {
				"borderWidth": 0,
				"textColor": "#D6D6D6",
			},
			"&-specialDays": {
				"borderWidth": 0,
			},
			"&-weekend": {
				"borderWidth": 0,
				"textColor": "#A3A3A3",
			}
		}
	}
};

var styler = flatStyler(styles);

const selectDays = function(name){
	return name.indexOf("_weekDay") > 0;
}

function removeSelection(state, actors){
	if(state.selectedDay){
		actors[state.selectedDay].removeClassName(".calendar.day-selected");
		delete state.selectedDay;
	}
}

// reducer for context's components
function reducer(state, actors, action, target) {
	const newState = Object.assign({}, state);

	switch (action.type) {
		case "resetDays":
			Object.keys(actors)
				.filter(selectDays)
				.forEach(function(name){
					if(actors[name].getClassName() != ".calendar.day"){
						actors[name].resetClassNames([".calendar.day"]);
					}
				});
			
			break;
		case "daySelected":
			removeSelection(newState, actors);
			actors[target].pushClassName(".calendar.day-selected");

			newState.selectedDay = target;

			return newState;
		case "clearSelectedDay":
			removeSelection(newState, actors);
			
			break;
		case "changeMonth":
			removeSelection(newState, actors);
		break;
		case "changeState":
			const actor = actors[target];
			// actor.setClassName(".calendar.day");
			newState.states = newState.states || {};
			newState.states[target] = action.data;
			
			// const classNames = [actor.getClassName()];
			const data = action.data;
			
			// if(actor.classNamesCount() > 1)
				// actor.resetClassNames([".calendar.day"]);
			// if(actors[target].getClassName() != ".calendar.day"){
			// 	actors[target].resetClassNames([".calendar.day"]);
			// }
			
			if(data.isSpecialDay){
				actor.pushClassName(".calendar.day-specialDays");
			}

			if(data.isWeekend){
				actor.pushClassName(".calendar.day-weekend");
			}

			if(data.month != "current"){
				actor.pushClassName(".calendar.day-deactiveDays");
			}
			
			break;
	}
	
	return newState;
}

function createContext(component) {
	var styleContext = StyleContext.fromSFComponent(
		component,
		"calendar",
		//initial classNames
		function(name) {
			const namePattern = /week[0-9]+_weekDay[0-9]+/
			const rowPattern = new RegExp("week[0-9]+");

			if (namePattern.test(name)) {
				return '.calendar.day';
			} else if (rowPattern.test(name)) {
				return '.calendar.weekRow';
			}
			
			switch (name) {
				case 'calendar':
					return ".calendar-size";
				case 'calendar_navbar':
					return ".calendar.header .calendar.header_navbar";
				case 'calendar_navbar_prevMonth':
				case 'calendar_navbar_nextMonth':
					return ".calendar.header_navbar_arrow";
				case 'calendar_navbar_monthLabel':
					return ".calendar.header_navbar_monthLabel";
				case 'calendar_navbar_yearLabel':
					return ".calendar.header_navbar_yearLabel";
				case 'calendar_body':
					return ".calendar.body";
			}

			return ".calendar";
		}
	);
	
	// creates an initial styler to the context
	var context = styleContext(
		function(className) {
			return function getStyle() {
				return getPropsFromStyle(styler, className);
			}
		},
		reducer
	);
	
	return function setStyle(newStyles) {
		try {
			const styler = flatStyler(styles, newStyles);
			// injects a new styler to the context
			styleContext(function(className) {
				return function getStyle() {
					return getPropsFromStyle(styler, className);
				}
			}, reducer);
		} catch(e){
			alert(e.message);
		}
	}
}

module.exports = {
	createContext: createContext
}
