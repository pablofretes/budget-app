import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../../utils/authentication/authentication';
import { DatabaseModule } from '../../database/database.module';
import { BalanceModule } from '../balance/balance.module';
import { UserController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserService } from './users.service';
import { UserValidations } from './users.validations';
@Module({
  imports: [DatabaseModule, BalanceModule, ConfigModule],
  providers: [
    ...usersProviders,
    UserService,
    UserValidations,
    ConfigService,
    AuthenticationService,
  ],
  controllers: [UserController],
})
export class UserModule {}
