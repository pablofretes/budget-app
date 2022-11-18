import { DataSource } from 'typeorm';
import {
  CONFIG_CONSTANTS,
  DATABASE_TYPE,
  PROVIDERS,
} from '../common/constants';
import { ConfigService } from '@nestjs/config';
import { setupTestDb } from '../utils/test/test-setup';

export const databaseProviders = [
  {
    provide: PROVIDERS.ORM_PROVIDER,
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const NODE_ENV_VAR = config.get(CONFIG_CONSTANTS.NODE_ENV);
      if (NODE_ENV_VAR !== 'test') {
        const dataSource = new DataSource({
          type: DATABASE_TYPE,
          host: config.get(CONFIG_CONSTANTS.DATABASE_HOST),
          port: config.get(CONFIG_CONSTANTS.DATABASE_PORT),
          username: config.get(CONFIG_CONSTANTS.DATABASE_USER),
          password: config.get(CONFIG_CONSTANTS.DATABASE_PASSWORD),
          database: config.get(CONFIG_CONSTANTS.DATABASE_NAME),
          entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
          synchronize: true,
        });
        return dataSource.initialize();
      } else {
        const dataSource = await setupTestDb();
        return await dataSource.initialize();
      }
    },
  },
];
