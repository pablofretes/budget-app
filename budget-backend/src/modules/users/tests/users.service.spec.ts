import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../users.service';
import { User } from '../users.entity';
import { BalanceService } from '../../balance/balance.service';
import { PROVIDERS } from '../../../common/constants';
import { ConfigService } from '@nestjs/config';
import { BalanceDto } from '../../balance/dto/balance-create.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { testUserOne, testUserTwo } from './test.mock.users';

describe('UserService', () => {
  let userService: UserService;
  const mockBalanceService = {
    createBalance: jest.fn((dto: BalanceDto) => ({ id: 1, ...dto })),
  };
  const mockUserRepository = {
    create: jest.fn((dto: CreateUserDto) => ({
      id: 1,
      username: dto.username,
      email: dto.email,
      password: 'aHashedPass',
      createdAt: new Date(),
      balance: {
        id: 1,
        total: 0,
        initialAmount: 0,
        createdAt: new Date(),
      },
    })),
    save: jest.fn((user: User) => {
      return {
        id: 1,
        username: user.username,
        email: user.email,
        password: 'aHashedPass',
        createdAt: user.createdAt,
        balance: user.balance,
      };
    }),
    find: jest.fn(() => {
      return [testUserOne(1), testUserTwo(2)];
    }),
    findOne: jest.fn(() => {
      return testUserOne(1);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PROVIDERS.USER_PROVIDERS,
          useValue: mockUserRepository,
        },
        BalanceService,
        ConfigService,
      ],
    })
      .overrideProvider(BalanceService)
      .useValue(mockBalanceService)
      .compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return an array of users', async () => {
    const findAll = await userService.findAll();
    expect(findAll).toEqual([testUserOne(1), testUserTwo(2)]);
  });

  it('should return a user searching by id', async () => {
    const id = 1;
    const findById = await userService.findById(id);
    expect(findById).toEqual(testUserOne(id));
  });

  it('should return a user searching by username', async () => {
    const username = 'testUserOne';
    const findByUsername = await userService.findByUsername(username);
    expect(findByUsername).toEqual(testUserOne(1));
  });

  it('should return a user searching by email', async () => {
    const email = 'fake@mail.com';
    const findByEmail = await userService.findByEmail(email);
    expect(findByEmail).toEqual(testUserOne(1));
  });

  it('should create a user and return it', async () => {
    const userDto = {
      username: 'testUserOne',
      email: 'fake@mail.com',
      password: 'testPass',
      initialAmount: 0,
      total: 0,
    };
    const createdUser = await userService.createUser(userDto);
    expect(createdUser).toEqual({
      id: expect.any(Number),
      username: userDto.username,
      email: userDto.email,
      createdAt: expect.any(Date),
      password: expect.any(String),
      balance: {
        id: expect.any(Number),
        total: 0,
        initialAmount: 0,
        createdAt: expect.any(Date),
      },
    });
  });
});
