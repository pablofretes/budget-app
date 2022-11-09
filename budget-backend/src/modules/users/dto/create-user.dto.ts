import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(5)
	username: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	@MinLength(10)
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(5)
	password: string
}