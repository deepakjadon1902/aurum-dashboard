import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '@/store';
import { getMonthlyData } from '@/utils/calculations';

export const SavingsRateChart = () => {
  const transactions = useStore((s) => s.transactions);
  const data = getMonthlyData(transactions, 6).map((d) => ({
    month: d.month,
    rate: d.income > 0 ? Math.round(((d.income - d.expense) / d.income) * 100) : 0,
  }));

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Savings Rate Trend</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
            formatter={(value: number) => [`${value}%`, 'Savings Rate']}
          />
          <Line type="monotone" dataKey="rate" stroke="hsl(200, 95%, 55%)" strokeWidth={2} dot={{ fill: 'hsl(200, 95%, 55%)', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
