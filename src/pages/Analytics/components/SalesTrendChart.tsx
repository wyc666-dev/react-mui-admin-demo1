// 核心逻辑推导：
// 1. 定义数据结构（时间 + 数值）
// 2. 引入 ResponsiveContainer，让图表像水一样填满 ChartCard 的 Box
// 3. 使用 <defs> 定义渐变色，让图表下方有那种淡入淡出的高级感
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { TooltipContentProps } from "recharts";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { SalesTrendItem } from "../type";

interface SalesTrendChartProps {
  salesTrendData: SalesTrendItem[];
}

const SalesTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;

  return (
    <div>
      <p>{label}</p>
      <p>销售额：￥{payload[0].value}</p>
    </div>
  );
};
const SalesTrendChart = ({ salesTrendData }: SalesTrendChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        "& .recharts-wrapper, & .recharts-surface, & .recharts-wrapper *": {
          outline: "none",
        },
      }}
    >
      {size && (
        <ResponsiveContainer width={size.width} height={size.height} minWidth={0}>
          <AreaChart data={salesTrendData} accessibilityLayer={false}>
            <defs>
              <linearGradient x1="0" y1="0" x2="0" y2="1" id="salesTrendGradient">
                <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2e7d32" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={(props) => <SalesTooltip {...props} />} />
            <Area
              dataKey="sales"
              fill="url(#salesTrendGradient)"
              stroke="#2eccd1"
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};
export default SalesTrendChart;
