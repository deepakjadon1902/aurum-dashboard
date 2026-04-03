import { motion } from 'framer-motion';
import { TransactionTable } from '@/components/transactions/TransactionTable';

const TransactionsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-foreground">Transactions</h2>
        <p className="text-sm text-muted-foreground">Manage and track all your transactions</p>
      </div>
      <TransactionTable />
    </motion.div>
  );
};

export default TransactionsPage;
