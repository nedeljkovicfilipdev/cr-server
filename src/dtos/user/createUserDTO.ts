import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
	@IsString()
	name!: string;

	@IsString()
	username!: string

	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(6)
	password!: string;
}
