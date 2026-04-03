import { useMemo } from 'react';
import { useStore } from '@/store';
import { Transaction } from '@/types';
import { parseISO, isWithinInterval } from 'date-fns';

export const useFilteredTransactions = (): { filtered: Transaction[]; paginated: Transaction[]; totalPages: number } => {
  const transactions = useStore((s) => s.transactions);
  const filters = useStore((s) => s.filters);
  const PAGE_SIZE = 10;

  return useMemo(() => {
    let result = [...transactions];

    // Search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(q));
    }

    // Categories
    if (filters.selectedCategories.length > 0) {
      result = result.filter((t) => filters.selectedCategories.includes(t.category));
    }

    // Date range
    if (filters.dateRange.start && filters.dateRange.end) {
      const start = parseISO(filters.dateRange.start);
      const end = parseISO(filters.dateRange.end);
      result = result.filter((t) => isWithinInterval(parseISO(t.date), { start, end }));
    }

    // Type
    if (filters.typeFilter !== 'all') {
      result = result.filter((t) => t.type === filters.typeFilter);
    }

    // Sort
    const { key, direction } = filters.sortConfig;
    result.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    const totalPages = Math.max(1, Math.ceil(result.length / PAGE_SIZE));
    const start = (filters.currentPage - 1) * PAGE_SIZE;
    const paginated = result.slice(start, start + PAGE_SIZE);

    return { filtered: result, paginated, totalPages };
  }, [transactions, filters]);
};
