import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';
import { UserService } from '../../modules/users/users.service';
import { BalanceService } from '../../modules/balance/balance.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CONFIG_CONSTANTS, HASH_SALT } from '../../common/constants';
import { ConfigService } from '@nestjs/config';
import { User } from '../../modules/users/users.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(BalanceService) private readonly balanceService: BalanceService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  async register(createUserData: CreateUserDto) {
    createUserData.password = bcrypt.hashSync(
      createUserData.password,
      HASH_SALT,
    );
    const balanceData = {
      initialAmount: createUserData.initialAmount,
      total: createUserData.total,
    };
    const newBalance = await this.balanceService.createBalance(balanceData);
    const userToSave = { ...createUserData, balance: newBalance };
    const createdUser = await this.userService.createUser(userToSave);
    delete createdUser.password;
    return createdUser;
  }

  async login(user: User) {
    const secret = this.config.get<string>(CONFIG_CONSTANTS.JWT_SECRET);
    const jwtPayload = {
      userId: user.id,
      createdAt: user.createdAt.getTime(),
    };
    const token = jwt.sign(jwtPayload, secret);
    return { token };
  }
}
