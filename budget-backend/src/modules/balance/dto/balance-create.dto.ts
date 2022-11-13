import { IsNumber, IsNotEmpty } from "class-validator";

export class BalanceDto {
	@IsNumber()
	@IsNotEmpty()
	initialAmount: number;
	
	@IsNumber()
	@IsNotEmpty()
	total: number;
}