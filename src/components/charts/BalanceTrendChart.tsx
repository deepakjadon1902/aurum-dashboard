import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useInsights } from '@/hooks/useInsights';
import { useStore } from '@/store';
import { getMonthlyData } from '@/utils/calculations';
import { formatCurrency } from '@/utils/format';

type Range = '1M' | '3M' | '6M';

export const BalanceTrendChart = () => {
  const [range, setRange] = useState<Range>('6M');
  const transactions = useStore((s) => s.transactions);

  const months = range === '1M' ? 1 : range === '3M' ? 3 : 6;
  const data = getMonthlyData(transactions, months).map((d) => ({
    ...d,
    balance: d.income - d.expense,
  }));

  const ranges: Range[] = ['1M', '3M', '6M'];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Balance Trend</h3>
        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                range === r ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      {data.length === 0 ? (
        <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">No data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 100%, 39%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(160, 100%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value: number) => [formatCurrency(value), 'Balance']}
            />
            <Area type="monotone" dataKey="balance" stroke="hsl(160, 100%, 39%)" fill="url(#balanceGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
