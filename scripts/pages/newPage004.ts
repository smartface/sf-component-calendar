import NewPage004Design from 'generated/pages/newPage004';
import Button = require('sf-core/ui/button');
import pageContextPatch from '@smartface/contx/lib/smartface/pageContextPatch';
import Calendar from 'components/Calendar';
import CalendarCore from 'core/CalendarCore';
import specialDays from "./specialDays";

export default class NewPage004 extends NewPage004Design {
    calendar = new Calendar();
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        
        this.calendar.changeCalendar("tr");
        
        this.addChild(this.calendar);
        this.calendar.top = 100;
        this.calendar.onDaySelect = (data) => {
            console.log(data);
        };
        this.button1.onPress = () => {
            this.calendar.setSpecialDays(specialDays);
        };
	}
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    
    // this.addChild(this.calendar);
    	// this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
    this.calendar.applyLayout();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
	superOnLoad();
}
