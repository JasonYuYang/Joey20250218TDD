import {describe, expect, test, vi} from "vitest";
import {Budget, BudgetService, IBudgetRepo} from "./BudgetService";

describe("BudgetService", () => {
    test("endDate is before startDate", () => {
        const mockBudgetRepo: IBudgetRepo = {
            getAll: vi.fn().mockReturnValue([]),
        };

        const budgetService = new BudgetService(mockBudgetRepo);
        expect(budgetService.query("2025-03-31", "2025-03-01")).toBe(0);
    }),
        test("should calculate balance single day", () => {
            const mockBudgetRepo: IBudgetRepo = {
                getAll: vi.fn().mockReturnValue([new Budget("202503", 31000)]),
            };

            const budgetService = new BudgetService(mockBudgetRepo);
            expect(budgetService.query("2025-03-10", "2025-03-10")).toBe(1000);
        });

    test("should calculate balance within a single month", () => {
        const mockBudgetRepo: IBudgetRepo = {
            getAll: vi.fn().mockReturnValue([new Budget("202503", 3100)]),
        };

        const budgetService = new BudgetService(mockBudgetRepo);
        expect(budgetService.query("2025-03-10", "2025-03-20")).toBe(1100);
    });

    test("should calculate balance across two months", () => {
        const mockBudgetRepo: IBudgetRepo = {
            getAll: vi
                .fn()
                .mockReturnValue([
                    new Budget("202503", 3100),
                    new Budget("202504", 30000),
                ]),
        };

        const budgetService = new BudgetService(mockBudgetRepo);
        expect(budgetService.query("2025-03-30", "2025-04-01")).toBe(
            100 * 2 + 1000,
        );
    });

    test("should return 0 when no budgets exist", () => {
        const mockBudgetRepo: IBudgetRepo = {
            getAll: vi.fn().mockReturnValue([]),
        };

        const budgetService = new BudgetService(mockBudgetRepo);
        expect(budgetService.query("2025-03-01", "2025-03-31")).toBe(0);
    });

    test("should calculate correctly if querying partial leap year February", () => {
        const mockBudgetRepo: IBudgetRepo = {
            getAll: vi.fn().mockReturnValue([
                new Budget("202402", 2900), // Leap year February has 29 days, daily rate = 100
            ]),
        };

        const budgetService = new BudgetService(mockBudgetRepo);
        expect(budgetService.query("2024-02-15", "2024-02-20")).toBe(600); // 6 days * 100
    });
});