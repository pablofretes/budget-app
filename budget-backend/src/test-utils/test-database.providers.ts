import { DataSource } from "typeorm";
import { newDb } from "pg-mem";
import { User } from "../modules/users/users.entity";
import { Balance } from "../modules/balance/balance.entity";
import { Movement } from "../modules/movements/movements.entity";

export const setupDataSource = async () => {
	console.log('here')
  const db = newDb({ autoCreateForeignKeyIndices: true });
	console.log('here1')
	
  db.public.registerFunction({
		implementation: () => 'test',
    name: 'current_database',
  });

	console.log('here3')
	
  const dataSource: DataSource = await db.adapters.createTypeormDataSource({
		type: 'postgres',
    entities: [User, Balance, Movement],
  });
	console.log('here4')
  await dataSource.initialize();
	console.log('here5')
  await dataSource.synchronize();
	console.log('here6')
  
  return dataSource;
};
