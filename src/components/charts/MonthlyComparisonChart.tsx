import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useInsights } from '@/hooks/useInsights';
import { formatCurrency } from '@/utils/format';

export const MonthlyComparisonChart = () => {
  const { monthlyData } = useInsights();

  if (monthlyData.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Comparison</h3>
        <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">No data available</div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Comparison</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={monthlyData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
            formatter={(value: number) => [formatCurrency(value)]}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="income" name="Income" fill="hsl(160, 100%, 39%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
