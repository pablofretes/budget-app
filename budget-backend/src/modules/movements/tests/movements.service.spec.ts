import { Test, TestingModule } from '@nestjs/testing';
import { BalanceDto } from '../../../modules/balance/dto/balance-create.dto';
import {
  MOVEMENT_CONCEPT,
  MOVEMENT_TYPE,
  PROVIDERS,
  RESPONSE_MESSAGES,
} from '../../../common/constants';
import { CreateMovementDto } from '../dto/create-movement.dto';
import { MovementService } from '../movements.service';
import { FindOptionsWhere } from 'typeorm';
import { Movement } from '../movements.entity';
import { UpdateMovementDto } from '../dto/update-movement.dto';

describe('BalanceService', () => {
  let movementService: MovementService;
  const mockMovementsRepository = {
    findOneBy: jest.fn((options: FindOptionsWhere<Movement>) => {
      return {
        id: options.id,
        amount: 100,
        type: MOVEMENT_TYPE.NEGATIVE,
        concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
        balanceId: 1,
      };
    }),
    save: jest.fn((dto: CreateMovementDto) => {
      return {
        id: 1,
        amount: dto.amount,
        type: dto.type,
        concept: dto.concept,
        balanceId: dto.balanceId,
      };
    }),
    delete: jest.fn(() => {
      return { raw: [], affected: 1 };
    }),
  };
  const mockBalanceRepository = {
    findOneBy: jest.fn((dto: CreateMovementDto) => {
      return {
        id: dto.balanceId,
        initialAmount: 888,
        total: 999,
        movements: [],
        createdAt: new Date(),
      };
    }),
    save: jest.fn((dto: BalanceDto) => {
      return {
        id: 1,
        initialAmount: dto.initialAmount,
        total: dto.total,
        movements: [],
        createdAt: new Date(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementService,
        {
          provide: PROVIDERS.MOVEMENT_PROVIDERS,
          useValue: mockMovementsRepository,
        },
        {
          provide: PROVIDERS.BALANCE_PROVIDERS,
          useValue: mockBalanceRepository,
        },
      ],
    }).compile();

    movementService = module.get<MovementService>(MovementService);
  });

  it('should be defined', () => {
    expect(movementService).toBeDefined();
  });

  it('should find one movement by id', async () => {
    const id = 1;
    const movement = await movementService.findById(id);
    expect(movement).toEqual({
      balanceId: expect.any(Number),
      amount: expect.any(Number),
      type: expect.any(String),
      concept: expect.any(String),
      id: id,
    });
  });

  it('should create a new movement', async () => {
    const movementDto: CreateMovementDto = {
      balanceId: 1,
      type: MOVEMENT_TYPE.NEGATIVE,
      concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
      amount: 100,
    };
    const createdMovement = await movementService.createMovement(movementDto);
    expect(createdMovement).toEqual({
      balanceId: movementDto.balanceId,
      amount: movementDto.amount,
      type: movementDto.type,
      concept: movementDto.concept,
      id: expect.any(Number),
    });
  });

  it('should create update a movement', async () => {
    const id = 1;
    const movementDto: UpdateMovementDto = {
      type: MOVEMENT_TYPE.NEGATIVE,
      concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
      amount: 100,
    };
    const createdMovement = await movementService.updateMovement(
      id,
      movementDto,
    );
    expect(createdMovement).toEqual({
      balanceId: expect.any(Number),
      amount: movementDto.amount,
      type: movementDto.type,
      concept: movementDto.concept,
      id: id,
    });
  });

  it('should delete a movement', async () => {
    const id = 1;
    const deleteMovement = await movementService.deleteOne(id);
    expect(deleteMovement).toEqual({
      message: RESPONSE_MESSAGES.SUCCESSFULLY_DELETED,
    });
  });
});
