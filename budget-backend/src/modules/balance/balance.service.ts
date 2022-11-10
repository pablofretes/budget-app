import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Balance } from "./balance.entity";
import { PROVIDERS } from '../../common/constants';
import { BalanceDto } from "./dto/balance-create.dto";

@Injectable()
export class BalanceService {
	constructor(
		@Inject(PROVIDERS.BALANCE_PROVIDERS)
		private readonly balanceRepository: Repository<Balance>
	) {}

	async findAll(): Promise<Balance[]> {
		return this.balanceRepository.find();
	}

	async createBalance(balance: BalanceDto) {
		const newBalance = this.balanceRepository.create(balance);
		return this.balanceRepository.save(newBalance);
	}
}