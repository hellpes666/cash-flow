import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { RMQ_ORDERS_QUEUE } from './lib';

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

	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [
				`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}:5672`,
			],
			queue: RMQ_ORDERS_QUEUE,
			prefetchCount: 10,
			persistent: true,
			noAck: false,
			queueOptions: {
				durable: true,
			},
			socketOptions: {
				heartbeatIntervalInSeconds: 60,
				reconnectTimeInSeconds: 5,
			},
		},
	});

	await app.startAllMicroservices();

	const port = process.env.PORT ?? 3000;
	await app.listen(port);

	const logger = new Logger('Bootstrap');
	logger.log(`🚀 Server is running on http://localhost:${port}`);
}

bootstrap();
