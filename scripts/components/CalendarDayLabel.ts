import CalendarDayLabelDesign from '../generated/my-components/CalendarDayLabel';

export default class CalendarDayLabel extends CalendarDayLabelDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
