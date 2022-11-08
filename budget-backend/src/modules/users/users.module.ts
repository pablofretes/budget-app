import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { usersProviders } from "./users.providers";
import { UserService } from "./users.service";

@Module({
	imports: [DatabaseModule],
	providers: [
		...usersProviders,
		UserService,
	],
})

export class UserModule {};