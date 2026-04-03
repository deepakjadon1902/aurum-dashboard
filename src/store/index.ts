import { create } from 'zustand';
import { Transaction, FilterState, Role, Theme, Category } from '@/types';
import { mockTransactions } from '@/data/mockTransactions';

const STORAGE_KEY = 'aurum-store';

interface TransactionSlice {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

interface FilterSlice {
  filters: FilterState;
  setSearchQuery: (q: string) => void;
  setSelectedCategories: (c: Category[]) => void;
  setDateRange: (r: { start: string | null; end: string | null }) => void;
  setTypeFilter: (f: 'all' | 'income' | 'expense') => void;
  setCurrentPage: (p: number) => void;
  setSortConfig: (s: FilterState['sortConfig']) => void;
  resetFilters: () => void;
}

interface UISlice {
  theme: Theme;
  sidebarOpen: boolean;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
}

interface RoleSlice {
  currentRole: Role;
  setRole: (r: Role) => void;
}

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastSlice {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

type Store = TransactionSlice & FilterSlice & UISlice & RoleSlice & ToastSlice;

const defaultFilters: FilterState = {
  searchQuery: '',
  selectedCategories: [],
  dateRange: { start: null, end: null },
  typeFilter: 'all',
  currentPage: 1,
  sortConfig: { key: 'date', direction: 'desc' },
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
};

const saved = loadState();

export const useStore = create<Store>((set, get) => ({
  // Transactions
  transactions: saved?.transactions ?? mockTransactions,
  addTransaction: (t) => {
    const newT: Transaction = { ...t, id: crypto.randomUUID() };
    set((s) => {
      const transactions = [newT, ...s.transactions];
      persist({ transactions });
      return { transactions };
    });
    get().addToast('Transaction added', 'success');
  },
  editTransaction: (id, updates) => {
    set((s) => {
      const transactions = s.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t));
      persist({ transactions });
      return { transactions };
    });
    get().addToast('Transaction updated', 'success');
  },
  deleteTransaction: (id) => {
    set((s) => {
      const transactions = s.transactions.filter((t) => t.id !== id);
      persist({ transactions });
      return { transactions };
    });
    get().addToast('Transaction deleted', 'info');
  },

  // Filters
  filters: defaultFilters,
  setSearchQuery: (q) => set((s) => ({ filters: { ...s.filters, searchQuery: q, currentPage: 1 } })),
  setSelectedCategories: (c) => set((s) => ({ filters: { ...s.filters, selectedCategories: c, currentPage: 1 } })),
  setDateRange: (r) => set((s) => ({ filters: { ...s.filters, dateRange: r, currentPage: 1 } })),
  setTypeFilter: (f) => set((s) => ({ filters: { ...s.filters, typeFilter: f, currentPage: 1 } })),
  setCurrentPage: (p) => set((s) => ({ filters: { ...s.filters, currentPage: p } })),
  setSortConfig: (sortConfig) => set((s) => ({ filters: { ...s.filters, sortConfig } })),
  resetFilters: () => set({ filters: defaultFilters }),

  // UI
  theme: saved?.theme ?? 'dark',
  sidebarOpen: true,
  toggleTheme: () => {
    set((s) => {
      const theme = s.theme === 'dark' ? 'light' : 'dark';
      persist({ theme });
      return { theme };
    });
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Role
  currentRole: saved?.currentRole ?? 'admin',
  setRole: (r) => {
    set({ currentRole: r });
    persist({ currentRole: r });
  },

  // Toasts
  toasts: [],
  addToast: (message, type = 'info') => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 3500);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

function persist(partial: Record<string, unknown>) {
  try {
    const existing = loadState() ?? {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...partial }));
  } catch { /* ignore */ }
}

// Initialize theme class
const initTheme = () => {
  const s = loadState();
  const theme = s?.theme ?? 'dark';
  document.documentElement.classList.toggle('dark', theme === 'dark');
};
initTheme();
