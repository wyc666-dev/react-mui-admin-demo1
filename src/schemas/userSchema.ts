import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "姓名必填"),
  age: z.number({ 
    required_error: "年龄必填",
    invalid_type_error: "年龄必须是数字" 
  }).min(1, "年龄必须大于0"),
  gender: z.enum(["男", "女"], { 
    errorMap: () => ({ message: "性别必填" }) 
  }),
  address: z.string().min(1, "地址必填"),
});

export type UserFormData = z.infer<typeof userSchema>;
