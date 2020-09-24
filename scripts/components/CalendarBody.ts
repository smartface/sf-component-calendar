import CalendarBodyDesign from '../generated/my-components/CalendarBody';

export default class CalendarBody extends CalendarBodyDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    componentDidEnter = function (dispatch) {
        this.dispatch = dispatch;
        dispatch({
            type: "changeUserStyle",
            animated: true,
            userStyle: (style) => {
                style.height = null;
                style.flexGrow = 0;
                delete style.alignSelf;

                return style;
            }
        });
    };
}
