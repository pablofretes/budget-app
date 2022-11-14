import { Test, TestingModule } from '@nestjs/testing';
import { MOVEMENT_CONCEPT, MOVEMENT_TYPE } from '../../../common/constants';
import { Sanitizer } from '../../../utils/sanitizer';
import { CreateMovementDto } from '../dto/create-movement.dto';
import { UpdateMovementDto } from '../dto/update-movement.dto';
import { MovementsController } from '../movements.controller';
import { MovementService } from '../movements.service';

describe("MovementsController", () => {
	let movementsController: MovementsController;

	const mockBalanceService = {
		createMovement: jest.fn((dto: CreateMovementDto) => {
			return {
				balanceId: dto.balanceId,
				amount: dto.amount,
				type: dto.type,
				concept: dto.concept,
				id: 1
			}
		})
	};

	const mockSanitizer = {
		sanitizeNumber: jest.fn((number: number) => {
			return Number(number.toFixed(2));
		})
	}
	
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MovementsController],
			providers: [
				MovementService,
				Sanitizer,
			]
		}).overrideProvider(MovementService)
			.useValue(mockBalanceService)
			.overrideProvider(Sanitizer)
			.useValue(mockSanitizer)
			.compile();

			movementsController = module.get<MovementsController>(MovementsController);
	});

	it("should be defined", () => {
		expect(movementsController).toBeDefined();
	});

	it("should create a new movement", async () => {
		const movementDto: CreateMovementDto = {
			balanceId: 1,
			amount: 50,
			type: MOVEMENT_TYPE.NEGATIVE,
			concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
		};
		const movement = await movementsController.createMovement(movementDto);
		expect(movement).toEqual({
			balanceId: movementDto.balanceId,
			amount: movementDto.amount,
			type: movementDto.type,
			concept: movementDto.concept,
			id: expect.any(Number),
		})
	});

	it("should update a movement", async () => {
		const id = 1;
		const movementDto: UpdateMovementDto = {
			amount: 1000,
			type: MOVEMENT_TYPE.NEGATIVE,
			concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
		};
		const movement = await movementsController.updateMovement(id, movementDto);
		expect(movement).toEqual({
			balanceId: expect.any(Number),
			amount: movementDto.amount,
			type: movementDto.type,
			concept: movementDto.concept,
			id: id,
		})
	});
});