export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food'
  | 'Transport'
  | 'Housing'
  | 'Healthcare'
  | 'Entertainment'
  | 'Shopping'
  | 'Utilities'
  | 'Salary'
  | 'Freelance'
  | 'Investment';

export interface Transaction {
  id: string;
  date: string; // ISO date string
  description: string;
  category: Category;
  type: TransactionType;
  amount: number;
}

export type Role = 'admin' | 'viewer';

export type Theme = 'dark' | 'light';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof Transaction;
  direction: SortDirection;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: Category[];
  dateRange: { start: string | null; end: string | null };
  typeFilter: 'all' | TransactionType;
  currentPage: number;
  sortConfig: SortConfig;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export const CATEGORIES: Category[] = [
  'Food', 'Transport', 'Housing', 'Healthcare', 'Entertainment',
  'Shopping', 'Utilities', 'Salary', 'Freelance', 'Investment',
];

export const CHART_COLORS = [
  'hsl(160, 100%, 39%)',
  'hsl(200, 95%, 55%)',
  'hsl(280, 70%, 60%)',
  'hsl(35, 95%, 55%)',
  'hsl(340, 75%, 55%)',
  'hsl(50, 90%, 50%)',
  'hsl(120, 60%, 45%)',
  'hsl(15, 85%, 55%)',
  'hsl(240, 60%, 60%)',
  'hsl(180, 70%, 45%)',
];
