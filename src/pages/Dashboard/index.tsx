import {
  ReportProblem as IssuesIcon,
  ShoppingCart as OrdersIcon,
  AttachMoney as RevenueIcon,
  TrendingDown as TrendDownIcon,
  TrendingUp as TrendUpIcon,
  People as UsersIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

// ==================== 类型 ====================

interface CardData {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  color: "primary" | "success" | "warning" | "error";
}

// ==================== 假数据 ====================

const dashboardCards: CardData[] = [
  {
    id: "revenue",
    title: "Revenue",
    value: "¥128,430",
    change: 123.5,
    changeLabel: "较上月",
    icon: RevenueIcon,
    color: "primary",
  },
  {
    id: "users",
    title: "Users",
    value: "45,231",
    change: 8.2,
    changeLabel: "较上月",
    icon: UsersIcon,
    color: "success",
  },
  {
    id: "orders",
    title: "Orders",
    value: "1,893",
    change: -3.4,
    changeLabel: "较上周",
    icon: OrdersIcon,
    color: "warning",
  },
  {
    id: "issues",
    title: "Issues",
    value: "23",
    change: -15.0,
    changeLabel: "较上周",
    icon: IssuesIcon,
    color: "error",
  },
];

// ==================== 页面 ====================

const Dashboard: React.FC = () => {
  const renderTrendIcon = (change: number) => {
    return change >= 0 ? (
      <TrendUpIcon fontSize="small" />
    ) : (
      <TrendDownIcon fontSize="small" />
    );
  };

  const getTrendColor = (change: number) =>
    change >= 0 ? "success.main" : "error.main";

  return (
    <Box sx={{ p: 3 }}>
      {/* 标题区 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Dashboard
        </Typography>
        <Typography color="text.secondary">
          Enterprise dashboard overview
        </Typography>
      </Box>

      {/* 卡片区 */}
      <Grid container spacing={3}>
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          const isUp = card.change >= 0;

          return (
            <Grid size={{ xs: 12, md: 6 }} key={card.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: `6px solid`,
                  borderColor: `${card.color}.main`,
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* 左上角：图标 + 标题（紧跟图标） */}
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: `${card.color}.main`,
                        width: 36,
                        height: 36,
                        boxShadow: `0 4px 12px ${card.color}44`, // 增加一点呼吸感
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 800,
                        color: "text.primary",
                        letterSpacing: 0.5,
                        fontFamily: "'Inter', 'Roboto', sans-serif", // 尽量圆润的字体感
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Stack>

                  {/* 中间：数字文本（修复隐身问题，改为抢眼的蓝色圆润感） */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "100px", // 稍微拉高一点，更抢眼
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 900,
                        color: `${card.color}.main`,
                        fontFamily:
                          "'Rounded Mplus 1c', 'Quicksand', 'Inter', sans-serif",
                        letterSpacing: -2,
                        textShadow: `0 4px 10px ${
                          card.color === "primary"
                            ? "rgba(25, 118, 210, 0.2)"
                            : "rgba(0,0,0,0.1)"
                        }`,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {card.value}
                    </Typography>
                  </Box>

                  {/* 底部趋势区：保持不动，只加个分割线 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      pt: 2,
                      borderTop: "1px dashed", // 改成虚线更显轻盈
                      borderColor: "divider",
                    }}
                  >
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {/* 放大箭头图标 */}
                      <Box
                        sx={{
                          color: getTrendColor(card.change),
                          display: "flex",
                          alignItems: "center",
                          "& svg": { fontSize: "2rem" }, // 重点：把箭头搞大！
                        }}
                      >
                        {renderTrendIcon(card.change)}
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: getTrendColor(card.change),
                        }}
                      >
                        {Math.abs(card.change)}%
                      </Typography>
                    </Stack>

                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        {card.changeLabel}
                      </Typography>
                      {/* 状态标签，去掉颜色背景减少“可点击”误导 */}
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 900,
                          color: getTrendColor(card.change),
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        {isUp ? "↑ UP" : "↓ DOWN"}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Dashboard;
