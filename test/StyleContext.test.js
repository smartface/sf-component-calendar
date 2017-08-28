import {
	createStyleContext, 
	makeStylable, 
	fromSFComponent
} from "../src/services/StyleContext";
import {expect} from "chai";
import Component from "./mock/Component";
import styler_ from "@smartface/styler/lib/styler";
import { INIT_CONTEXT_ACTION_TYPE } from "../src/services/Context";


const style = {
	".calendar": {
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
	    	"backgroundColor": "rgba(0,185,255,42)",
				"textColor": "#000000",
			},
	    "&-selected": {
	    	"backgroundColor": "rgba(0,185,255,42)",
				"textColor": "#000000",
	    },
			".deactiveDays": {
				"borderRadius": 10,
				"textColor": "",
				"backgroundColor": "",
			},
			".specialDays": {
				"&-selected": {
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
	}
};

/*
  Developer wants to change style without to create new instance of components
  Developer wants to be assigned styles automaticly
*/

describe("Style Context", function() {
  describe("Create context", function() {
  	/*it("should be flat all nested childrens", () => {
      const component = new Component("calendar");
      component.addChild("navbar", new Component("navbar"));
      component.addChild("body", new Component("body"));
      component.addChild("week", new Component("week"));
      component.children.week.addChild("day1", new Component("day1"));
      component.children.week.addChild("day2", new Component("day2"));
			component.children.week.addChild("day3", new Component("day3"));
      
  		fromSFComponent(component, "calendar", _=>_)
  	})*/
    it("should be create a style context", function() {
      const component = new Component("calendar");
      component.addChild("navbar", new Component("navbar"));
      component.addChild("body", new Component("body"));
      component.addChild("week", new Component("week"));
      component.children.week.addChild("day1", new Component("day1"));
      component.children.week.addChild("day2", new Component("day2"));
			component.children.week.addChild("day3", new Component("day3"));
      
      var styleContext = fromSFComponent(
    		component,
    		"calendar",
    		//initial classNames
    		function(name){
    			if(name.indexOf("day") > 0){
    				return '.calendar.day';
    			}
    			
    			switch (name) {
    				case 'calendar_navbar':
    					return ".calendar.header_navbar_label";
    				case 'calendar_body':
    					return ".calendar.header_navbar_daynames.weekday";
    			}
    			
					return ".calendar";
	      }
      );

      var styling = styler_(style);
      var context = styleContext(
      	styling,
      	// reducer for context's components
	      function(state, actors, action, target){
	      	const newState = Object.assign({}, state);
	      	if(target === undefined){
	      		return;
	      	}

	      	switch(action){
	      		case INIT_CONTEXT_ACTION_TYPE:
	      			actors[target].pushClassName(".calendar.day");
	      			break;
	      		case "daySelected":
	      			if(newState.selected){
	      				actors[newState.selected].removeClassName(".calendar.day-selected");
	      			}
	      			
	      			actors[target].pushClassName(".calendar.day-selected");
	      			newState.selected = target;

	      			return newState;
	      			break;
	      		case "clearSelected":
	      			actors[target].setClassName(".calendar.day");
	      			break;
	      	}
	      }
      );
      
      var actors = context.map(actor => actor);
      component.children.week.children.day1.changeState("daySelected");
      {
      	const actor = actors.find(actor => actor.name === "calendar_week_day1");
				const {context, name, dispatcher, children, ...style} = component.children.week.children.day1;
				expect(".calendar.day .calendar.day-selected").to.eql(actor.getClassName());
				expect(style).to.eql(styling(".calendar.day .calendar.day-selected")());
      }

      expect(actors.length).to.equal(7);
    });
  });
});
