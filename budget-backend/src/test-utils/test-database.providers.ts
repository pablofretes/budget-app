import { DataSource } from "typeorm";
import { DataType, newDb } from "pg-mem";
import { User } from "../modules/users/users.entity";
import { Balance } from "../modules/balance/balance.entity";
import { Movement } from "../modules/movements/movements.entity";
import { v4 } from 'uuid';

export const setupDataSource = async () => {
  const db = newDb({ autoCreateForeignKeyIndices: true });
	
	db.public.registerFunction({
		name: 'current_database',
		args: [],
		returns: DataType.text,
		implementation: (x) => "test"
	})

	db.public.registerFunction({
		name: 'version',
		args: [],
		returns: DataType.text,
		implementation: (x) => "test"
	})
	
  const dataSource: DataSource = await db.adapters.createTypeormDataSource({
		type: 'postgres',
    entities: [User, Balance, Movement],
  });
  
  return dataSource;
};
