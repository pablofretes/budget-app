import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { BalanceModule } from '../balance/balance.module';
import { UserController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserService } from './users.service';
import { UserValidations } from './users.validations';
@Module({
  imports: [DatabaseModule, BalanceModule, ConfigModule],
  providers: [...usersProviders, UserService, UserValidations],
  controllers: [UserController],
})
export class UserModule {}
