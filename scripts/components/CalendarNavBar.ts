import CalendarNavBarDesign from '../generated/my-components/CalendarNavBar';

export default class CalendarNavBar extends CalendarNavBarDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;

    this.nextMonth.onPress = () => {
      this.onNext();
    };

    this.prevMonth.onPress = () => {
      this.onPrev();
    };
  }

  onNext: () => void;
  onPrev: () => void;

  setTomonth(tomonth: boolean) {
    if (tomonth) {
      this.monthLabel.dispatch({
        type: 'tomonth'
      });
    }
  }

  weekMode(mode: boolean) {
    this.prevWeek.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        visible: mode
      }
    });
    this.nextWeek.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        visible: mode
      }
    });
  }

  setLabel(text: string) {
    this.monthLabel.text = text;
  }
}
