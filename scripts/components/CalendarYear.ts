import CalendarYearDesign from '../generated/my-components/CalendarYear';

export default class CalendarYear extends CalendarYearDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }

  setYear(year) {
    this.yearLabel.text = year;
  }
}
