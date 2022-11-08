import { DataSource } from "typeorm";
import { DATABASE_TYPE, PROVIDERS } from "../common/constants";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const databaseProviders = [
	{
		provide: PROVIDERS.ORM_PROVIDER,
		import: [ConfigModule],
		useFactory: async (config: ConfigService) => {
			const dataSource = new DataSource({
				type: DATABASE_TYPE,
				host: config.get<string>("host"),
				port: config.get<number>("port"),
				username: config.get<string>("username"),
				password: config.get<string>("password"),
				database: config.get<string>("databaseName"),
				entities: [
					__dirname + '/../**/*.entity{.ts,.js}',
				],
			})
		return dataSource.initialize();
		},
		inject: [ConfigService]
	}
];