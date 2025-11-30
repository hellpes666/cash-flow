import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { UserService } from 'src/domains/user';
import { RequestData } from 'src/types';

@Injectable()
export class IsUserSubscriptionActiveGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		try {
			const userData = request['user'] as RequestData;
			const isActive = (
				await this.userService.isUserHasSubscription(userData.id)
			).isSuccess;

			return isActive;
		} catch {
			throw new UnauthorizedException();
		}
	}
}
