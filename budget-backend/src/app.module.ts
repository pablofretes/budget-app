import { Module } from '@nestjs/common';
import { BalanceModule } from './modules/balance/balance.module';
import { MovementModule } from './modules/movements/movements.module';
import { UserModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UserModule,
    BalanceModule,
    MovementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
