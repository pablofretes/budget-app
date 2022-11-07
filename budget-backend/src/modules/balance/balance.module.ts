import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { BalanceService } from "./balance.service";
import { balanceProviders } from "./balance.providers";

@Module({
	imports: [DatabaseModule],
	providers: [
		...balanceProviders,
		BalanceService
	]
})

export class BalanceModule {};