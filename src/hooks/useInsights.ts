import { useMemo } from 'react';
import { useStore } from '@/store';
import {
  getCurrentMonthTransactions,
  getPreviousMonthTransactions,
  getTotalByType,
  getSavingsRate,
  getPercentageChange,
  getHighestSpendingCategory,
  generateInsights,
  getMonthlyData,
} from '@/utils/calculations';

export const useInsights = () => {
  const transactions = useStore((s) => s.transactions);

  return useMemo(() => {
    const current = getCurrentMonthTransactions(transactions);
    const previous = getPreviousMonthTransactions(transactions);

    const curIncome = getTotalByType(current, 'income');
    const curExpenses = getTotalByType(current, 'expense');
    const prevIncome = getTotalByType(previous, 'income');
    const prevExpenses = getTotalByType(previous, 'expense');

    const totalBalance = transactions.reduce(
      (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
      0
    );

    return {
      totalBalance,
      monthlyIncome: curIncome,
      monthlyExpenses: curExpenses,
      savingsRate: getSavingsRate(curIncome, curExpenses),
      incomeChange: getPercentageChange(curIncome, prevIncome),
      expenseChange: getPercentageChange(curExpenses, prevExpenses),
      savingsRateChange: getSavingsRate(curIncome, curExpenses) - getSavingsRate(prevIncome, prevExpenses),
      highestCategory: getHighestSpendingCategory(current),
      topExpenses: current
        .filter((t) => t.type === 'expense')
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3),
      insights: generateInsights(current, previous),
      monthlyData: getMonthlyData(transactions, 6),
    };
  }, [transactions]);
};
