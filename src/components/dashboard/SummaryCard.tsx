import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/format';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  isCurrency?: boolean;
  isPercentage?: boolean;
  delay?: number;
}

export const SummaryCard = ({ title, value, change, icon: Icon, isCurrency = true, isPercentage = false, delay = 0 }: SummaryCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setDisplayValue(Math.round(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const TrendIcon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;
  const trendColor = change > 0 ? 'text-primary' : change < 0 ? 'text-destructive' : 'text-muted-foreground';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div className="font-mono text-2xl font-semibold text-foreground mb-1">
        {isCurrency ? formatCurrency(displayValue) : isPercentage ? `${displayValue}%` : displayValue.toLocaleString()}
      </div>
      <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
        <TrendIcon className="w-3 h-3" />
        <span>{Math.abs(change)}% vs last month</span>
      </div>
    </motion.div>
  );
};
