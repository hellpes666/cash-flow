import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'debug', 'verbose'],
	});

	const cookies = cookieParser();

	app.use(bodyParser.json({ limit: '10mb' }));
	app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
	app.use(cookies);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		})
	);

	app.enableCors({
		origin: true,
		credentials: true,
	});

	const port = process.env.PORT ?? 3000;
	await app.listen(port);

	const logger = new Logger('Bootstrap');
	logger.log(`🚀 Server is running on http://localhost:${port}`);
}

bootstrap();
