import { ColumnNumericTransformer } from '../../utils/transformer/transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import {
  CURRENT_TIMESTAMP,
  MOVEMENT_CONCEPT,
  MOVEMENT_TYPE,
  TYPE_ORM_TYPES,
} from '../../common/constants';
import { Balance } from '../balance/balance.entity';
@Entity()
export class Movement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: TYPE_ORM_TYPES.VARCHAR,
  })
  concept: MOVEMENT_CONCEPT;

  @Column({
    type: TYPE_ORM_TYPES.VARCHAR,
  })
  type: MOVEMENT_TYPE;

  @Column({
    type: TYPE_ORM_TYPES.NUMERIC,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @CreateDateColumn({
    type: TYPE_ORM_TYPES.TIMESTAMP,
    default: () => CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @Column({ nullable: true })
  balanceId: number;

  @ManyToOne(() => Balance, (balance) => balance.movements)
  @JoinColumn({ name: 'balanceId' })
  balance: Balance;
}
