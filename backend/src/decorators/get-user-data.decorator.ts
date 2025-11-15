import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from 'express';
import { User } from 'prisma/generated/prisma';

type UserData = Pick<User, 'id' | 'email'>;
interface RequestData {
	user: UserData;
}

export const GetUserData = createParamDecorator(
	(data: keyof UserData | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request & RequestData>();
		if (!request?.user) {
			return undefined;
		}
		return data ? request.user[data] : request.user;
	}
);
