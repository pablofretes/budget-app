import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Balance } from "./balance.entity";
import { BALANCE_PROVIDERS } from '../../common/constants';

@Injectable()
export class BalanceService {
	constructor(
		@Inject(BALANCE_PROVIDERS)
		private readonly balanceRepository: Repository<Balance>
	) {}

	async findAll(): Promise<Balance[]> {
		return this.balanceRepository.find();
	}
}