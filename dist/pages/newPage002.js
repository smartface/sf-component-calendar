"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
        You can modify its contents.
*/
var newPage002_1 = require("../generated/pages/newPage002");
// const CalendarList = require("../components/CalendarList");
var NewPage002 = extend(newPage002_1.default)(
// Constructor
function (_super) {
    // Initalizes super class for this page scope
    _super(this);
    // this.calendar = new CalendarList();
    // this.addChild(this.calendar);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
});
/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
}
/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
}
module && (module.exports = NewPage002);
//# sourceMappingURL=newPage002.js.map