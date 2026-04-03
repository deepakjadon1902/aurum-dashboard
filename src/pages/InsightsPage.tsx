import { motion } from 'framer-motion';
import { useInsights } from '@/hooks/useInsights';
import { MonthlyComparisonChart } from '@/components/charts/MonthlyComparisonChart';
import { SavingsRateChart } from '@/components/charts/SavingsRateChart';
import { formatCurrency } from '@/utils/format';
import { TrendingUp, AlertTriangle, Zap, Crown } from 'lucide-react';

const InsightsPage = () => {
  const { highestCategory, topExpenses, insights } = useInsights();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-foreground">Insights</h2>
        <p className="text-sm text-muted-foreground">Smart analysis of your spending patterns</p>
      </div>

      {/* Smart insights */}
      {insights.length > 0 && (
        <div className="space-y-2">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card px-4 py-3 flex items-center gap-3"
            >
              <Zap className="w-4 h-4 text-chart-4 shrink-0" />
              <span className="text-sm text-foreground">{insight}</span>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Highest spending category */}
        {highestCategory && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4 text-chart-4" />
              Highest Spending Category
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{highestCategory.category}</p>
                <p className="font-mono text-destructive text-sm">{formatCurrency(highestCategory.total)}</p>
                <p className="text-xs text-muted-foreground">{highestCategory.percentage}% of total expenses</p>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 expenses */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-destructive" />
            Top Expenses This Month
          </h3>
          {topExpenses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No expenses this month</p>
          ) : (
            <div className="space-y-3">
              {topExpenses.map((t, i) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                    <div>
                      <p className="text-sm text-foreground">{t.description}</p>
                      <p className="text-xs text-muted-foreground">{t.category}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-destructive">{formatCurrency(t.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyComparisonChart />
        <SavingsRateChart />
      </div>
    </motion.div>
  );
};

export default InsightsPage;
