const flatStyler = require("@smartface/styler/lib/flatStyler");
const StyleContext = require("../services/StyleContext");
const getPropsFromStyle = require("library/styler-builder").getPropsFromStyle;

const styles = {
	".header": {
		"&_navbar": {
			"&_arrow" : {
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
	".body": {
	},
	".day": {
		"font": {
	      "size": 16,
	      "bold": false,
	      "italic": false,
	      "family": "Arial"
	    },
		"borderRadius": 26,
		"textColor": "#000000",
		"backgroundColor": "rgba(0,0,0,0)",
		"&-inrange": {
    	"backgorundColor": "rgba(0,185,255,42)",
			"textColor": "#000000",
		},
    "&-selected": {
    	"backgorundColor": "rgba(0,185,255,42)",
			"textColor": "#000000",
    },
		".deactiveDays": {
			"borderRadius": 10,
			"textColor": "",
			"backgroundColor": "",
		},
		".specialDays": {
			"&-selected": {
				"@extend": ".day-selected",
			},
			"borderRadius": 10,
			"textColor": "",
			"backgroundColor": "",
		},
		".holidays": {
			"borderRadius": 10,
			"textColor": "",
			"backgroundColor": "",
		}
	}
};


var styler = flatStyler(styles);

function createContext(component){
	var styleContext = StyleContext.fromSFComponent(
		component,
		"calendar",
		//initial classNames
		function(name){
			if(name.indexOf("weekday") == 0){
				return '.calendar.day';
			}
			
			switch (name) {
				case 'navbar':
					return ".header .header_navbar_label";
				case 'body':
					return ".body";
			}
			
			return ".calendar";
	  }
	);
	
	var context = styleContext(
		function(className){
			return function getStyle() {
				return getPropsFromStyle(styler, className);
			}
		},
		// reducer for context's components
	  function(state, action, target){
	  	const newState = Object.assign({}, state);

	  	switch(action){
	  		case "daySelected":
	  			
	  			if(newState.selectedDay)
	  				newState.actors[newState.selected].setClassName(".calendar.day .calendar.day-selected");
	  			
	  			newState.actors[target].setClassName(".calendar.day .calendar.day-selected");
	  			newState.selectedDay = target;
	
	  			return newState;
	  			break;
	  		case "clearSelectedDay":
	  			newState.actors[target].setClassName(".calendar.day");
	  			break;
	  	}
	  }
	);
}

module.exports = {
  registerStyle: function(style){
    
  },
  createContext: createContext
}
