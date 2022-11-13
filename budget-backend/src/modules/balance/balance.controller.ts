import { Controller, Get, Put, Body, Param, Inject, ParseIntPipe } from "@nestjs/common";
import { BalanceService } from "./balance.service";

@Controller("balance")
export class BalanceController {
	constructor(
		@Inject(BalanceService) private readonly balanceService: BalanceService,
	){}

	@Get()
	async getBalance(@Param(":id", ParseIntPipe) id: number) {
		return this.balanceService.findById(id);
	}

	@Put("/update-balance")
	async updateBalance(@Param(":id", ParseIntPipe) id: number, @Body("amount", ParseIntPipe) amount: number) {
		return this.balanceService.updateBalance(id, amount);
	}
}