import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./users.service";

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getAllUsers() {
		return this.userService.findAll();
	}

	@Get(':id')
	getUserById(@Param('id') id: string) {
		const numberId = Number(id);
		return this.userService.findById(numberId);
	}

	@Post()
	async createUser(@Body() user: CreateUserDto) {
		//validate body
		console.log('user', user)
		return this.userService.createUser(user);
	}
}