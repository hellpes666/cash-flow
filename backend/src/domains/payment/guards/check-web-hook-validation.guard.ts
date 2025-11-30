import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';

import { isPaymentIpLegal } from '../utils';

@Injectable()
export class CheckWebHookValidationGuard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const ip = request.ip || request.connection.remoteAddress;
		return isPaymentIpLegal(ip);
	}
}
