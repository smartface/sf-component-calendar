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
				"m-2018-0-0-gregorian": [{
					"day": 0,
					"text": {
						"*": "Happy New Year",
						"tr": "Mutlu Yeni Yillar"
					},
					"langs": ["en", "tr", "~ar"]
				}],
				"m-0-0-gregorian": [{
					"day": 0,
					"text": {
						"*": "in all langs",
						"tr": "just in turkish"
					},
					"langs": ["en", "tr"]
				}],
				"m-0-1-gregorian": [{
					"day": 0,
					"text": {
						"*": "in all langs",
						"tr": "just in turkish"
					},
					"langs": ["en", "tr"]
				}],
				"m-0-6-*": [{
					"day": 6,
					"text": {
						"*": "in all langs",
						"tr": "just in turkish"
					},
					"langs": ["en", "tr"]
				}],
				"m-3-11-*": [{
					"day": 11,
					"text": {
						"*": "in all langs",
						"ar": "just in arabic"
					},
					"langs": ["en", "ar"]
				}]
			});
	});
	
	it("generate data key", () => {
	  const keyByYear = getKey({year: 2018, month: 0, day: 0, calendar: "gregorian"});
    const keyByMonth = getKey({month: 0, day: 0, calendar: "gregorian"});
    const keyByYearandAllCalendars = getKey({year: 2018, month: 0, day: 0, calendar: "*"});
    const keyByMonthandAllCalendars = getKey({month: 0, day: 0, calendar: "*"});
    
    expect(keyByYear).to.equal("m-2018-0-0-gregorian");
    expect(keyByMonth).to.equal("m-0-0-gregorian");
    expect(keyByYearandAllCalendars).to.equal("m-2018-0-0-*");
    expect(keyByMonthandAllCalendars).to.equal("m-0-0-*");
	})

	it("return a valid specialday", function() {
		let day = service.getSpecialDay({});
		expect(day)
			.to.be.false;

		day = service.getSpecialDay({year: 2018, month: 0, day: 0, calendar: "gregorian", lang: "en"});
		expect(day.getText())
			.to.equal("Happy New Year");

		day = service.getSpecialDay({year: 2018, month: 0, day: 0, calendar: "gregorian", lang: "tr"});
		expect(day.getText())
			.to.equal("Mutlu Yeni Yillar");

		day = service.getSpecialDay({year: 2018, month: 0, day: 0, calendar: "gregorian", lang: "de"});
		expect(day.getText())
			.to.equal("Happy New Year");
	});

	it("return selected day when calendar collide with all operator(*)", function() {
		let day = service.getSpecialDay({year: 2018, month: 0, day: 0, calendar: "gregorian", lang: "ar"});
		expect(day)
			.to.be.false;
	});
	
	it("return false when lang collide with expect operator", function() {
		let day = service.getSpecialDay({year: 2018, month: 0, day: 0, calendar: "gregorian", lang: "ar"});
		expect(day)
			.to.be.false;
	});
	
});
