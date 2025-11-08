import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { Prisma, User } from 'prisma/generated/prisma';
import { PrismaService } from 'src/lib';
import { AsyncServiceResponseType, ServiceResponseType } from 'src/types';

import { SALT_ROUNDS } from './constants';
import { CreateUserPayload } from './types';

@Injectable()
export class AuthService {
	public constructor(private readonly prismaSerivce: PrismaService) {}

	public async createUser(
		request: Request,
		payload: CreateUserPayload
	): AsyncServiceResponseType<User> {
		const user = await this.findUser({ email: payload.email });

		if (user) {
			return {
				isSuccess: false,
				errorMessage: 'Пользователь уже существует',
			};
		}

		const passwordHash = await this.hashPassword(payload.password);

		if (!passwordHash.isSuccess) {
			return passwordHash;
		}

		return { isSuccess: true, data: {} as any };
	}

	private async hashPassword(
		password: string
	): Promise<ServiceResponseType<{ hash: string }>> {
		try {
			const hash = await bcrypt.hash(password, SALT_ROUNDS);

			return { isSuccess: true, data: { hash } };
		} catch (error: unknown) {
			return {
				isSuccess: false,
				errorMessage: `Hashing error: ${error instanceof Error ? error.message : String(error)}`,
			};
		}
	}

	private async findUser(
		query: Prisma.UserWhereUniqueInput
	): AsyncServiceResponseType<User> {
		const user = await this.prismaSerivce.user.findUnique({
			where: query,
		});

		if (user) {
			return {
				isSuccess: true,
				data: user,
			};
		}

		return {
			isSuccess: false,
			errorMessage: 'Полльзователь не найден',
		};
	}
}
