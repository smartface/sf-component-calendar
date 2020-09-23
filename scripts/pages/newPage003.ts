/* 
		You can modify its contents.
*/
import NewPage003Design from '../generated/pages/newPage003';
import specialDays from "./specialDays";

class NewPage003 extends NewPage003Design {
    constructor() {
        super();
        this.children.calendar = this.children.calendarWeekly;
        delete this.children.calendarWeekly;

        // overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.children.calendar.onDaySelect = function (date) {
            // 	const day = date.date.day+"/"+(date.date.month)+"/"+date.date.year;
            // 	const sday = date.dayInfo.specialDay.length > 0 
            // 		? date.dayInfo.specialDay.join(" - ")
            // 		: "Ozel Gun Yok";
        }.bind(this);

        this.children.next.onPress = (argument) => {
            this.children.calendar.nextWeek();
        };

        this.children.prev.onPress = (argument) => {
            this.children.calendar.prevWeek();
        };

        this.children.now.onPress = (argument) => {
            this.children.calendar.setSelectedDate(new Date());
        };

        this.children.back.onPress = (argument) => {
            // Router.go("page1");
        };
    }
}
function changeCalendar(lang, calendar, sp) {
    this.calendar.changeCalendar(lang, calendar, sp);
    // 	this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
    this.calendar.applyLayout();
}


/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();

    changeCalendar.call(this, "en-us", "gregorian", specialDays);
    this.calendar.setSelectedDate({ "month": 11, "year": 2017, "day": 1 });
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
}

export default NewPage003;