import { DataSource } from "typeorm";
import { DATABASE_TYPE, ORM_PROVIDER } from "src/common/constants";
import config from "../common/configuration";

export const databaseProviders = [
	{
		provide: ORM_PROVIDER,
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