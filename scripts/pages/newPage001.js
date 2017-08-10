/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const NewPage001Design = require('ui/ui_newPage001');
const benchmark = require("../benchmarks/CalendarServices");

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
	}
);

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
  superOnShow();
  this.children.calendar.setSelectedDate({
  	day: 30,
  	month: 11,
  	year: 2017
  })
  // alert(JSON.stringify(benchmark()))
  //console.log(benchmark());
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	superOnLoad();
}

module && (module.exports = NewPage001);