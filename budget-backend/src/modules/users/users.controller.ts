import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./users.service";
import { UserValidations } from "./users.validations";

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userValidations: UserValidations
	) {}
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

	@Get()
	async getAllUsers() {
		return this.userService.findAll();
	}

	@Get(':id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findById(id);
	}

	@Post('/login')
	async login(@Param('email') email: string, @Param('password') password: string) {
		return this.userService.login({ email, password });
	}

	@Post()
	async createUser(@Body() user: CreateUserDto) {
		await this.userValidations.createUserValidations(user);
		return this.userService.createUser(user);
	}
}