import CalendarDayDesign from 'generated/my-components/CalendarDay';

export default class CalendarDay extends CalendarDayDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
        this.pageName = pageName;
        
        this.children.dayNum.onTouch = (e) => {
			let timeout;
			let isLongPress = false;
			
			this.onPress && this.onPress.call(this, e);
			
			timeout = setTimeout(() => {
				isLongPress = true;
				isLongPress && this.onLongPress && this.onLongPress.call(this, e);
			}, 300);

			this.children.dayNum.onTouchEnded = () => {
				clearTimeout(timeout);
				this.children.dayNum.onTouchEnded = function(){};
				// !isLongPress && this.onPress && this.onPress.call(this, e);
				isLongPress = false;
			};
		};
    }
    onPress: () => {}
    onLongPress: () => {}
    setDay(data){
        this.children.dayNum.text = data.localeDay;
        this.children.dayNum.dispatch({
            type: "updateDayType",
            data: data
        });
    };
    
    activate(){
        this.dispatch({
            type: "pushClassNames",
            classNames: ".calendar.day-selected"
        });
        this.children.dayNum.dispatch({
            type: "pushClassNames",
            classNames: ".calendar.day_label-rangeSelected"
        });
    }
    
    select(){
        this.children.dayNum.dispatch({
            type: "daySelected"
        });
    };
    
    clearSelected(){
    };
}
