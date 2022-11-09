import { DataSource } from "typeorm";
import { DATABASE_TYPE, PROVIDERS } from "../common/constants";
import { ConfigService } from "@nestjs/config";

export const databaseProviders = [
	{
		provide: PROVIDERS.ORM_PROVIDER,
		inject: [ConfigService],
		useFactory: async (config: ConfigService) => {
			const dataSource = new DataSource({
				type: DATABASE_TYPE,
				host: config.get<string>("database_host"),
				port: config.get<number>("database_port"),
				username: config.get<string>("database_user"),
				password: config.get<string>("database_password"),
				database: config.get<string>("database_name"),
				entities: [
					__dirname + '/../**/**/*.entity{.ts,.js}'
				],
				synchronize: true
			})
		return dataSource.initialize();
		},
	}
];