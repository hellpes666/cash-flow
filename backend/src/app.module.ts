import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
		JwtModule.register({
			secret: 'hard!to-guess_secret',
			signOptions: { expiresIn: '60m' },
			global: true,
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
