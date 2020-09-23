"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var newPage001_1 = require("../generated/pages/newPage001");
// const benchmark = require("../benchmarks/CalendarServices");
// const runner = require("../benchmarks/runner");
var CalendarTypes_1 = require("../services/CalendarTypes");
var sample = {
    "byMonths": [
        {
            "month": 11,
            "days": [
                {
                    "day": 1,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 2,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 3,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 4,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 7,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 8,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 9,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 10,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 11,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 14,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 15,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 16,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 17,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 18,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 21,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 22,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 23,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 24,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 25,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 28,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 29,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 30,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                },
                {
                    "day": 31,
                    "calendars": {
                        "*": {
                            "availableLangs": "*",
                            "text": {
                                "*": "4"
                            }
                        }
                    },
                    "length": 1
                }
            ]
        }
    ]
};
function changeCalendar(lang, calendar, sp, dayOfWeek) {
    if (dayOfWeek === void 0) { dayOfWeek = 0; }
    this.children.calendar.changeCalendar(lang, calendar, sp, dayOfWeek);
    // 	this.calendar.setSelectedDate({"month":11,"year":2017,"day":1});
    this.children.calendar.applyLayout();
}
var NewPage001 = /** @class */ (function (_super) {
    __extends(NewPage001, _super);
    // Constructor
    function NewPage001() {
        var _this = 
        // Initalizes super class for this page scope
        _super.call(this) || this;
        // overrides super.onShow method
        _this.onShow = onShow.bind(_this, _this.onShow.bind(_this));
        // overrides super.onLoad method
        _this.onLoad = onLoad.bind(_this, _this.onLoad.bind(_this));
        _this.children.calendar.onLongPress = function () {
            _this.children.calendar.setWeekMode(true);
        };
        _this.children.calendar.onDaySelect = function (_a) {
            var date = _a[0];
            if (!date)
                return;
            _this.children.label2.text = date.date.day + "/" + (date.date.month) + "/" + date.date.year;
            _this.children.label2_1.text = date.dayInfo.specialDay.length > 0
                ? date.dayInfo.specialDay.join(" - ")
                : "Ozel Gun Yok";
        };
        _this.children.buttonTR.onPress = function () {
            changeCalendar.call(_this, "tr", "gregorian", sample);
            _this.children.calendar.setSelectedDate(new Date());
        };
        _this.children.buttonRange.onPress = function () {
            _this.children.calendar.setRangeDates({ day: 21, month: 10, year: 2017 }, { day: 12, month: 12, year: 2017 });
        };
        _this.children.buttonEN.onPress = function () {
            changeCalendar.call(_this, "en", "gregorian", sample);
        };
        _this.children.buttonAR.onPress = function () {
            changeCalendar.call(_this, "ar", "gregorian", sample);
        };
        _this.children.buttonHijri.onPress = function () {
            changeCalendar.call(_this, "ar-sa", CalendarTypes_1.CalendarTypes.HIJRI, sample);
        };
        _this.children.buttonGreg.onPress = function () {
            changeCalendar.call(_this, "fr", CalendarTypes_1.CalendarTypes.GREGORIAN, sample);
        };
        _this.children.nextPage.onPress = function () {
            _this.children.calendar.setWeekMode(!_this.children.calendar.getWeekMode());
        };
        _this.children.button3.onPress = function () {
            _this.children.calendar.addStyles({
                ".calendar.header_navbar_monthLabel": {
                    "textColor": "#F10000"
                }
            });
        };
        return _this;
    }
    return NewPage001;
}(newPage001_1.default));
// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
    superOnShow();
    changeCalendar.call(this, "en", CalendarTypes_1.CalendarTypes.GREGORIAN, sample, 2);
    this.calendar.setSelectedDate({ "month": 11, "year": 2017, "day": 1 });
    var fn = this.calendar.nextMonth.bind(this.calendar);
    // runner.add(fn, "nextMonth");
    // runner.add(fn, "nextMonth2");
    // runner.add(fn, "nextMonth3");
    // runner.add(fn, "nextMonth4");
    // runner.add(fn, "nextMonth5");
    // runner.add(fn, "nextMonth6");
    // runner.add(fn, "nextMonth7");
    // runner.add(fn, "nextMonth8");
    // runner.add(fn, "nextMonth9");
    // runner.add(fn, "nextMonth10");
    // runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth5");
    // runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth6");
    // runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth7");
    // runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth8");
    // runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth9");
    // runner.add(this.calendar.nextMonth.bind(this.calendar), "nextMonth10");
    // runner.add(this.calendar.prevMonth.bind(this.calendar), "prevMonth");
    // runner.add(this.calendar.prevMonth.bind(this.calendar), "prevMonth2");
    // runner.add(this.calendar.prevMonth.bind(this.calendar), "prevMonth3");
    // setTimeout(function(){
    // runner.runAll(3, function(res){
    // 	res.forEach(function(item, index){
    // 		// console.log(index+":"+item.logs.length);
    // 		console.log(index+":"+item.asString);
    // 		// item.logs.forEach(function(log){
    // 		// });
    // 	});
    // });
    // }
    // , 3)
    // alert(JSON.stringify(benchmark()))
    // console.log(benchmark());
}
// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
    superOnLoad();
}
exports.default = NewPage001;
//# sourceMappingURL=newPage001.js.map