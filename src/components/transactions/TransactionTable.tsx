import { useState, useCallback } from 'react';
import { useStore } from '@/store';
import { useFilteredTransactions } from '@/hooks/useTransactions';
import { formatCurrency, formatDate } from '@/utils/format';
import { Transaction, Category, CATEGORIES } from '@/types';
import { exportToCSV } from '@/utils/csv';
import { ArrowUpDown, Search, Download, Plus, Pencil, Trash2, X, FileQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionTable = () => {
  const { filtered, paginated, totalPages } = useFilteredTransactions();
  const filters = useStore((s) => s.filters);
  const setSearchQuery = useStore((s) => s.setSearchQuery);
  const setTypeFilter = useStore((s) => s.setTypeFilter);
  const setSelectedCategories = useStore((s) => s.setSelectedCategories);
  const setCurrentPage = useStore((s) => s.setCurrentPage);
  const setSortConfig = useStore((s) => s.setSortConfig);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const currentRole = useStore((s) => s.currentRole);
  const isAdmin = currentRole === 'admin';

  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [showForm, setShowForm] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Debounced search
  const debounceRef = useState<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = useCallback((val: string) => {
    setSearchInput(val);
    if (debounceRef[0]) clearTimeout(debounceRef[0]);
    debounceRef[0] = setTimeout(() => setSearchQuery(val), 300);
  }, [setSearchQuery, debounceRef]);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig({
      key,
      direction: filters.sortConfig.key === key && filters.sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const toggleCategory = (cat: Category) => {
    const cats = filters.selectedCategories.includes(cat)
      ? filters.selectedCategories.filter((c) => c !== cat)
      : [...filters.selectedCategories, cat];
    setSelectedCategories(cats);
  };

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          {(['all', 'income', 'expense'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                filters.typeFilter === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button onClick={() => exportToCSV(filtered)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-muted/50 border border-border text-foreground hover:bg-muted transition-colors">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>

        {isAdmin && (
          <button onClick={() => { setEditingTxn(null); setShowForm(true); }} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Transaction
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              filters.selectedCategories.includes(cat)
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['date', 'description', 'category', 'type', 'amount'].map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col as keyof Transaction)}
                    className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {col}
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                ))}
                {isAdmin && <th className="px-4 py-3 w-20" />}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <FileQuestion className="w-10 h-10 opacity-40" />
                        <p className="text-sm font-medium">No transactions found</p>
                        <p className="text-xs">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((t) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{formatDate(t.date)}</td>
                      <td className="px-4 py-3 text-foreground">{t.description}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{t.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium capitalize ${t.type === 'income' ? 'text-primary' : 'text-destructive'}`}>{t.type}</span>
                      </td>
                      <td className={`px-4 py-3 font-mono font-medium ${t.type === 'income' ? 'text-primary' : 'text-destructive'}`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => { setEditingTxn(t); setShowForm(true); }} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setDeleteId(t.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">{filtered.length} transactions</span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-md text-xs font-medium transition-all ${
                    filters.currentPage === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Transaction Form Modal */}
      <AnimatePresence>
        {showForm && (
          <TransactionFormModal
            editingTxn={editingTxn}
            onClose={() => { setShowForm(false); setEditingTxn(null); }}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="glass-card p-6 max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-foreground font-semibold mb-2">Delete Transaction</h3>
              <p className="text-sm text-muted-foreground mb-4">Are you sure? This action cannot be undone.</p>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setDeleteId(null)} className="px-3 py-1.5 rounded-lg text-sm bg-muted text-foreground hover:bg-muted/80 transition-colors">Cancel</button>
                <button onClick={() => { deleteTransaction(deleteId); setDeleteId(null); }} className="px-3 py-1.5 rounded-lg text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Transaction Form Modal ─────────────────────────────────────────

interface FormModalProps {
  editingTxn: Transaction | null;
  onClose: () => void;
}

const TransactionFormModal = ({ editingTxn, onClose }: FormModalProps) => {
  const addTransaction = useStore((s) => s.addTransaction);
  const editTransaction = useStore((s) => s.editTransaction);

  const [form, setForm] = useState({
    description: editingTxn?.description ?? '',
    category: editingTxn?.category ?? ('Food' as Category),
    type: editingTxn?.type ?? ('expense' as 'income' | 'expense'),
    amount: editingTxn?.amount?.toString() ?? '',
    date: editingTxn?.date ?? new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const data = {
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      amount: Number(form.amount),
      date: form.date,
    };
    if (editingTxn) {
      editTransaction(editingTxn.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-end bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="h-full w-full max-w-md bg-card border-l border-border p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">{editingTxn ? 'Edit' : 'Add'} Transaction</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Description" error={errors.description}>
            <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="form-input" />
          </Field>
          <Field label="Amount (₹)" error={errors.amount}>
            <input type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} className="form-input" />
          </Field>
          <Field label="Date" error={errors.date}>
            <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="form-input" />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))} className="form-input">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Type">
            <div className="flex gap-2">
              {(['expense', 'income'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    form.type === t
                      ? t === 'income' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-destructive/20 text-destructive border border-destructive/30'
                      : 'bg-muted text-muted-foreground border border-transparent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>
          <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            {editingTxn ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
    {children}
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);
