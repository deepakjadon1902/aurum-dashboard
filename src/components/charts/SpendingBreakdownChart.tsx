import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore } from '@/store';
import { groupByCategory, getCurrentMonthTransactions } from '@/utils/calculations';
import { formatCurrency } from '@/utils/format';
import { CHART_COLORS } from '@/types';

export const SpendingBreakdownChart = () => {
  const transactions = useStore((s) => s.transactions);
  const current = getCurrentMonthTransactions(transactions);
  const expenses = current.filter((t) => t.type === 'expense');
  const data = groupByCategory(expenses);

  if (data.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Spending Breakdown</h3>
        <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">No expenses this month</div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Spending Breakdown</h3>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value: number) => [formatCurrency(value)]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {data.slice(0, 5).map((item, i) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-mono text-foreground">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
