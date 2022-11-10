import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { BalanceService } from "./balance.service";
import { balanceProviders } from "./balance.providers";
import { PROVIDERS } from "../../common/constants";

@Module({
	imports: [
		DatabaseModule,
	],
	providers: [
		...balanceProviders,
		BalanceService
	],
	exports: [BalanceService]
})

export class BalanceModule {}