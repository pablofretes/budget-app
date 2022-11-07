import { Balance } from "./balance.entity";
import { BALANCE_PROVIDERS, ORM_PROVIDER } from "../../common/constants";
import { DataSource } from "typeorm";

export const balanceProviders = [
	{
		provide: BALANCE_PROVIDERS,
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Balance),
		inject: [ORM_PROVIDER]
	}
]