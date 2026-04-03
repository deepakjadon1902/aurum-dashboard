import { Transaction } from '@/types';
import { formatDate, formatCurrency } from './format';

export const exportToCSV = (transactions: Transaction[], filename = 'transactions.csv'): void => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [
    formatDate(t.date),
    `"${t.description}"`,
    t.category,
    t.type,
    formatCurrency(t.amount),
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
