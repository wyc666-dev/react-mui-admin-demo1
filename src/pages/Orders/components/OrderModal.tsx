import type { Order } from "@/pages/Orders/type";
import { orderSchema, type OrderFormData } from "@/schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";

interface OrderModalProps {
  onClose: () => void;
  onSubmit: (data: Order) => void;
  initialData?: Order | null;
}

const statusOptions = ["待付款", "已付款", "已发货", "已完成"] as const;

const OrderModal = ({ onClose, onSubmit, initialData }: OrderModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderId: initialData?.orderId === "" ? undefined : initialData?.orderId,
      customerName: initialData?.customerName || "",
      amount: initialData?.amount === "" ? undefined : initialData?.amount,
      status: initialData?.status || undefined,
      createdAt: initialData?.createdAt || "",
      product: initialData?.product || "",
    },
  });

  const onFormSubmit = (data: OrderFormData) => {
    onSubmit({
      ...initialData,
      ...data,
      id: initialData?.id || 0,
    } as Order);
  };

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
              {...register("orderId", { valueAsNumber: true })}
              error={!!errors.orderId}
              helperText={errors.orderId?.message}
            />
            <TextField
              label="客户姓名"
              fullWidth
              {...register("customerName")}
              error={!!errors.customerName}
              helperText={errors.customerName?.message}
            />
          </Stack>

          <TextField
            label="商品名称"
            fullWidth
            {...register("product")}
            error={!!errors.product}
            helperText={errors.product?.message}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="订单金额"
              type="number"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">￥</InputAdornment>
                  ),
                },
              }}
              {...register("amount", { valueAsNumber: true })}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
            <TextField
              select
              label="订单状态"
              fullWidth
              defaultValue={initialData?.status || ""}
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
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
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("createdAt")}
            error={!!errors.createdAt}
            helperText={errors.createdAt?.message}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={handleSubmit(onFormSubmit)}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
