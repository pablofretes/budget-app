import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { PROVIDERS } from '../../common/constants';
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
	constructor(
		@Inject(PROVIDERS.USER_PROVIDERS)
		private readonly userRepository: Repository<User>
	) {}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async findById(id: number): Promise<User> {
		return this.userRepository.findBy({ id: id })[0];
	}

	async createUser(user: CreateUserDto): Promise<User> {
		const newUser = this.userRepository.create(user);
		return this.userRepository.save(newUser);
	}
}