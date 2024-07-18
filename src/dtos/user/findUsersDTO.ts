import { IsNumber } from 'class-validator';

export class FindUsersDTO {
	@IsNumber()
	page: number = 1;

	@IsNumber()
	perPage: number = 10;
}
