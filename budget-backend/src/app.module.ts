import { Module } from '@nestjs/common';
import { BalanceModule } from './modules/balance/balance.module';
import { MovementModule } from './modules/movements/movements.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
		UserModule,
		BalanceModule,
		MovementModule,
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
