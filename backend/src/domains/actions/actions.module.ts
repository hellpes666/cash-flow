import { Module } from '@nestjs/common';

import { AccountModule } from '../account';

import { ActionsController } from './actions.controller';
import { ACTION_SERVICES } from './services';

@Module({
	imports: [AccountModule],
	controllers: [ActionsController],
	providers: [...ACTION_SERVICES],
})
export class ActionsModule {}
