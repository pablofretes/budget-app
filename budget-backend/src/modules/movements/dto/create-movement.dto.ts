import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { MOVEMENT_CONCEPT, MOVEMENT_TYPE } from '../../../common/constants';

export class CreateMovementDto {
  @IsNotEmpty()
  @IsNumber()
  balanceId: number;

  @IsNotEmpty()
  @IsString()
  concept: MOVEMENT_CONCEPT;

  @IsNotEmpty()
  @IsString()
  type: MOVEMENT_TYPE;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
