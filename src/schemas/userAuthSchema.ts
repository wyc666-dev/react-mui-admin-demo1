import { z } from "zod";

export const userAuthSchema = z.object({
  username: z
    .string()
    .min(6, "账号至少6个字符")
    .max(12, "账号最多12个字符")
    .regex(/^[a-zA-Z0-9-]+$/),
  password: z.string().min(8, "密码至少8个字符").max(99, "密码最多99个字符"),
});
