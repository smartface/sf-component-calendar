// Benchmarks calendar iteraions
var CalendarService = require("../services/CalendarService");
var runner = require("./runner");
function getMonth() {
    var data = CalendarService.getCalendarMonth({ year: 2016, month: 1, day: 9 });
}
module.exports = function benchmark() {
    var results = [];
    results.push(runner(getMonth));
    return results;
};
//# sourceMappingURL=CalendarServices.js.map