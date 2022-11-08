import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { movementsProviders } from "./movements.providers";
import { MovementService } from "./movements.service";

@Module({
	imports: [DatabaseModule],
	providers: [
		...movementsProviders,
		MovementService
	],
})

export class MovementModule {};