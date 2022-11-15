import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { MOVEMENT_CONCEPT, MOVEMENT_TYPE } from '../../../common/constants';

export class UpdateMovementDto {
  @IsString()
  @IsOptional()
  concept?: MOVEMENT_CONCEPT;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  type?: MOVEMENT_TYPE;
}
