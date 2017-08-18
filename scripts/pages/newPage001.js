/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const NewPage001Design = require('ui/ui_newPage001');
const benchmark = require("../benchmarks/CalendarServices");
const runner = require("../benchmarks/runner");

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
			this.children.label2.text = date.dayInfo.day+"/"+(date.monthInfo.longName)+"/"+date.year;
		}.bind(this);
		
		this.children.button3.onPress = function(){
			this.children.calendar.addStyles({
				".calendar": {
					".header": {
						"&_navbar": {
							"&_monthLabel": {
								"textColor": "#F10000"
							}
						}
					}
				}
			})
		}.bind(this);
	}
);

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
  superOnShow();
  
  // this.children.calendar.setSelectedDate({
  // 	day: 16,
  // 	month: 9,
  // 	year: 2017
  // });
	this.children.calendar.now();
  
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth2");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth3");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth4");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth5");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth6");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth7");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth8");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth9");
	runner.add(this.children.calendar.nextMonth.bind(this.children.calendar), "nextMonth10");
	
	// runner.add(this.children.calendar.prevMonth.bind(this.children.calendar), "prevMonth");
	// runner.add(this.children.calendar.prevMonth.bind(this.children.calendar), "prevMonth2");
	// runner.add(this.children.calendar.prevMonth.bind(this.children.calendar), "prevMonth3");
	

	// setTimeout(function(){
		// runner.runAll(3, function(res){
		// 	res.forEach(function(item){
		// 		console.log(item.asString);
		// 	})
		// });
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