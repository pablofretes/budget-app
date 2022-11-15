import { Balance } from './balance.entity';
import { PROVIDERS } from '../../common/constants';
import { DataSource } from 'typeorm';

export const balanceProviders = [
  {
    provide: PROVIDERS.BALANCE_PROVIDERS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Balance),
    inject: [PROVIDERS.ORM_PROVIDER],
  },
];
