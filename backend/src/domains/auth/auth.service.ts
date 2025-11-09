import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { Prisma, User } from 'prisma/generated/prisma';
import { PrismaService, isProduction } from 'src/lib';
import {
	AsyncServiceResponseType,
	ServiceResponseType,
	StatusServiceResponseType,
} from 'src/types';

import { SALT_ROUNDS } from './constants';
import { CreateUserPayload, LoginUserPayload } from './types';

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService
	) {}

	public async createUser(
		request: Request,
		payload: CreateUserPayload
	): AsyncServiceResponseType<{ accessToken: string }> {
		const existingUser = await this.findUser({ email: payload.email });

		if (existingUser.isSuccess) {
			return {
				isSuccess: false,
				errorMessage: 'Пользователь уже существует',
			};
		}

		const passwordHash = await this.hashPassword(payload.password);

		if (!passwordHash.isSuccess) {
			return passwordHash;
		}

		const newUser = await this.prismaService.user.create({
			data: {
				email: payload.email,
				password: passwordHash.data.hash,
			},
		});

		return await this.getAuthToken(request, newUser.email, newUser.id);
	}

	public async loginUser(
		request: Request,
		payload: LoginUserPayload
	): AsyncServiceResponseType<{ accessToken: string }> {
		const user = await this.findUser({ email: payload.email });

		if (!user.isSuccess) {
			return {
				isSuccess: false,
				errorMessage: 'Пользователь не существует',
			};
		}

		const isPasswordValid = await bcrypt.compare(
			payload.password,
			user.data.password
		);

		if (!isPasswordValid) {
			return {
				isSuccess: false,
				errorMessage: 'Данные не валидны',
			};
		}

		return await this.getAuthToken(request, user.data.email, user.data.id);
	}

	public logoutUser(request: Request): StatusServiceResponseType {
		const { cookies } = request;
		const response = request.res;

		if (cookies?.refreshToken && response) {
			const zeroMaxAge = 0;
			const emptyRefreshTokenValue = '';

			this.setRefreshTokenToTheResponse(
				response,
				emptyRefreshTokenValue,
				zeroMaxAge
			);

			return {
				isSuccess: true,
			};
		}

		return {
			isSuccess: false,
		};
	}

	public async refreshUserAccess(
		request: Request
	): AsyncServiceResponseType<{ accessToken: string }> {
		const { cookies } = request;

		if (!cookies?.refreshToken) {
			return {
				isSuccess: false,
				errorMessage: 'Refresh token отсутствует',
			};
		}

		try {
			const decoded = await this.jwtService.verifyAsync<{
				email: string;
				sub: string;
			}>(cookies.refreshToken as string);

			const user = await this.findUser({ id: decoded.sub });

			if (!user.isSuccess) {
				return {
					isSuccess: false,
					errorMessage: 'Пользователь не найден',
				};
			}

			const tokens = await this.getAuthToken(
				request,
				user.data.email,
				user.data.id
			);

			if (!tokens.isSuccess) {
				return tokens;
			}

			return {
				isSuccess: true,
				data: {
					accessToken: tokens.data.accessToken,
				},
			};
		} catch (error: unknown) {
			return {
				isSuccess: false,
				errorMessage:
					error instanceof Error && error.name === 'TokenExpiredError'
						? 'Refresh token истёк'
						: 'Невалидный refresh token',
			};
		}
	}

	private async getAuthToken(
		request: Request,
		email: string,
		userId: string
	): AsyncServiceResponseType<{ accessToken: string }> {
		const payloadJwt = { email, sub: userId };

		const accessToken = await this.jwtService.signAsync(payloadJwt, {
			expiresIn: '15m',
		});

		const refreshToken = await this.jwtService.signAsync(payloadJwt, {
			expiresIn: '7d',
		});

		const response = request.res;

		if (!response) {
			return {
				isSuccess: false,
				errorMessage: 'unknown exception',
			};
		}

		const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

		this.setRefreshTokenToTheResponse(response, refreshToken, ONE_WEEK_MS);

		return { isSuccess: true, data: { accessToken } };
	}

	private setRefreshTokenToTheResponse(
		response: Response,
		refreshTokenValue: string,
		maxAge: number
	): void {
		response.cookie('refreshToken', refreshTokenValue, {
			maxAge,
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: isProduction(),
		});
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
		const user = await this.prismaService.user.findUnique({
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
			errorMessage: 'Пользователь не найден',
		};
	}
}
