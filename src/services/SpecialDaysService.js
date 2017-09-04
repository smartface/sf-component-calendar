
/**
 * @typedef {Object} SpecialDayType
 * @property {!string} availableLangs - languages stack
 * @property {!Object.<string, string>} text - texts by language
 * @property {!number} [1] length - how many days it continues
 * @example
 * ...
  	availableLangs: "en,tr",
      "text": {
      	"*": "New Year",
      	"tr": "Yeni Yil"
      }
  ...
 * 
 * @typedef {string} SpecialDayType~calendarType
 * @value '*' All calendars
 * @value 'hijri' Hijri calendar 
 * @value 'gregorian' Gregorian calendar 
 */

/**
 * @typedef {Object.<SpecialDayType~calendarType, SpecialDayType>} SpecialDay~SpecialDayType
 * @example 
 * ...
  	"gregorian": {
    	availableLangs: "en,tr",
    	"text": {
    		"*": "New Year",
    		"tr": "Yeni Yil"
    	}
    },
    length: 2
  ...
 * 
 * 
 * @typedef {Array.<SpecialDay>} SpecialDays~SpecialDayType
 * @typedef {Object.<string, SpecialDays>} SpecialDaysMonth~SpecialDayType
 * @typedef {Object.<string, Array.<SpecialDaysMonth>>} SpecialDaysYear~SpecialDayType
 */

/*day-0": [],
*/
/**
 * @exports createSpecialDaysService
 *
 */
export default 
  /**
   * Returns a special days wrapper service
   * 
   * @param {{byYears: Object.<string, SpecialDaysYear>, byMonths: Object.<string, SpecialDaysMonth>} specialDays
   * @returns {{getSpecialDay:function, getBundle:function, getRaw:function}}
   */
  function createSpecialDaysService(specialDays){
    const specialDaysBundle = denormalizeSpecialDays(specialDays);
    
    // console.log(JSON.stringify(specialDaysBundle));
    
    return Object.freeze({
      /**
       * Get a specialday by specified props
       * 
       * @param {{!year:number, !month:number, !day:number, !calendar:string, !lang:string}}
       * @returns {{getText:function}}
       */
      getSpecialDay({year=0, month, day, calendar, lang}){
        const keyByYear = getKey({year, month, day, calendar});
        const keyByMonth = getKey({month, day, calendar});
        const keyByYearandAllCalendars = getKey({year, month, day, calendar: "*"});
        const keyByMonthandAllCalendars = getKey({month, day, calendar: "*"});
        
        // console.log(day, month, calendar, specialDaysBundle[keyByMonth]);
        const selectedDays = [].concat(
          specialDaysBundle[keyByYear] || [], 
          specialDaysBundle[keyByMonth] || [],
          specialDaysBundle[keyByYearandAllCalendars] || [],
          specialDaysBundle[keyByMonthandAllCalendars] || []
        );
          
        const selectedDay = selectedDays.filter(aday => {
          return !aday.langs.some(ln => ln === "~"+lang) ||
            aday.langs.some(ln => ln === "*") ||
            aday.langs.some(ln => ln === lang);
        });
          
        return selectedDay.map(day => day.text[lang] || day.text["*"]);
      },
      getBundle(){
        return specialDaysBundle;
      },
      getRaw(){
        return specialDays;
      }
    });
  }
  
export function getKey({year=0, month, day, calendar}){
  return year
    ? "m-"+year+"-"+month+"-"+day+"-"+calendar
    : "m-"+month+"-"+day+"-"+calendar;
}

/**
 * 
 * @private
 * 
 * @returns {Object}
 */
function denormalizeSpecialDays(specialDays){
  specialDays = specialDays || {};
  const byYears = specialDays["byYears"] || [];
  const byMonths = specialDays["byMonths"] || [];
  const acc = {};
  
  byYears.forEach((year) => {
    year.months.forEach(month => {
      month.days.forEach(day => {
        const newday = {};
        newday.day = day.day;

        Object.keys(day.calendars).forEach(calendar => {
          const key = "m-"+year.year+"-"+month.month+"-"+day.day+"-"+calendar;
          acc[key] = acc[key] || [];
          newday.text = Object.assign({}, day.calendars[calendar].text);
          newday.langs = day.calendars[calendar].availableLangs.split(",");
          acc[key].push(newday);
          
          for(let i = 1; i <= day.length-1; i++){
            let key = "m-"+year.year+"-"+month.month+"-"+(day.day+i)+"-"+calendar;
            acc[key] = acc[key] || [];
            
            acc[key].push(newday);
          }
        })
      });
    });
  });
  
  byMonths.forEach(month => {
    month.days.forEach(day => {
      const newday = {};
      newday.day = day.day;
      
      Object.keys(day.calendars).forEach(calendar => {
        const key = "m-"+month.month+"-"+day.day+"-"+calendar;
        acc[key] = acc[key] || [];
        acc[key].push(newday);
        newday.text = Object.assign({}, day.calendars[calendar].text);
        newday.langs = day.calendars[calendar].availableLangs.split(",");
        
        for(let i = 1; i < day.length; i++){
          let key = "m-"+month.month+"-"+(day.day+i)+"-"+calendar;
          
          acc[key] = acc[key] || [];
          acc[key].push(newday);
        }
      })
    });
  });
  
  return acc;
}
