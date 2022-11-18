import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import {
  PROVIDERS,
  ERROR_MESSAGES,
  RELATIONS,
  RESPONSE_MESSAGES,
} from '../../common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { BalanceService } from '../balance/balance.service';
@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDERS.USER_PROVIDERS)
    @Inject(ConfigService)
    private readonly userRepository: Repository<User>,
    private readonly balanceService: BalanceService,
    private config: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({ relations: [RELATIONS.BALANCE] });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: [RELATIONS.BALANCE, RELATIONS.NESTED_MOVEMENTS],
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.INVALID_ID);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: [RELATIONS.BALANCE, RELATIONS.NESTED_MOVEMENTS],
    });
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_USERNAME);
    }
    return user;
  }

  async findByUsernameValidation(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: [RELATIONS.BALANCE],
    });

    return user;
  }
  async findByEmailValidation(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    try {
      await this.userRepository.delete(id);
      return { message: RESPONSE_MESSAGES.SUCCESSFULLY_DELETED };
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NO_DELETE_ERROR);
    }
  }
}
