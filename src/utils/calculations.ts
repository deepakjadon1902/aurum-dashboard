import { Transaction, Category, ChartDataPoint, MonthlyData, CHART_COLORS } from '@/types';
import { startOfMonth, endOfMonth, subMonths, parseISO, isWithinInterval, format } from 'date-fns';

export const groupByCategory = (transactions: Transaction[]): ChartDataPoint[] => {
  const map = new Map<string, number>();
  transactions.forEach((t) => {
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
  });
  return Array.from(map.entries())
    .map(([name, value], i) => ({ name, value, fill: CHART_COLORS[i % CHART_COLORS.length] }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyData = (transactions: Transaction[], months: number): MonthlyData[] => {
  const now = new Date();
  const result: MonthlyData[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = subMonths(now, i);
    const start = startOfMonth(d);
    const end = endOfMonth(d);
    const monthTxns = transactions.filter((t) => {
      const date = parseISO(t.date);
      return isWithinInterval(date, { start, end });
    });
    result.push({
      month: format(start, 'MMM'),
      income: monthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      expense: monthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    });
  }
  return result;
};

export const getCurrentMonthTransactions = (transactions: Transaction[]): Transaction[] => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  return transactions.filter((t) => {
    const date = parseISO(t.date);
    return isWithinInterval(date, { start, end });
  });
};

export const getPreviousMonthTransactions = (transactions: Transaction[]): Transaction[] => {
  const now = new Date();
  const prev = subMonths(now, 1);
  const start = startOfMonth(prev);
  const end = endOfMonth(prev);
  return transactions.filter((t) => {
    const date = parseISO(t.date);
    return isWithinInterval(date, { start, end });
  });
};

export const getTotalByType = (transactions: Transaction[], type: 'income' | 'expense'): number => {
  return transactions.filter((t) => t.type === type).reduce((sum, t) => sum + t.amount, 0);
};

export const getSavingsRate = (income: number, expenses: number): number => {
  if (income === 0) return 0;
  return Math.round(((income - expenses) / income) * 100);
};

export const getPercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

export const getHighestSpendingCategory = (transactions: Transaction[]): { category: Category; total: number; percentage: number } | null => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return null;
  const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
  const grouped = groupByCategory(expenses);
  const top = grouped[0];
  return {
    category: top.name as Category,
    total: top.value,
    percentage: Math.round((top.value / totalExpenses) * 100),
  };
};

export const generateInsights = (current: Transaction[], previous: Transaction[]): string[] => {
  const insights: string[] = [];
  const curExpenses = current.filter((t) => t.type === 'expense');
  const prevExpenses = previous.filter((t) => t.type === 'expense');

  const curByCategory = new Map<string, number>();
  curExpenses.forEach((t) => curByCategory.set(t.category, (curByCategory.get(t.category) || 0) + t.amount));

  const prevByCategory = new Map<string, number>();
  prevExpenses.forEach((t) => prevByCategory.set(t.category, (prevByCategory.get(t.category) || 0) + t.amount));

  curByCategory.forEach((curVal, cat) => {
    const prevVal = prevByCategory.get(cat) || 0;
    if (prevVal > 0) {
      const change = getPercentageChange(curVal, prevVal);
      if (change > 20) {
        insights.push(`You spent ${change}% more on ${cat} this month`);
      } else if (change < -20) {
        insights.push(`Great job! You reduced ${cat} spending by ${Math.abs(change)}%`);
      }
    }
  });

  const curIncome = getTotalByType(current, 'income');
  const curExpTotal = getTotalByType(current, 'expense');
  const savingsRate = getSavingsRate(curIncome, curExpTotal);
  if (savingsRate > 30) {
    insights.push(`Your savings rate is ${savingsRate}% — excellent discipline!`);
  } else if (savingsRate < 10 && curIncome > 0) {
    insights.push(`Your savings rate is only ${savingsRate}% — consider cutting expenses`);
  }

  return insights.slice(0, 5);
};
