export interface SetGoalPayload {
	goalValue: number;
	startDate: Date;
	endDate: Date;

	name?: string;
	comment?: string;
}
