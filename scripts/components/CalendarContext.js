const StyleContext = require("../services/StyleContext");
const getOneProp = require("library/styler-builder")
	.getOneProp;
const INIT_CONTEXT_ACTION_TYPE = require("../services/Context")
	.INIT_CONTEXT_ACTION_TYPE;

const styles = {
	"#calendar": {
		"&_line2": {
			width: 160,
			"alignSelf": "FLEX_END"
		}
	},
	".calendar": {
		"&-self": {
			"backgroundColor": "#FFFFFF",
			"right": 0,
			"left": 0,
			"top": 0,
			"bottom": 0,
			"minHeight": 300,
			"maxHeight": 300,
			"paddingLeft": 0,
			"paddingRight": 0,
			"positionType": "ABSOLUTE"
		},
		"&_line": {
			"height": 1,
			"width": NaN,
			"backgroundColor": "rgba(228,228,228,1)"
		},
		"&_calendarYear": {
			"&_yearLabel": {
				"textColor": "#FF001F"
			}
		},
		".header": {
			"&_navbar": {
				"&_monthLabel": {
					"textColor": "#1775D0"
				},
				"&_arrow": {
					"flexGrow": 1,
					"textColor": "#B1B1B4",
				},
				"&_label": {
					"textColor": "#000000",
				}
			},
			"&_dayNames": {
				"backgroundColor": "#EBEBEB",
				"minHeight": 14,
				"maxHeight": NaN,
				"height": NaN,
				"flexGrow": 0.2,
				"direction": "LTR",
				"&-lang_ar": {
				  "direction": "RTL",
				},
				"&-lang_ar-sa": {
				  "direction": "RTL",
				},
				"&_dayName": {
					"height": NaN,
					"font": {
						"size": 10,
						"family": "Arial"
					},
					".weekday": {
						"textColor": "#000000",
					},
					".weekend": {
						"textColor": "#808080",
					}
				}
			}
		},
		// .calendar.weekRow.lang_ar-sa
		".body": {},
		".weekRow": {
			"backgroundColor": "rgba(0,0,0,0)",
			"maxHeight": 40,
			"minHeight": 26,
		  "direction": "LTR",
			"&-lang_ar-sa": {
			  "direction": "RTL"
			},
			"&-lang_ar": {
			  "direction": "RTL"
			},
			"&_line": {
				"backgroundColor": "#C0C0C0"
			},
		},
		".day": {
			"font": {
				"size": 14,
				"bold": false,
				"italic": false,
				"family": "Arial"
			},
			"borderWidth": 0,
			"borderRadius": 13,
			"maxWidth": 26,
			"minWidth": 26,
			"maxHeight": 26,
			"minHeight": 26,
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
			"&-specialDay": {
				"borderWidth": 0,
				"backgroundColor": "#FF9F9F"
			},
			"&-weekend": {
				"borderWidth": 0,
				"textColor": "#A3A3A3",
			}
		}
	}
};

const styler = require("@smartface/styler/lib/styler");

var styling = styler(styles);


const selectDays = function(name) {
	return name.indexOf("_weekDay") > 0;
};

function removeSelection(state, actors) {
	if(state.selectedDay) {
		actors[state.selectedDay].removeClassName(".calendar.day-selected");
		delete state.selectedDay;
	}
}

function resetDays(days, actors) {
	days.forEach(function(name) {
		if(actors[name].getClassName() != ".calendar.day") {
			actors[name].resetClassNames([".calendar.day"]);
		}
	});
}

// reducer for context's components
function reducer(state, actors, action, target) {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case INIT_CONTEXT_ACTION_TYPE:
			newState.days = Object.keys(actors)
				.filter(selectDays);

			return newState;
		case "resetDays":
			resetDays(newState.days, actors);
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
		case "changeCalendar":
		  Object.keys(actors).forEach(function(key){
		    const actor = actors[key];
		    actor.resetClassNames([actor.getInitialClassName()]);
		    actor.pushClassName(actor.getInitialClassName()+"-lang_"+action.lang);
		  });
		  
		  break;
		case "changeState":
			const actor = actors[target];
			const data = action.data;
			if(data.isWeekend) {
				actor.pushClassName(".calendar.day-weekend");
			}

			if(Array.isArray(data.specialDay) && data.specialDay.length > 0) {
				actor.pushClassName(".calendar.day-specialDay");
			}

			if(data.month != "current") {
				actor.pushClassName(".calendar.day-deactiveDays");
			}

			break;
	}

	return newState;
}

function classNameMap(name) {
	const namePattern = /week[0-9]+_weekDay[0-9]+/
	const rowPattern = new RegExp("week[0-9]+");
	const dayNamesPattern = new RegExp("dayName_[0-9]+");
	const linePattern = new RegExp("_line[0-9]+");

	if(namePattern.test(name)) {
		return '.calendar.day';
	} else if(rowPattern.test(name)) {
		return '.calendar.weekRow';
	} else if(dayNamesPattern.test(name)) {
		return ".calendar.header_dayNames_dayName.weekday";
	} else if(linePattern.test(name)) {
		return ".calendar_line";
	}

	switch(name) {
		case 'calendar':
			return ".calendar-self";
		case 'calendar_navbar':
			return ".calendar.header .calendar.header_navbar";
		case 'calendar_navbar_prevMonth':
		case 'calendar_navbar_nextMonth':
			return ".calendar.header_navbar_arrow";
		case 'calendar_navbar_monthLabel':
			return ".calendar.header_navbar_monthLabel";
		case 'calendar_calendarYear_yearLabel':
			return ".calendar_calendarYear_yearLabel";
		case 'calendar_body':
			return ".calendar.body";
		case 'calendar_calendarDays':
			return ".calendar.header_dayNames";
	}

	return ".calendar";
}

function createContext(component) {
	var styleContext = StyleContext.fromSFComponent(
		component,
		"calendar",
		//initial classNames
		classNameMap,
		//context hooks
		function(hook) {
			switch(hook) {
			  case 'beforeAssignComponentStyles':
			    return function beforeAssignComponentStyles(name, className) {
						return className;
					};
				case 'beforeStyleDiffAssign':
					return function beforeStyleDiffAssign(styles) {
						Object.keys(styles)
							.forEach(function(key) {
								styles[key] = getOneProp(key, styles[key]);
							});

						return styles;
					};
				case 'reduceDiffStyleHook':
					return function stylesDiffHook(oldStyles, newStyles) {
						function isEqual(oldStyle, newStyle) {
							if(oldStyle === undefined) {
								return false;
							}

							var keys1 = Object.keys(oldStyle);
							var keys2 = Object.keys(newStyle);

							if(keys1.length !== keys2.length) {
								return false;
							}

							let res = keys2.some(function(key) {
								return oldStyle[key] !== newStyle[key];
							});

							return !res;
						};

						return function stylesDiffReducer(acc, key) {
							if(typeof newStyles[key] === "object") {
								if(!isEqual(oldStyles[key], newStyles[key])) {
									acc[key] = newStyles[key];
								}
							} else if(oldStyles[key] !== newStyles[key]) {
								acc[key] = newStyles[key];
							}

							return acc;
						};
					};
			}
		}
	);

	// creates an initial styling for the context
	var context = styleContext(
		styling
		/*function(className) {
			return function getStyle() {
				return getPropsFromStyle(styling, className);
			}
		}*/
		,
		reducer
	);

	return function setStyle(newStyles) {
		try {
			const styling = styler(styles, newStyles);
			// injects a new styling to the context
			styleContext(styling
				/*function(className) {
								return function getStyle() {
									return getPropsFromStyle(styling, className);
								}
							}*/
				, reducer);
		} catch(e) {
			alert(e.message);
		}
	};
}

module.exports = {
	createContext: createContext
};
