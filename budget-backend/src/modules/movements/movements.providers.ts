import { Movement } from './movements.entity';
import { PROVIDERS } from '../../common/constants';
import { DataSource } from 'typeorm';

export const movementsProviders = [
  {
    provide: PROVIDERS.MOVEMENT_PROVIDERS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Movement),
    inject: [PROVIDERS.ORM_PROVIDER],
  },
];
