import { DataSource } from "typeorm";
import { newDb } from "pg-mem";
import { User } from "../modules/users/users.entity";
import { Balance } from "../modules/balance/balance.entity";
import { Movement } from "../modules/movements/movements.entity";

export const setupDataSource = async () => {
  const db = newDb({ autoCreateForeignKeyIndices: true });
	
  db.public.registerFunction({
		implementation: () => 'test',
    name: 'current_database',
  });
	
  const dataSource: DataSource = await db.adapters.createTypeormDataSource({
		type: 'postgres',
    entities: [User, Balance, Movement],
  });

  await dataSource.initialize();
  await dataSource.synchronize();
  
  return dataSource;
};
