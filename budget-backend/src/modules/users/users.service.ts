import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { PROVIDERS, HASH_SALT, ERROR_MESSAGES, RELATIONS } from '../../common/constants';
import { CreateUserDto } from "./dto/create-user.dto";
import { ConfigService } from "@nestjs/config";
import { BalanceService } from "../balance/balance.service";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class 
UserService {
	constructor(
		@Inject(PROVIDERS.USER_PROVIDERS)
		@Inject(ConfigService)
		private readonly userRepository: Repository<User>,
		private readonly balanceService: BalanceService,
		private readonly config: ConfigService
	) {}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async findById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id: id }, relations: [RELATIONS.BALANCE, RELATIONS.MOVEMENTS] });
		if (!user) {
			throw new BadRequestException(ERROR_MESSAGES.INVALID_ID);
		}
		return user;
	}

	async findByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { username: username }, relations: [RELATIONS.BALANCE, RELATIONS.MOVEMENTS] });
		if (!user) {
			throw new BadRequestException(ERROR_MESSAGES.INVALID_USERNAME);
		}
		return user
	}

	async findByUsernameValidation(username: string): Promise<User> {
		return this.userRepository.findOneBy({ username });

	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { email: email }, relations: [RELATIONS.BALANCE, RELATIONS.MOVEMENTS] });
		if (!user) {
			throw new BadRequestException(ERROR_MESSAGES.INVALID_EMAIL);
		}
		return user;
	}
	async findByEmailValidation(email: string): Promise<User> {
		return this.userRepository.findOneBy({ email });
	}

	async login(user: User): Promise<string> {
		const secret = this.config.get("jwt_secret");
		const jwtPayload = {
			userId: user.id,
			createdAt: user.createdAt.getTime(),
		}
		const token = jwt.sign(jwtPayload, secret);
		return token;
	}

	async createUser(user: CreateUserDto): Promise<User> {
		user.password = bcrypt.hashSync(user.password, HASH_SALT);
		const balanceData = { initialAmount: user.initialAmount, total: user.total };
		const newBalance = await this.balanceService.createBalance(balanceData);
		const userToSave = { ...user, balance: newBalance, movements: [] };
		const newUser = this.userRepository.create(userToSave);
		return this.userRepository.save(newUser);
	}
}