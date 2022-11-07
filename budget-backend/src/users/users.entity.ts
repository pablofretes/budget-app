import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { NAME_LENGTH, EMAIL_LENGTH, PASSWORD_LENGTH, TEXT } from 'src/common/constants';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ 
		length: NAME_LENGTH,
		type: TEXT,
	})
	name: string;

	@Column({
		length: EMAIL_LENGTH,
		type: TEXT,
	})
	email: string;

	@Column({
		length: PASSWORD_LENGTH,
		type: TEXT
	})
	password: string;
}