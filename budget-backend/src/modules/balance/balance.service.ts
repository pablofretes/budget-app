import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
import { ERROR_MESSAGES, PROVIDERS, RELATIONS } from '../../common/constants';
import { BalanceDto } from './dto/balance-create.dto';

@Injectable()
export class BalanceService {
  constructor(
    @Inject(PROVIDERS.BALANCE_PROVIDERS)
    private readonly balanceRepository: Repository<Balance>,
  ) {}

  async createBalance(balance: BalanceDto): Promise<Balance> {
    const newBalance = this.balanceRepository.create(balance);
    return this.balanceRepository.save(newBalance);
  }

  async findById(id: number): Promise<Balance> {
    const balance = await this.balanceRepository.findOne({
      where: { id },
      relations: [RELATIONS.MOVEMENTS],
    });
    if (!balance) {
      throw new NotFoundException(ERROR_MESSAGES.BALANCE_NOT_FOUND);
    }
    return balance;
  }

  async updateBalance(id: number, amount: number): Promise<Balance> {
    const balance = await this.findById(id);
    if (!balance) {
      throw new NotFoundException(ERROR_MESSAGES.BALANCE_NOT_FOUND);
    }
    balance.total = balance.total + amount;
    balance.initialAmount = balance.initialAmount + amount;
    return this.balanceRepository.save(balance);
  }
}
