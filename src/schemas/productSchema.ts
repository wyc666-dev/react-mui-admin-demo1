import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "名称必填"),
  price: z.number({ error: "价格必须是数字" }).gt(0, "价格必须大于0"),
  stock: z.number({ error: "库存必须是数字" }).int("库存必须是整数").min(0, "库存不能为负数"),
  category: z.string().min(1, "分类必填"),
  image: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
