import { Injectable } from '@nestjs/common';

import { Prisma, UserGoal } from 'prisma/generated/prisma';
import { PrismaService } from 'src/lib';
import { AsyncServiceResponseType } from 'src/types';

import { SetGoalPayload, UpdateSetGoalPayload } from '../types';

@Injectable()
export class GoalService {
	public constructor(private readonly prismaService: PrismaService) {}

	//TODO: добавить после нотификашек сюда каждый месяц услонво
	public async setGoal(
		payload: SetGoalPayload,
		userId: string
	): AsyncServiceResponseType<UserGoal> {
		const setGoal = await this.prismaService.userGoal.create({
			data: {
				...payload,
				userId,
			},
		});

		if (setGoal) {
			return {
				isSuccess: true,
				data: setGoal,
			};
		}

		return {
			isSuccess: false,
			errorMessage:
				'Не удалось создать цель! Пожалуйста, попробуйте снова',
		};
	}

	public async updateSetGoal(
		payload: UpdateSetGoalPayload,
		userId: string
	): AsyncServiceResponseType<UserGoal> {
		const userGoal = await this.findSetGoal({ userId, id: payload.id });

		if (!userGoal.isSuccess) {
			return userGoal;
		}

		const updatedUserGoal = await this.prismaService.userGoal.update({
			where: {
				id: userGoal.data.id,
			},

			data: {
				...payload,
			},
		});

		if (updatedUserGoal) {
			return {
				isSuccess: true,
				data: updatedUserGoal,
			};
		}

		return { isSuccess: false, errorMessage: 'Не удалось обновить цель' };
	}

	//TODO вынести во что-то общее
	private async findSetGoal(
		query: Prisma.UserGoalWhereUniqueInput
	): AsyncServiceResponseType<UserGoal> {
		const userGoal = await this.prismaService.userGoal.findUnique({
			where: query,
		});

		if (userGoal) {
			return {
				isSuccess: true,
				data: userGoal,
			};
		}

		return {
			isSuccess: false,
			errorMessage: 'Цель не найдена',
		};
	}
}
