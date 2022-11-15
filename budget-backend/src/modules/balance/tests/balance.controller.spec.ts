import { Test, TestingModule } from '@nestjs/testing';
import { Sanitizer } from '../../../utils/sanitizer';
import { BalanceController } from '../balance.controller';
import { BalanceService } from '../balance.service';

describe("BalanceController", () => {
	let balanceController: BalanceController;

	const mockBalanceService = {
		findById: jest.fn((id: number) => {
			return {
				id: id,
				initialAmount: 0,
				total: 0,
				movements: [],
			}
		}),
		updateBalance: jest.fn((id: number, amount: number) => {
			return {
				id: id,
				total: amount,
				initialAmount: amount,
				movements: [],
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
			controllers: [BalanceController],
			providers: [
				BalanceService,
				Sanitizer,
			]
		}).overrideProvider(BalanceService)
			.useValue(mockBalanceService)
			.overrideProvider(Sanitizer)
			.useValue(mockSanitizer)
			.compile();

		balanceController = module.get<BalanceController>(BalanceController);
	});

	it("should be defined", () => {
		expect(balanceController).toBeDefined();
	});

	it("should return a balance", async () => {
		const id = 1;
		const balance = await balanceController.getBalance(id);
		expect(balance).toEqual({
			id: id,
			total: 0,
			initialAmount: 0,
			movements: [],
		});
	});

	it("should update a balance", async () => {
		const id = 1;
		const amount = 500;
		const updatedBalance = await balanceController.updateBalance(id, amount);
		expect(updatedBalance).toEqual({
			id: id,
			initialAmount: 500,
			total: 500,
			movements: [],
		});
	});
});