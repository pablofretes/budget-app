import { Test, TestingModule } from '@nestjs/testing';
import { testUserOne, testUserTwo, testCreatedUserByDto } from './test.mock.users';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login-user.dto';
import { UserController } from '../users.controller';
import { UserService } from '../users.service';
import { UserValidations } from '../users.validations';

describe('UserController', () => {
	let userController: UserController;

	const mockUserService = {
		createUser: jest.fn((dto: CreateUserDto) => {
			return testCreatedUserByDto(dto);
		}),
		login: jest.fn((dto: LoginDto) => {
			return "someToken";
		}),
		findById: jest.fn((id: number) => {
			return testUserOne(id);
		}),
		findAll: jest.fn(() => {
			return [
				testUserOne(1),
				testUserTwo(2),
			];
		})
	}
	const mockUserValidator = {
		createUserValidations: jest.fn((dto: CreateUserDto) => {
			return;
		}),
		loginUserParser: jest.fn((email: string, password: string) => {
			return;
		})
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				UserService,
				UserValidations,
			]
		}).overrideProvider(UserService)
			.useValue(mockUserService)
			.overrideProvider(UserValidations)
			.useValue(mockUserValidator)
			.compile();

		userController = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(userController).toBeDefined();
	})

	it('should create a user', async () => {
		const userDto: CreateUserDto = {
			username: "pablo",
			password: "123456",
			email: "fake@mail.com",
			initialAmount: 0,
			total: 0,
		};
		const createdUser = await userController.createUser(userDto);
		expect(createdUser).toEqual({
			id: expect.any(Number),
			username: userDto.username,
			email: userDto.email,
			createdAt: expect.any(Date),
			balance: {
				id: expect.any(Number),
				initialAmount: 0,
				total: 0,
				createdAt: expect.any(Date),
			},
			movements: []
		});
		expect(mockUserService.createUser).toHaveBeenCalledWith(userDto);
	});

	it("should return a token", async () => {
		const loginDto: LoginDto = {
			email: "fake@mail.com",
			password: "123456"
		};
		const loginToken = await userController.login(loginDto.email, loginDto.password);
		expect(loginToken).toEqual("someToken");
	});

	it("should return a user", async () => {
		const id = 1;
		const userIdOne = await userController.getUserById(id);
		expect(userIdOne).toEqual(testUserOne(id));
	});

	it("should return an array with users", async () => {
		const users = await userController.getAllUsers();
		expect(users).toEqual([testUserOne(1), testUserTwo(2)])
	})
});