import { User } from "./users.entity";
import { PROVIDERS } from "../../common/constants";
import { DataSource } from "typeorm";

export const usersProviders = [
	{
		provide: PROVIDERS.USER_PROVIDERS,
		useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
		inject: [PROVIDERS.ORM_PROVIDER]
	}
];