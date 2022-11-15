import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Movement } from "./movements.entity";
import { ERROR_MESSAGES, PROVIDERS, RESPONSE_MESSAGES } from "../../common/constants";
import { CreateMovementDto } from "./dto/create-movement.dto";
import { Balance } from "../balance/balance.entity";
import { UpdateMovementDto } from "./dto/update-movement.dto";

@Injectable()
export class MovementService {
	constructor(
		@Inject(PROVIDERS.MOVEMENT_PROVIDERS) private readonly movementsRepository: Repository<Movement>,
		@Inject(PROVIDERS.BALANCE_PROVIDERS)
		private readonly balanceRepository: Repository<Balance>
	) {}

	async findById(id: number): Promise<Movement> {
		const movement = await this.movementsRepository.findOneBy({ id });
		if (!movement) throw new NotFoundException(ERROR_MESSAGES.MOVEMENT_NOT_FOUND);
		return movement;
	}

	async createMovement(movementDto: CreateMovementDto): Promise<Movement> {
		const balance: Balance = await this.balanceRepository.findOneBy({ id: movementDto.balanceId });
		if (!balance) throw new NotFoundException(ERROR_MESSAGES.BALANCE_NOT_FOUND)
		balance.total = balance.total + movementDto.amount;
		const movement = new Movement();
		movement.amount = movementDto.amount;
		movement.concept = movementDto.concept;
		movement.type = movementDto.type;
		movement.balanceId = movementDto.balanceId;
		await this.balanceRepository.save(balance);
		return this.movementsRepository.save(movement);
	}

	async updateMovement(id: number, movementDto: UpdateMovementDto): Promise<Movement> {
		const movement = await this.movementsRepository.findOneBy({ id });
		if (!movement) throw new NotFoundException(ERROR_MESSAGES.MOVEMENT_NOT_FOUND);
		movement.amount = movementDto.amount ? movementDto.amount : movement.amount;
		movement.concept = movementDto.concept ? movementDto.concept : movement.concept;
		movement.type = movementDto.type ? movementDto.type : movement.type;
		return this.movementsRepository.save(movement);
	}

	async deleteOne(id: number) {
		const movement = await this.movementsRepository.findOneBy({ id });
		if (!movement) throw new NotFoundException(ERROR_MESSAGES.MOVEMENT_NOT_FOUND);
		try {
			await this.movementsRepository.delete(id);
			return { message: RESPONSE_MESSAGES.SUCCESSFULLY_DELETED };
		} catch (error) {
			throw new Error(ERROR_MESSAGES.NO_DELETE_ERROR);	
		}
	}
}