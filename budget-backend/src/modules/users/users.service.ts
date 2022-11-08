import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { PROVIDERS } from '../../common/constants';

@Injectable()
export class UserService {
	constructor(
		@Inject(PROVIDERS.USER_PROVIDERS)
		private readonly userRepository: Repository<User>
	) {}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}
}