import { User } from "./users.entity";
import { USER_PROVIDERS, ORM_PROVIDER } from "../common/constants";
import { DataSource } from "typeorm";

export const usersProviders = [
	{
		provide: USER_PROVIDERS,
		useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
		inject: [ORM_PROVIDER]
	}
];