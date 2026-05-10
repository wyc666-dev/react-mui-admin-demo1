import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: ReactNode;
  color: string;
}

const MetricCard = ({
  title,
  value,
  change,
  trend,
  icon,
  color,
}: MetricCardProps) => {
  const isUp = trend === "up";

  return (
    <Paper
      sx={{
        p: 2,
        height: 120,
        borderRadius: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {title}
          </Typography>

          <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }} noWrap>
            {value}
          </Typography>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              mt: 1,
              alignItems: "center",
              color: isUp ? "success.main" : "error.main",
            }}
          >
            {isUp ? (
              <ArrowUpwardIcon sx={{ fontSize: 16 }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: 16 }} />
            )}
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {change}
            </Typography>
          </Stack>
        </Box>

        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: `${color}1A`,
            color,
          }}
        >
          {icon}
        </Avatar>
      </Stack>
    </Paper>
  );
};

export default MetricCard;
