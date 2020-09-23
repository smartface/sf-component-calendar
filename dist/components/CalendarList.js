var extend = require('js-base/core/extend');
var CalendarListDesign = require('library/CalendarList');
var CalendarList = extend(CalendarListDesign)(
//constructor
function (_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || {});
    this.pageName = pageName;
});
module && (module.exports = CalendarList);
//# sourceMappingURL=CalendarList.js.map