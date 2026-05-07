import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import AnalyticsFilterBar from "./components/AnalyticsFilterBar";
import ChartCard from "./components/ChartCard";
import MetricCard from "./components/MetricCard";
import OrderStatusChart from "./components/OrderStatusChart";
import SalesTrendChart from "./components/SalesTrendChart";
import type { RangeValue, SalesTrendItem } from "./type";

const salesTrendDataMap: Record<RangeValue, SalesTrendItem[]> = {
  "7d": [
    { date: "周一", sales: 12000, orders: 180 },
    { date: "周二", sales: 16800, orders: 220 },
    { date: "周三", sales: 14200, orders: 196 },
    { date: "周四", sales: 21000, orders: 260 },
    { date: "周五", sales: 18500, orders: 240 },
    { date: "周六", sales: 24000, orders: 310 },
    { date: "周日", sales: 19800, orders: 275 },
  ],
  "30d": [
    { date: "第1周", sales: 62000, orders: 820 },
    { date: "第2周", sales: 78000, orders: 960 },
    { date: "第3周", sales: 69000, orders: 890 },
    { date: "第4周", sales: 92000, orders: 1120 },
  ],
  "90d": [
    { date: "1月", sales: 180000, orders: 2400 },
    { date: "2月", sales: 220000, orders: 2860 },
    { date: "3月", sales: 196000, orders: 2600 },
  ],
};

const metricCards = [
  {
    title: "总销售额",
    value: "￥128,430",
    change: "12.5%",
    trend: "up" as const,
    color: "#2e7d32",
    icon: <PaidOutlinedIcon />,
  },
  {
    title: "订单数",
    value: "2,846",
    change: "8.2%",
    trend: "up" as const,
    color: "#1976d2",
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    title: "访问量",
    value: "56,210",
    change: "3.1%",
    trend: "down" as const,
    color: "#7b1fa2",
    icon: <VisibilityOutlinedIcon />,
  },
  {
    title: "转化率",
    value: "6.8%",
    change: "1.4%",
    trend: "up" as const,
    color: "#ed6c02",
    icon: <PercentOutlinedIcon />,
  },
];
const orderStatusData = [
  { status: "已付款", count: 1200 },
  { status: "待付款", count: 400 },
  { status: "已发货", count: 800 },
  { status: "已完成", count: 2000 },
];

const Analytics = () => {
  const [range, setRange] = useState<RangeValue>("7d");
  const currentSalesTrendData = salesTrendDataMap[range];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <ChartCard title="筛选工具栏" height={96}>
              <AnalyticsFilterBar range={range} onRangeChange={setRange} />
            </ChartCard>
          </Grid>

          {metricCards.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
              <MetricCard
                title={card.title}
                value={card.value}
                change={card.change}
                trend={card.trend}
                color={card.color}
                icon={card.icon}
              />
            </Grid>
          ))}

          <Grid size={{ xs: 12, md: 8 }}>
            <ChartCard title="销售趋势" height={400}>
              <SalesTrendChart salesTrendData={currentSalesTrendData} />
            </ChartCard>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ChartCard title="订单状态分布" height={400}>
              <OrderStatusChart orderStatusData={orderStatusData} />
            </ChartCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Analytics;
