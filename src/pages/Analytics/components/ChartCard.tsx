import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  height?: number;
  loading?: boolean;
  empty?: boolean;
}

const ChartCard = ({
  title,
  children,
  height = 360,
  loading = false,
  empty = false,
}: ChartCardProps) => {
  return (
    <Paper
      sx={{
        p: 2,
        height,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            position: "relative",
          }}
        >
          {loading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={28} />
            </Box>
          ) : empty ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">暂无数据</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {children}
            </Box>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default ChartCard;
