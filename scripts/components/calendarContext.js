const StyleContext = require("@smartface/contx/lib/styling/StyleContext");
const getOneProp = require("@smartface/contx/lib/smartface/sfCorePropFactory").default;
const pageContext = require("@smartface/contx/lib/smartface/pageContext");
const fromSFComponent = require("@smartface/contx/lib/smartface/fromSFComponent").default;
const INIT_CONTEXT_ACTION_TYPE = require("../services/Context")
	.INIT_CONTEXT_ACTION_TYPE;
const System = require('sf-core/device/system');
const styles = require("../themes/workspaceTheme");
const styler = require("@smartface/styler/lib/styler");
const styling = styler(styles);

function raiseTargetNotfound(target){
	return function (message = "Component cannot be found.") {
		throw new Error(`[${target}] ${message}`);
	};
}


function removeSelection(context, state) {
	if(!state.selectedDay)
		return;
	
	context
		.find(state.selectedDay, {removeClassName: raiseTargetNotfound(state.selectedDay)})
		.removeClassName(".calendar.day-selected");
	delete state.selectedDay;
}

function resetDays(days, actor) {
	// days.forEach(function(name) {
	if(actor.getClassName() != ".calendar.day") {
		actor.resetClassNames([".calendar.day"]);
	}
	// });
}

// reducer for context's components
function reducer(context, action, target) {
	const newState = context.getState();
	
	switch(action.type) {
		case INIT_CONTEXT_ACTION_TYPE:
			newState.days = context.reduce((acc, actor, name) => {
				if(name.indexOf("_weekDay") > 0)
					acc.push(name)
				return acc;
			}, []);

			return newState;
		case "resetDays":
			context.map(resetDays.bind(null, newState.days));
			break;
		case "daySelected":
			let selected = context.find(newState.selectedDay);
			if(selected){
				removeSelection(context, newState);
				context
					.find(target, {pushClassName: raiseTargetNotfound(target)})
					.pushClassName(".calendar.day-selected");
				newState.selectedDay = target;
			}

			return newState;
		case "clearSelectedDay":
			removeSelection(context, newState);
			break;
		case "changeMonth":
			removeSelection(context, newState);
			break;
		case "changeCalendar":
		  context.forEach(function(actor){
		    const className = actor.getInitialClassName();
		    
		    actor.resetClassNames([className,
		    	className+"-lang_"+action.lang, 
		    	"#"+actor.name, 
		    	"#"+actor.name+"-lang_"+action.lang,
		    	"#"+actor.name+"-os_"+System.OS
	    	]);
		    // actor.pushClassName("#"+actor.name+"-os_"+System.OS);
		  });
		  
		  break;
		case "updateDayType":
			const actor = context.find(target);
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
		// case 'calendar_navbar_prevMonth':
		// case 'calendar_navbar_nextMonth':
			// return ".calendar.header_navbar_arrow";
		// case 'calendar_navbar_monthLabel':
		// 	return ".calendar.header_navbar_monthLabel";
		// case 'calendar_calendarYear_yearLabel':
		// 	return ".calendar_calendarYear_yearLabel";
		// case 'calendar_body':
		// 	return ".calendar.body";
		// case 'calendar_calendarDays':
		// 	return ".calendar.header_dayNames";
	}

	return ".calendar";
}

//TOOD: add classnameFactory to fromSFComponent

function createContext(component) {
	/*var styleContext = fromSFComponent(
		component,
		"calendar",
		function(hook) {//context hooks
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
		},
		classNameMap
	);

	// creates an initial styling for the context
	var context = styleContext(
		styling,
		reducer
	);*/
	
	
	let context = pageContext(component, "calendar", reducer, classNameMap);
	context(styling);
	
	return function setStyle(newStyles) {
		try {
			const styling = styler(styles, newStyles);
			// injects a new styling to the context
			context(styling, reducer);
		} catch(e) {
			alert(e.message);
		}
	};
}

module.exports = createContext;
