import { Injectable } from '@nestjs/common';

import { Prisma, UserGoal } from 'prisma/generated/prisma';
import { PrismaService, returnBasicAsyncEntity } from 'src/lib';
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

		return returnBasicAsyncEntity(
			setGoal,
			'Не удалось создать цель! Пожалуйста, попробуйте снова'
		);
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

		return returnBasicAsyncEntity(
			updatedUserGoal,
			'Не удалось обновить цель'
		);
	}

	private async findSetGoal(
		query: Prisma.UserGoalWhereUniqueInput
	): AsyncServiceResponseType<UserGoal> {
		const userGoal = await this.prismaService.userGoal.findUnique({
			where: query,
		});

		return returnBasicAsyncEntity(userGoal, 'Цель не найдена');
	}
}
