import { DataType, newDb } from 'pg-mem';
import { Balance } from '../modules/balance/balance.entity';
import { Movement } from '../modules/movements/movements.entity';
import { User } from '../modules/users/users.entity';
import { DataSource } from 'typeorm';

export const setupTestDb = async () => {
  const db = newDb({ autoCreateForeignKeyIndices: true });

  db.public.registerFunction({
    name: 'current_database',
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world: ${x}`,
  });

  db.public.registerFunction({
    name: 'version',
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world: ${x}`,
  });

  const dataSource: DataSource = db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [User, Movement, Balance],
    synchronize: true,
  });

  return dataSource;
};
