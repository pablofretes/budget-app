import { DataSource } from "typeorm";
import { DATABASE_TYPE, PROVIDERS } from "../common/constants";
import config from "../common/configuration";

export const databaseProviders = [
	{
		provide: PROVIDERS.ORM_PROVIDER,
		useFactory: async() => {
			const dataSource = new DataSource({
				type: DATABASE_TYPE,
				host: config.database.host,
				port: config.database.port,
				username: config.database.username,
				password: config.database.password,
				database: config.database.databaseName,
				entities: [
					__dirname + '/../**/*.entity{.ts,.js}',
				],
			});

			return dataSource.initialize();
		}
	}
];