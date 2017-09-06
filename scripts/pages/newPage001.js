/* 
		You can modify its contents.
*/

const extend = require('js-base/core/extend');
const NewPage001Design = require('ui/ui_newPage001');
const benchmark = require("../benchmarks/CalendarServices");
const runner = require("../benchmarks/runner");
const calendarTypes = require("../components/CalendarTypes");
const specialDays = require("./specialDays");

const NewPage001 = extend(NewPage001Design)(
	// Constructor
	function(_super){
		// Initalizes super class for this page scope
		_super(this);
		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

		this.children.calendar.onChanged = function(date){
			alert(JSON.stringify(date, "", "  "));
			this.children.label2.text = date.date.day+"/"+(date.monthInfo.longName)+"/"+date.date.year;
			this.children.label2_1.text = date.dayInfo.specialDay.length > 0 
				? date.dayInfo.specialDay.join(" - ")
				: "Ozel Gun Yok";
		}.bind(this);
		
		this.children.buttonTR.onPress = function(){
			this.children.calendar.changeCalendar("tr");
		}.bind(this);
		
		this.children.buttonEN.onPress = function(){
			this.children.calendar.changeCalendar("en");
		}.bind(this);
		
		this.children.buttonAR.onPress = function(){
			this.children.calendar.changeCalendar("ar-sa");
		}.bind(this);
		
		this.children.buttonHijri.onPress = function(){
			this.children.calendar.changeCalendar("ar-sa", calendarTypes.HIJRI);
		}.bind(this);
		
		this.children.buttonGreg.onPress = function(){
			this.children.calendar.changeCalendar("en", calendarTypes.GREGORIAN);
		}.bind(this);
		
		this.children.button3.onPress = function(){
			this.children.calendar.addStyles({
				".calendar.header_navbar_monthLabel": {
					"textColor": "#F10000"
				}
			})
		}.bind(this);
	}
);

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
  superOnShow();
	this.children.calendar.changeCalendar("en", "gregorian", specialDays);
	this.children.calendar.onDisplayChange = function(){
		
	};

  // this.children.calendar.setSelectedDate({
  // 	day: 16,
  // 	month: 9,
  // 	year: 2017
  // });
	this.children.calendar.now();
	var fn = this.children.calendar.nextMonth.bind(this.children.calendar);
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
	
	// runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth5");
	// runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth6");
	// runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth7");
	// runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth8");
	// runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth9");
	// runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth10");
	
	// runner.add(this.children.calendar.prevMonth.bind(this.children.calendar), "prevMonth");
	// runner.add(this.children.calendar.prevMonth.bind(this.children.calendar), "prevMonth2");
	// runner.add(this.children.calendar.prevMonth.bind(this.children.calendar), "prevMonth3");

	// setTimeout(function(){
		runner.runAll(3, function(res){
			res.forEach(function(item, index){
				// console.log(index+":"+item.logs.length);
				console.log(index+":"+item.asString);
				// item.logs.forEach(function(log){
				// });
			});
		});
	// }
	// , 3)
  // alert(JSON.stringify(benchmark()))
  //console.log(benchmark());
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	superOnLoad();
}

module && (module.exports = NewPage001);