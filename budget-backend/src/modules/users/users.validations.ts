import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UserService } from './users.service';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../../common/constants';
@Injectable()
export class UserValidations {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
  async createUserValidations(user: CreateUserDto) {
    const isEmailTaken = await this.userService.findByEmailValidation(
      user.email,
    );
    if (isEmailTaken) {
      throw new BadRequestException(ERROR_MESSAGES.EMAIL_TAKEN);
    }
    const isUsernameTaken = await this.userService.findByUsernameValidation(
      user.username,
    );
    if (isUsernameTaken) {
      throw new BadRequestException(ERROR_MESSAGES.USERNAME_TAKEN);
    }
  }

  async loginUserParser(credentials: LoginDto) {
    const user = await this.userService.findByEmail(credentials.email);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordCorrect = bcrypt.compareSync(
      credentials.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
  }
}
