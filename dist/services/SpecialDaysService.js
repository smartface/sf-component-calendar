"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*day-0": [],
*/
/**
 * @exports createSpecialDaysService
 *
 */
function createSpecialDaysService(specialDays) {
    var specialDaysBundle = denormalizeSpecialDays(specialDays);
    var cache = {};
    return {
        /**
         * Get a specialday by specified props
         *
         * @param {{!year:number, !month:number, !day:number, !calendar:string, !lang:string}}
         * @returns {{getText:function}}
         */
        getSpecialDay: function (_a) {
            var _b = _a.year, year = _b === void 0 ? 0 : _b, month = _a.month, day = _a.day, calendar = _a.calendar, lang = _a.lang;
            var keyByYear = getKey({ year: year, month: month, day: day, calendar: calendar });
            var keyByMonth = getKey({ month: month, day: day, calendar: calendar });
            var keyByYearandAllCalendars = getKey({ year: year, month: month, day: day, calendar: "*" });
            var keyByMonthandAllCalendars = getKey({ month: month, day: day, calendar: "*" });
            // console.log(day, month, calendar, specialDaysBundle[keyByMonth]);
            var selectedDays = [].concat(specialDaysBundle[keyByYear] || [], specialDaysBundle[keyByMonth] || [], specialDaysBundle[keyByYearandAllCalendars] || [], specialDaysBundle[keyByMonthandAllCalendars] || []);
            cache[keyByYear + "-" + keyByMonth + "-" + keyByYearandAllCalendars + "-" + keyByMonthandAllCalendars] = selectedDays;
            var selectedDay = selectedDays.filter(function (aday) {
                return !aday.langs.some(function (ln) { return ln === "~" + lang; }) ||
                    aday.langs.some(function (ln) { return ln === "*"; }) ||
                    aday.langs.some(function (ln) { return ln === lang; });
            });
            return selectedDay.map(function (day) { return day.text[lang] || day.text["*"]; });
        },
        getBundle: function () {
            return specialDaysBundle;
        },
        getRaw: function () {
            return specialDays;
        }
    };
}
exports.default = createSpecialDaysService;
function getKey(_a) {
    var _b = _a.year, year = _b === void 0 ? 0 : _b, month = _a.month, day = _a.day, calendar = _a.calendar;
    return year
        ? "m-" + year + "-" + month + "-" + day + "-" + calendar
        : "m-" + month + "-" + day + "-" + calendar;
}
exports.getKey = getKey;
// export type SpecialDay = {day: number, text: {[key: string]: string}, langs: string[]};
/**
 *
 * @private
 *
 * @returns {Object}
 */
function denormalizeSpecialDays(specialDays) {
    var byYears = specialDays.byYears || [];
    var byMonths = specialDays.byMonths || [];
    var acc = {};
    byYears.forEach(function (year) {
        year.months.forEach(function (month) {
            month.days.forEach(function (day) {
                var newday = { day: NaN, text: {}, langs: [] };
                newday.day = day.day;
                Object.keys(day.calendars).forEach(function (calendar) {
                    var key = "m-" + year.year + "-" + month.month + "-" + day.day + "-" + calendar;
                    acc[key] = acc[key] || [];
                    newday.text = Object.assign({}, day.calendars[calendar].text);
                    newday.langs = day.calendars[calendar].availableLangs.split(",");
                    acc[key].push(newday);
                    for (var i = 1; i <= day.length - 1; i++) {
                        var key_1 = "m-" + year.year + "-" + month.month + "-" + (day.day + i) + "-" + calendar;
                        acc[key_1] = acc[key_1] || [];
                        acc[key_1].push(newday);
                    }
                });
            });
        });
    });
    byMonths.forEach(function (month) {
        month.days.forEach(function (day) {
            var newday = { day: NaN, text: {}, langs: [] };
            newday.day = day.day;
            Object.keys(day.calendars).forEach(function (calendar) {
                var key = "m-" + month.month + "-" + day.day + "-" + calendar;
                acc[key] = acc[key] || [];
                acc[key].push(newday);
                newday.text = Object.assign({}, day.calendars[calendar].text);
                newday.langs = day.calendars[calendar].availableLangs.split(",");
                for (var i = 1; i < day.length; i++) {
                    var key_2 = "m-" + month.month + "-" + (day.day + i) + "-" + calendar;
                    acc[key_2] = acc[key_2] || [];
                    acc[key_2].push(newday);
                }
            });
        });
    });
    return acc;
}
//# sourceMappingURL=SpecialDaysService.js.map