"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function instanceofDateObject(date) {
    return date.hasOwnProperty("year")
        && typeof date['year'] === 'number'
        && date.hasOwnProperty("month")
        && typeof date['month'] === 'number'
        && date.hasOwnProperty("day")
        && typeof date['day'] === 'number';
}
exports.instanceofDateObject = instanceofDateObject;
//# sourceMappingURL=instanceofDateObject.js.map