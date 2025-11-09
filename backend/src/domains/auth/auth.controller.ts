import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
} from '@nestjs/common';

import type { Request } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './types';

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	public async register(@Req() request: Request, @Body() dto: CreateUserDto) {
		return await this.authService.createUser(request, dto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(@Req() request: Request, @Body() dto: LoginUserDto) {
		return await this.authService.loginUser(request, dto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public logout(@Req() request: Request) {
		return this.authService.logoutUser(request);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refreshAccess(@Req() request: Request) {
		return await this.authService.refreshUserAccess(request);
	}
}
