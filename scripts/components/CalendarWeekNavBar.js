/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CalendarWeekNavBarDesign = require('library/CalendarWeekNavBar');

const CalendarWeekNavBar = extend(CalendarWeekNavBarDesign)(
  //constructor
  function(_super, props, pageName) {
    // initalizes super class for this scope
    _super(this, props || {});
    this.pageName = pageName;
    
    this.hideComp = function() {
      this.dispatch({
        type: "changeUserStyle",
        userStyle: (style) => {
          style.visible = false;
          style.height = 0;
          
          return style;
        }
      });
    }
    
    this.showComp = function() {
      this.dispatch({
        type: "changeUserStyle",
        userStyle: (style) => {
          style.visible = true;
          delete style.height;
          
          return style;
        }
      });
    }
  }

);

module && (module.exports = CalendarWeekNavBar);