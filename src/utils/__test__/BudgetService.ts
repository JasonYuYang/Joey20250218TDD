import dayjs from "dayjs";

export class BudgetService {
  private _budgetRepo: IBudgetRepo;

  constructor(budgetRepo: IBudgetRepo) {
    this._budgetRepo = budgetRepo;
  }

  query(start: string, end: string): number {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const budgets = this._budgetRepo.getAll();

    let totalBalance = 0;

    budgets.forEach((budget) => {
      const budgetMonth = dayjs(budget.yearMonth, "YYYYMM");
      const monthStart = budgetMonth.startOf("month");
      const monthEnd = budgetMonth.endOf("month");
      const daysInMonth = monthEnd.diff(monthStart, "day") + 1;
      const dailyRate = budget.amount / daysInMonth;

      // Calculate the overlapping days between the budget month and the query range
      const effectiveStart = startDate.isAfter(monthStart)
        ? startDate
        : monthStart;
      const effectiveEnd = endDate.isBefore(monthEnd) ? endDate : monthEnd;

      if (
        effectiveStart.isBefore(effectiveEnd) ||
        effectiveStart.isSame(effectiveEnd)
      ) {
        const daysCount = effectiveEnd.diff(effectiveStart, "day") + 1;
        totalBalance += daysCount * dailyRate;
      }
    });

    return totalBalance;
  }
}

export interface IBudgetRepo {
  getAll: () => Budget[];
}

export class Budget {
  yearMonth: string;
  amount: number;

  constructor(yearMonth: string, amount: number) {
    this.yearMonth = yearMonth;
    this.amount = amount;
  }
}
