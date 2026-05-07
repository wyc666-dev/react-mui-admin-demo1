import { MenuItem, Stack, TextField } from "@mui/material";
import type { RangeValue } from "../type";

// const [metric, setMetric] = useState("sales");
// const [loading, setLoading] = useState(false);

interface AnalyticsFilterBarProps {
  range: RangeValue;
  onRangeChange: (range: RangeValue) => void;
}

const AnalyticsFilterBar = ({
  range,
  onRangeChange,
}: AnalyticsFilterBarProps) => {
  return (
    <Stack>
      <TextField
        select
        size="small"
        label="时间范围"
        value={range}
        onChange={(event) => onRangeChange(event.target.value as RangeValue)}
      >
        <MenuItem value="7d">近7日</MenuItem>
        <MenuItem value="30d">近30日</MenuItem>
        <MenuItem value="90d">近90日</MenuItem>
      </TextField>
    </Stack>
  );
};

export default AnalyticsFilterBar;
