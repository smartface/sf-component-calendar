import CalendarNavBarDesign from 'generated/my-components/CalendarNavBar';

export default class CalendarNavBar extends CalendarNavBarDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;

        this.children.nextMonth.onPress = () => {
            this.onNext();
        };

        this.children.prevMonth.onPress = () => {
            this.onPrev();
        };
    }

    onNext: () => {}
    onPrev: () => {}
    weekMode(mode: boolean) {
        this.children.prevWeek.dispatch({
            type: "updateUserStyle",
            userStyle: {
                visible: mode
            }
        });
        this.children.nextWeek.dispatch({
            type: "updateUserStyle",
            userStyle: {
                visible: mode
            }
        });
    }

    setLabel(text: string) {
        this.children.monthLabel.text = text;
    };
}
