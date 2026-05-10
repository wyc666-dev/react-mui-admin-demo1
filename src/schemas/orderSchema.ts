import { z } from "zod";

export const orderSchema = z.object({
  orderId: z.number({ 
    required_error: "订单号必填",
    invalid_type_error: "订单号必须是数字" 
  }),
  customerName: z.string().min(1, "客户姓名必填"),
  amount: z.number({ 
    required_error: "金额必填",
    invalid_type_error: "金额必须是数字" 
  }).refine((val) => val !== 0, "金额不能为零"),
  status: z.enum(["待付款", "已付款", "已发货", "已完成"], { 
    errorMap: () => ({ message: "请选择订单状态" }) 
  }),
  createdAt: z.string().min(1, "创建时间必填"),
  product: z.string().min(1, "商品名称必填"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
