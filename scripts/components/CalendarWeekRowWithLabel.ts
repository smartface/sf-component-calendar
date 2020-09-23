import CalendarWeekRowWithLabelDesign from 'generated/my-components/CalendarWeekRowWithLabel';

export default class CalendarWeekRowWithLabel extends CalendarWeekRowWithLabelDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
