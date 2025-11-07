import { Module } from '@nestjs/common';

import {
    AccountModule,
	ActionsModule,
	AuthModule,
	IntegrationsModule,
	UserModule,
} from './domains';
import { PrismaModule } from './lib';
import { ConfigModule } from '@nestjs/config';

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
