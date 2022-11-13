import { CreateUserDto } from "../dto/create-user.dto";

export const testUserOne = (id: number) => {
	return {
		id: id,
		username: "testUserOne",
		email: "fake@mail.com",
		password: "aHashedPassword",
		createdAt: "2022-11-12T00:26:47.448Z",
		balance: {
			id: id,
			total: "0",
			initialAmount: "0",
			createdAt: "2022-11-12T00:26:47.448Z"
		},
		movements: []
	}
}

export const testCreatedUserByDto = (dto: CreateUserDto) => {
	return {
		id: 1,
		username: dto.username,
		email: dto.email,
		createdAt: new Date(),
		balance: {
			id: 1,
			initialAmount: dto.initialAmount,
			total: dto.total,
			createdAt: new Date(),
		},
		movements: []
	};
}

export const testUserTwo = (id: number) => {
	return {
		id: id,
		username: "testUserTwo",
		email: "fakeTest@mail.com",
		password: "aHashedPassword",
		createdAt: "2022-11-12T00:26:47.448Z",
		balance: {
			id: id,
			total: "0",
			initialAmount: "0",
			createdAt: "2022-11-12T00:26:47.448Z"
		},
		movements: []
	}
}