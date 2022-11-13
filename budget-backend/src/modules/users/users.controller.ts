import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./users.service";
import { UserValidations } from "./users.validations";

@Controller('users')
export class UserController {
	constructor(
		@Inject(UserService) private readonly userService: UserService,
		@Inject(UserValidations) private readonly userValidations: UserValidations
	) {}

	@Post('/login')
	async login(
		@Body('email') email: string,
		@Body('password') password: string,
	) {
		const user = await this.userValidations.loginUserParser({ email, password });
		return this.userService.login(user);
	}

	@Get(':id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findById(id);
	}

	@Get()
	async getAllUsers() {
		return this.userService.findAll();
	}

	@Post()
	async createUser(@Body() user: CreateUserDto) {
		await this.userValidations.createUserValidations(user);
		return this.userService.createUser(user);
	}
}