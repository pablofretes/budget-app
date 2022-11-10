import { Module } from "@nestjs/common";
import { PROVIDERS } from "../../common/constants";
import { DatabaseModule } from "../../database/database.module";
import { movementsProviders } from "./movements.providers";
import { MovementService } from "./movements.service";

@Module({
	imports: [
		DatabaseModule,
	],
	providers: [
		...movementsProviders,
		{
			provide: PROVIDERS.MOVEMENTS_SERVICE,
			useClass: MovementService,
		}
	],
})

export class MovementModule {};