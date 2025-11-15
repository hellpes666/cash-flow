import { SetGoalPayload } from '../set-goal.payload';

export interface UpdateSetGoalPayload extends Partial<SetGoalPayload> {
	id: string;
}
