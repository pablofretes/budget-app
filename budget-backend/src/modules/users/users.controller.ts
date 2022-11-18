import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from '../../utils/authentication/authentication';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UserService } from './users.service';
import { UserValidations } from './users.validations';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UserValidations) private readonly userValidations: UserValidations,
    @Inject(AuthenticationService)
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userValidations.loginUserParser(loginDto);
    return this.authenticationService.login(user);
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
    return this.authenticationService.register(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
