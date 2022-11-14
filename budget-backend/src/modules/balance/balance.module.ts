import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { BalanceService } from "./balance.service";
import { balanceProviders } from "./balance.providers";
import { BalanceController } from "./balance.controller";
import { Sanitizer } from "../../utils/sanitizer";

@Module({
	imports: [
		DatabaseModule,
	],
	providers: [
		...balanceProviders,
		Sanitizer,
		BalanceService,
	],
	controllers: [BalanceController],
	exports: [BalanceService]
})

export class BalanceModule {}