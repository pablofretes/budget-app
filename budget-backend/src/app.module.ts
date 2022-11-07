import { Module } from '@nestjs/common';
import { BalanceModule } from './modules/balance/balance.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
		UserModule,
		BalanceModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
