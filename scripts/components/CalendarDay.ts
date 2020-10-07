import CalendarDayDesign from '../generated/my-components/CalendarDay';
import CalendarDayLabel from './CalendarDayLabel';
import { CalendarDayType } from '../services/CalendarDayType';

export default class CalendarDay extends CalendarDayDesign {
    pageName?: string | undefined;
    private dayNum: CalendarDayLabel = this.children.dayNum;

	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
        this.pageName = pageName;
        
        this.dayNum.onTouch = (e) => {
			let isLongPress = false;
						
			let timeout = setTimeout(() => {
				isLongPress = true;
				isLongPress && this.onLongPress && this.onLongPress.call(this, e);
			}, 300);

			this.dayNum.onTouchEnded = () => {
				clearTimeout(timeout);
				this.dayNum.onTouchEnded = function(){};
				!isLongPress && this.onPress && this.onPress.call(this, e);
				isLongPress = false;
			};
		};
    }
    onPress: () => {}
    onLongPress: () => {}
    setDay(data: CalendarDayType){
        this.dayNum.text = data.localeDay;
        this.dayNum.dispatch({
            type: "updateDayType",
            data: data
        });
    };
    
    activate(){
        this.dispatch({
            type: "pushClassNames",
            classNames: ".calendar.day-selected"
        });
        this.dayNum.dispatch({
            type: "pushClassNames",
            classNames: ".calendar.day_label-rangeSelected"
        });
    }
    
    select(){
        this.dayNum.dispatch({
            type: "daySelected"
        });
    };
    
    clearSelected(){
    };
}
