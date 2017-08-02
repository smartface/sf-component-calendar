/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const NewPage001Design = require('ui/ui_newPage001');

const NewPage001 = extend(NewPage001Design)(
	// Constructor
	function(_super){
		// Initalizes super class for this page scope
		_super(this);
		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		
});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
  superOnShow();
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	superOnLoad();
}

module && (module.exports = NewPage001);