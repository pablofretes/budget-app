import { CURRENT_TIMESTAMP, TYPE_ORM_TYPES } from '../../common/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Movement } from '../movements/movements.entity';
import { ColumnNumericTransformer } from '../../utils/transformer';
@Entity()
export class Balance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: TYPE_ORM_TYPES.NUMERIC,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @Column({
    type: TYPE_ORM_TYPES.NUMERIC,
    transformer: new ColumnNumericTransformer(),
  })
  initialAmount: number;

  @CreateDateColumn({
    type: TYPE_ORM_TYPES.TIMESTAMP,
    default: () => CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.balance)
  user: User;

  @OneToMany(() => Movement, (movement) => movement.balance, {
    cascade: true,
  })
  movements: Movement[];
}
