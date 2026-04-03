import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { BalanceTrendChart } from '@/components/charts/BalanceTrendChart';
import { SpendingBreakdownChart } from '@/components/charts/SpendingBreakdownChart';
import { useInsights } from '@/hooks/useInsights';

const DashboardPage = () => {
  const { totalBalance, monthlyIncome, monthlyExpenses, savingsRate, incomeChange, expenseChange, savingsRateChange } = useInsights();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Your financial overview at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Balance" value={totalBalance} change={incomeChange} icon={Wallet} delay={0} />
        <SummaryCard title="Monthly Income" value={monthlyIncome} change={incomeChange} icon={TrendingUp} delay={1} />
        <SummaryCard title="Monthly Expenses" value={monthlyExpenses} change={expenseChange} icon={TrendingDown} delay={2} />
        <SummaryCard title="Savings Rate" value={savingsRate} change={savingsRateChange} icon={PiggyBank} isCurrency={false} isPercentage delay={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
    </motion.div>
  );
};

export default DashboardPage;
