import specialDaysData from "./mock/specialDays";
import createSpecialDaysService, { getKey } from "../src/services/SpecialDaysService";
import {
	expect
} from "chai";

describe("Special Days Service", function() {
	const service = createSpecialDaysService(specialDaysData);
	
	it("Special Days Service", function() {
		expect(service.getBundle())
			.to.eql({
				"m-2018-1-1-gregorian": [{
					"day": 1,
					"text": {
						"*": "Happy New Year",
						"tr": "Mutlu Yeni Yillar"
					},
					"langs": ["en", "tr", "~ar"]
				}],
				"m-1-1-gregorian": [{
					"day": 1,
					"text": {
						"*": "in all langs",
						"tr": "just in turkish"
					},
					"langs": ["en", "tr"]
				}],
				"m-1-2-gregorian": [{
					"day": 1,
					"text": {
						"*": "in all langs",
						"tr": "just in turkish"
					},
					"langs": ["en", "tr"]
				}],
				"m-1-7-*": [{
					"day": 7,
					"text": {
						"*": "in all langs",
						"tr": "just in turkish"
					},
					"langs": ["en", "tr"]
				}],
				"m-4-12-*": [{
					"day": 12,
					"text": {
						"*": "in all langs",
						"ar": "just in arabic"
					},
					"langs": ["en", "ar"]
				}]
			});
	});
	
	it("generate data key", () => {
	  const keyByYear = getKey({year: 2018, month: 1, day: 1, calendar: "gregorian"});
    const keyByMonth = getKey({month: 1, day: 1, calendar: "gregorian"});
    const keyByYearandAllCalendars = getKey({year: 2018, month: 1, day: 1, calendar: "*"});
    const keyByMonthandAllCalendars = getKey({month: 1, day: 1, calendar: "*"});
    
    expect(keyByYear).to.equal("m-2018-1-1-gregorian");
    expect(keyByMonth).to.equal("m-1-1-gregorian");
    expect(keyByYearandAllCalendars).to.equal("m-2018-1-1-*");
    expect(keyByMonthandAllCalendars).to.equal("m-1-1-*");
	})

	it("return a valid specialday", function() {
		let day = service.getSpecialDay({});
		expect(day)
			.to.eql([]);

		day = service.getSpecialDay({year: 2018, month: 1, day: 1, calendar: "gregorian", lang: "en"});
		expect(day)
			.to.eql(["Happy New Year", "in all langs"]);

		day = service.getSpecialDay({year: 2018, month: 1, day: 1, calendar: "gregorian", lang: "tr"});
		expect(day)
			.to.eql(["Mutlu Yeni Yillar", "just in turkish"]);

		day = service.getSpecialDay({year: 2018, month: 1, day: 1, calendar: "gregorian", lang: "de"});
		expect(day)
			.to.eql(["Happy New Year", "in all langs"]);
	});

	it("return selected day when calendar collide with all operator(*)", function() {
		let day = service.getSpecialDay({year: 2018, month: 1, day: 1, calendar: "gregorian", lang: "ar"});
		expect(day)
			.to.eql(["in all langs"]);
	});
	
	it("return false when lang collide with except operator(~)", function() {
		let day = service.getSpecialDay({year: 2018, month: 1, day: 1, calendar: "gregorian", lang: "ar"});
		expect(day)
			.to.eql(["in all langs"]);
	});
});
