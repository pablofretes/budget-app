import { Test, TestingModule } from "@nestjs/testing";
import { PROVIDERS } from "../../../common/constants";
import { BalanceService } from "../balance.service";
import { BalanceDto } from "../dto/balance-create.dto";

describe("BalanceService", () => {
	let balanceService: BalanceService;
	const mockBalanceRepository = {
		create: jest.fn((dto: BalanceDto) => {
			return {
				id: 1,
				initialAmount: dto.initialAmount,
				total: dto.total,
				movements: [],
				createdAt: new Date(),
			}
		}),
		save: jest.fn((dto: BalanceDto) => {
			return {
				id: 1,
				initialAmount: dto.initialAmount,
				total: dto.total,
				movements: [],
				createdAt: new Date(),
			}
		}),
		findOne: jest.fn((obj: { where: { id: number } }) => {
			return {
				id: obj.where.id,
				initialAmount: 888,
				total: 999,
				movements: [],
				createdAt: new Date(),
			}
		})
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BalanceService,
				{
					provide: PROVIDERS.BALANCE_PROVIDERS,
					useValue: mockBalanceRepository
				}
			]
		}).compile();

		balanceService = module.get<BalanceService>(BalanceService);
	});

	it("should be defined", () => {
		expect(balanceService).toBeDefined();
	});

	it("creates a balance and returns it", async () => {
		const balanceDto = { initialAmount: 0, total: 0 };
		const savedBalance = await balanceService.createBalance(balanceDto);
		expect(savedBalance).toEqual({
			id: expect.any(Number),
			initialAmount: balanceDto.initialAmount,
			total: balanceDto.total,
			movements: [],
			createdAt: expect.any(Date),
		});
	});

	it("finds a balance by id and returns it", async () => {
		const id = 1;
		const balance = await balanceService.findById(id);
		expect(balance).toEqual({
			id: id,
			initialAmount: expect.any(Number),
			total: expect.any(Number),
			movements: [],
			createdAt: expect.any(Date),
		});
	});
})