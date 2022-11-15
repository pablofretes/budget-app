import { Module } from '@nestjs/common';
import { Sanitizer } from '../../utils/sanitizer';
import { DatabaseModule } from '../../database/database.module';
import { balanceProviders } from '../balance/balance.providers';
import { MovementsController } from './movements.controller';
import { movementsProviders } from './movements.providers';
import { MovementService } from './movements.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...movementsProviders,
    ...balanceProviders,
    Sanitizer,
    MovementService,
  ],
  controllers: [MovementsController],
})
export class MovementModule {}
