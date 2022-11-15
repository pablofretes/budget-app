import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { Sanitizer } from '../../utils/sanitizer';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(
    @Inject(BalanceService) private readonly balanceService: BalanceService,
    @Inject(Sanitizer) private readonly sanitizer: Sanitizer,
  ) {}
  @Put('/update-balance/:id')
  async updateBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: number,
  ) {
    const sanitizedAmount = this.sanitizer.sanitizeNumber(amount);
    return this.balanceService.updateBalance(id, sanitizedAmount);
  }

  @Get(':id')
  async getBalance(@Param('id', ParseIntPipe) id: number) {
    return this.balanceService.findById(id);
  }
}
