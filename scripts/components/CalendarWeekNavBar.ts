import CalendarWeekNavBarDesign from '../generated/my-components/CalendarWeekNavBar';

export default class CalendarWeekNavBar extends CalendarWeekNavBarDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
