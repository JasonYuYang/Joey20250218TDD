import { describe, expect, test, vi } from "vitest";
import { Budget, BudgetService, IBudgetRepo } from "./BudgetService";

describe("BudgetService", () => {
  test("should calculate balance within a single month", () => {
    const mockBudgetRepo: IBudgetRepo = {
      getAll: vi.fn().mockReturnValue([
        new Budget("202502", 2800), // February 2025 has 28 days, daily rate = 100
      ]),
    };

    const budgetService = new BudgetService(mockBudgetRepo);
    expect(budgetService.query("2025-02-10", "2025-02-20")).toBe(1100); // 11 days * 100
  });

  test("should calculate balance across two months", () => {
    const mockBudgetRepo: IBudgetRepo = {
      getAll: vi.fn().mockReturnValue([
        new Budget("202502", 2800), // February: 100/day
        new Budget("202503", 3100), // March: 100/day
      ]),
    };

    const budgetService = new BudgetService(mockBudgetRepo);
    expect(budgetService.query("2025-02-25", "2025-03-05")).toBe(900); // (4 days  100) + (5 days  100)
  });

  test("should return 0 when no budgets exist", () => {
    const mockBudgetRepo: IBudgetRepo = {
      getAll: vi.fn().mockReturnValue([]),
    };

    const budgetService = new BudgetService(mockBudgetRepo);
    expect(budgetService.query("2025-02-01", "2025-03-31")).toBe(0);
  });

  test("should handle cases where only part of a month is within range", () => {
    const mockBudgetRepo: IBudgetRepo = {
      getAll: vi.fn().mockReturnValue([
        new Budget("202502", 2800), // February 2025
        new Budget("202503", 3100), // March 2025
      ]),
    };

    const budgetService = new BudgetService(mockBudgetRepo);
    expect(budgetService.query("2025-03-15", "2025-03-20")).toBe(600); // 6 days * 100
  });
});
