import { Controller, Get, Post, Inject, Param, ParseIntPipe, Body, Put, Delete, BadRequestException } from "@nestjs/common";
import { ERROR_MESSAGES } from "../../common/constants";
import { Sanitizer } from "../../utils/sanitizer";
import { CreateMovementDto } from "./dto/create-movement.dto";
import { UpdateMovementDto } from "./dto/update-movement.dto";
import { MovementService } from "./movements.service";

@Controller("movements")
export class MovementsController {
	constructor(
		@Inject(MovementService) private readonly movementService: MovementService,
		@Inject(Sanitizer) private readonly sanitizer: Sanitizer,
	) { }

	@Post()
	async createMovement(@Body() movement: CreateMovementDto) {
		const sanitizedAmount = this.sanitizer.sanitizeNumber(movement.amount);
		const sanitizedMovement = { ...movement, amount: sanitizedAmount };
		return this.movementService.createMovement(sanitizedMovement);
	}

	@Put(":id")
	async updateMovement(
		@Param("id", ParseIntPipe) id: number,
		@Body() movement: UpdateMovementDto
	) {
		if (!movement?.amount) return this.movementService.updateMovement(id, movement);
		if (!movement?.type) throw new BadRequestException(ERROR_MESSAGES.MOVEMENT_NO_TYPE);
		const sanitizedAmount = this.sanitizer.sanitizeNumber(movement.amount);
		const sanitizedMovement = { ...movement, amount: sanitizedAmount };
		return this.movementService.updateMovement(id, sanitizedMovement);
	}

	@Delete(":id") deleteMovement(@Param("id", ParseIntPipe) id: number) {
		return this.movementService.deleteOne(id);
	}

	@Get(":id")
	async getMovement(@Param("id", ParseIntPipe) id: number) {
		return this.movementService.findById(id);
	}

}