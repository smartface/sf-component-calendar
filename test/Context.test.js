import {
	createStyleContext, 
	makeStylable, 
	fromSFComponent
} from "../src/services/StyleContext";
import {expect} from "chai";
import Component from "./mock/Component";
import flatStyler from "@smartface/styler/lib/flatStyler";

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
      component.addChild("week1", new Component("week"));
      component.addChild("week2", new Component("week"));
      component.children.week1.addChild("day1", new Component("day1"));
      component.children.week1.addChild("day2", new Component("day2"));
			component.children.week1.addChild("day3", new Component("day3"));

      component.children.week2.addChild("day1", new Component("day1"));
      component.children.week2.addChild("day2", new Component("day2"));
			component.children.week2.addChild("day3", new Component("day3"));
      
      var styleContext = fromSFComponent(
    		component,
    		"calendar",
    		//initial classNames
    		function(name){
    			if(name.indexOf("day") == 0){
    				return '.calendar.day';
    			}
    			
    			switch (name) {
    				case 'navbar':
    					return ".header .header_navbar_label";
    				case 'body':
    					return ".header_navbar_daynames.weekday";
    			}
    			
					return ".calendar";
	      }
      );

      var styler = flatStyler(style);
      var context = styleContext(
      	styler,
      	// actions for context's components
	      function reducer(state, action, target){
	      	const newState = Object.assign({}, state);
	      	
	      	switch(action){
	      		case "daySelected":
	      			if(newState.selected){
	      				newState.actors[newState.selected].removeClassName(".calendar.day-selected");
	      			}
	      			
	      			newState.actors[target].pushClassName(".calendar.day");
	      			newState.actors[target].pushClassName(".calendar.day-selected");
	      			newState.selected = target;

	      			return newState;
	      		case "clearSelected":
	      			newState.actors[target].removeClassName(".calendar.day-selected");
	      			break;
	      	}
	      }
      );
      
      var actors = context.map(actor => actor);
      component.children.week1.children.day1.changeState("daySelected");

      {
				const {context, name, dispatcher, children, ...style} = component.children.week1.children.day1;
				expect(style).to.eql(styler(".calendar.day .calendar.day-selected")());
      }
			
			{
				const actor = context.map(actor => actor).find(actor => actor.name === "calendar_week1_day1");
				expect(actor.getClassName()).to.eql(".calendar .calendar.day .calendar.day-selected");
			}
			
      component.children.week1.children.day2.changeState("daySelected");

      {
				const {context, name, dispatcher, children, ...style} = component.children.week1.children.day2;
				expect(style).to.eql(styler(".calendar.day .calendar.day-selected")());
      }

			{
				const actor = context.map(actor => actor).find(actor => actor.name === "calendar_week1_day1");
				expect(actor.getClassName()).to.eql(".calendar .calendar.day");
			}

      component.children.week1.children.day3.changeState("daySelected");
			
      {
				const {context, name, dispatcher, children, ...style} = component.children.week1.children.day3;
				expect(style).to.eql(styler(".calendar.day .calendar.day-selected")());
      }
			
      expect(actors.length).to.equal(11);
    });
  });
});
