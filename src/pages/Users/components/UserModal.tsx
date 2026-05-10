import type { User } from "@/pages/Users/type";
import { userSchema, type UserFormData } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

/**
 * 【文件路径：src/pages/Users/components/UserModal.tsx】
 */

interface UserModalProps {
  onClose: () => void;
  onSubmit: (data: User) => void;
  initialData?: User | null;
}

const UserModal = ({ onClose, onSubmit, initialData }: UserModalProps) => {
  const ageOptions = Array.from({ length: 43 }, (_, i) => i + 18);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || "",
      age: initialData?.age === "" ? undefined : initialData?.age,
      gender: initialData?.gender || undefined,
      address: initialData?.address || "",
    },
  });

  const onFormSubmit = (data: UserFormData) => {
    onSubmit({
      ...initialData,
      ...data,
      id: initialData?.id || 0,
    } as User);
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{initialData ? "修改用户信息" : "招募新伙伴"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="姓名"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            select
            label="年龄"
            fullWidth
            defaultValue={initialData?.age || ""}
            {...register("age", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
          >
            <MenuItem value="">
              <em>-- 请选择年龄 --</em>
            </MenuItem>
            {ageOptions.map((age) => (
              <MenuItem key={age} value={age}>
                {age} 岁
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="性别"
            fullWidth
            defaultValue={initialData?.gender || ""}
            {...register("gender")}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="">
              <em>-- 请选择性别 --</em>
            </MenuItem>
            <MenuItem value="男">男</MenuItem>
            <MenuItem value="女">女</MenuItem>
          </TextField>
          <TextField
            label="地址"
            fullWidth
            multiline
            rows={2}
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>先撤了</Button>
        <Button variant="contained" onClick={handleSubmit(onFormSubmit)}>
          搞定！
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
