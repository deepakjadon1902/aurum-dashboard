import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  return format(parseISO(dateStr), 'dd MMM yyyy');
};

export const formatMonth = (dateStr: string): string => {
  return format(parseISO(dateStr), 'MMM yyyy');
};

export const formatShortMonth = (dateStr: string): string => {
  return format(parseISO(dateStr), 'MMM');
};
