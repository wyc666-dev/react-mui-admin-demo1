import type { Order } from "@/pages/Orders/type";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface OrderModalProps {
  onClose: () => void;
  onSubmit: (data: Order) => void;
  initialData?: Order | null;
}

const statusOptions = ["待付款", "已付款", "已发货", "已完成"] as const;

const emptyOrder: Order = {
  id: 0,
  orderId: "",
  customerName: "",
  amount: "",
  status: "",
  createdAt: "",
  product: "",
};

const OrderModal = ({ onClose, onSubmit, initialData }: OrderModalProps) => {
  const [formData, setFormData] = useState<Order>(initialData || emptyOrder);

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "编辑订单" : "添加订单"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="订单号"
              type="number"
              fullWidth
              value={formData.orderId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  orderId: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
            />
            <TextField
              label="客户姓名"
              fullWidth
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
            />
          </Stack>

          <TextField
            label="商品名称"
            fullWidth
            value={formData.product}
            onChange={(e) =>
              setFormData({ ...formData, product: e.target.value })
            }
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="订单金额"
              type="number"
              fullWidth
              value={formData.amount}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">￥</InputAdornment>
                  ),
                },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
            />
            <TextField
              select
              label="订单状态"
              fullWidth
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Order["status"],
                })
              }
            >
              <MenuItem value="">
                <em>-- 请选择状态 --</em>
              </MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <TextField
            label="创建时间"
            type="date"
            fullWidth
            value={formData.createdAt}
            slotProps={{ inputLabel: { shrink: true } }}
            onChange={(e) =>
              setFormData({ ...formData, createdAt: e.target.value })
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={() => onSubmit(formData)}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
