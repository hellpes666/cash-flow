import { PartialType } from '@nestjs/mapped-types';

import { SetGoalDto } from '../set-goal.dto';

export class UpdateSetGoalDto extends PartialType(SetGoalDto) {}
