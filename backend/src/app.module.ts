import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
	AccountModule,
	ActionsModule,
	AuthModule,
	IntegrationsModule,
	UserModule,
} from './domains';
import { PrismaModule } from './lib';

@Module({
	imports: [
        PrismaModule,
        
		    ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
		}),

		    UserModule,
		    IntegrationsModule,
		    ActionsModule,
		AccountModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
