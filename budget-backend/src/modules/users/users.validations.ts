import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./users.service";
import zod from 'zod';

@Injectable()
export class UserValidations {
	constructor(private readonly userService: UserService) {}
	async createUserValidations(user: CreateUserDto) {
		const isEmailTaken = await this.userService.findByEmail(user.email);
		if (isEmailTaken) {
			throw new BadRequestException('Email is already taken');
		}
		const isUsernameTaken = await this.userService.findByUsername(user.username);
		if (isUsernameTaken) {
			throw new BadRequestException('Username is already taken');
		}
	}
}