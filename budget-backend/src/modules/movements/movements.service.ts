import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Movement } from "./movements.entity";
import { PROVIDERS } from "../../common/constants";

@Injectable()
export class MovementService {
	constructor(
		@Inject(PROVIDERS.MOVEMENT_PROVIDERS)
		private readonly movementsRepository: Repository<Movement>
	) {}

	async findAll(): Promise<Movement[]> {
		return this.movementsRepository.find();
	}
}