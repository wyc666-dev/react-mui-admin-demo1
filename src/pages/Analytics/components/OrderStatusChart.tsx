// 核心逻辑推导：
// 1. 横轴是状态名，纵轴是数量
// 2. 必须要处理 Tooltip 的样式，不能用原生的那种灰扑扑的框
// 3. 柱子要设置一定的圆角（radius），不然太尖锐，不像现代 UI
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { TooltipContentProps } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface OrderStatusItem {
  status: string;
  count: number;
}

interface OrderStatusChartProps {
  orderStatusData: OrderStatusItem[];
}
const OrderStatusTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;

  const count = Number(payload[0].value ?? 0);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        borderRadius: 2,
        minWidth: 128,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          订单量
        </Typography>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>
          {count.toLocaleString()} 单
        </Typography>
      </Stack>
    </Paper>
  );
};
const OrderStatusChart = ({ orderStatusData }: OrderStatusChartProps) => {
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
          <BarChart
            data={orderStatusData}
            accessibilityLayer={false}
            margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E7D8C8"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="status"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7A5C48", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7A5C48", fontSize: 12 }}
              width={42}
            />
            <Tooltip
              cursor={{ fill: "rgba(22, 119, 255, 0.08)" }}
              content={(props) => <OrderStatusTooltip {...props} />}
            />
            <Bar
              dataKey="count"
              barSize={28}
              radius={[6, 6, 0, 0]}
              fill="#1677ff"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default OrderStatusChart;
