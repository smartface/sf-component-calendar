


export type SpecialDay = {
    day: number,
    calendars: {[key: string]: SpecialDayCalendar}
    length: number;
}

export type SpecialMonth = {
    month: number,
    days: SpecialDay[]
}
export type SpecialYear = {
    year: number,
    months: SpecialMonth[],
}
export type SpecialDayCalendar = {
    availableLangs: string,
    text: {[lang: string]: string},
}

export type SpecialDaysData = {
    byYears: SpecialYear[],
    byMonths: SpecialMonth[]
}

export type SpecialDaysBundle = {[key:string]: SpecialDaysBundle};
export type SpecialDaysBundleElement = {day: number, text: {[key: string]: string}, langs: string[]};
export type SpecialDaysService = {
    getSpecialDay(props: {year:number, month:number, day:number, calendar: string, lang: string}): string[];
    getBundle():SpecialDaysBundle,
    getRaw():SpecialDaysData
}

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
  function createSpecialDaysService(specialDays: SpecialDaysData): SpecialDaysService {
    const specialDaysBundle = denormalizeSpecialDays(specialDays);
    const cache = {};
    
    return {
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
        const selectedDays: SpecialDaysBundleElement[] = [].concat(
          specialDaysBundle[keyByYear] || [], 
          specialDaysBundle[keyByMonth] || [],
          specialDaysBundle[keyByYearandAllCalendars] || [],
          specialDaysBundle[keyByMonthandAllCalendars] || []
        );

        cache[`${keyByYear}-${keyByMonth}-${keyByYearandAllCalendars}-${keyByMonthandAllCalendars}`] = selectedDays;

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
    };
  }
  
export function getKey({year=0, month, day, calendar}){
  return year
    ? "m-"+year+"-"+month+"-"+day+"-"+calendar
    : "m-"+month+"-"+day+"-"+calendar;
}

export type SpecialDays = {
    byYears: any[];
    byMonths: any[]
}

// export type SpecialDay = {day: number, text: {[key: string]: string}, langs: string[]};
/**
 * 
 * @private
 * 
 * @returns {Object}
 */
function denormalizeSpecialDays(specialDays: SpecialDaysData): SpecialDaysBundle {
  const byYears = specialDays.byYears || [];
  const byMonths = specialDays.byMonths || [];
  const acc = {};
  
  byYears.forEach((year) => {
    year.months.forEach(month => {
      month.days.forEach(day => {
        const newday: SpecialDaysBundleElement = {day: NaN, text: {}, langs: []};
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
        });
      });
    });
  });
  
  byMonths.forEach(month => {
    month.days.forEach(day => {
      const newday: SpecialDaysBundleElement = {day: NaN, text: {}, langs: []};
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
      });
    });
  });
  
  return acc;
}
