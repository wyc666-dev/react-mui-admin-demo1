import type { User } from "@/pages/Users/type";
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
import { useState } from "react";

/**
 * 【文件路径：src/pages/Users/components/UserModal.tsx】
 */

// 1. 定义数据的“形状”

// 2. 定义弹窗需要的“外接插口”（Props）
interface UserModalProps {
  onClose: () => void; // 关窗的任务
  onSubmit: (data: User) => void; // 提交的任务
  initialData?: User | null; // 如果是编辑，老数据长啥样？
}

const UserModal = ({ onClose, onSubmit, initialData }: UserModalProps) => {
  // 教学注释：造一串 18 到 60 岁的数字，省得我们手动写 40 多个 MenuItem
  const ageOptions = Array.from({ length: 43 }, (_, i) => i + 18);

  // 3. 【内部逻辑】直接拿 initialData 初始化！
  // 由于父组件用了 {modalOpen && <UserModal key={...} />}，
  // 每次打开弹窗组件都是重新挂载的，useState 会重新运行初始化。
  const [formData, setFormData] = useState<User>(
    initialData || {
      name: "",
      age: "",
      gender: "",
      address: "",
    },
  );

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{initialData ? "修改用户信息" : "招募新伙伴"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="姓名"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            select
            label="年龄"
            fullWidth
            value={formData.age}
            onChange={(e) =>
              setFormData({
                ...formData,
                age: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
          >
            {/* 教学注释：增加一个空的 MenuItem 作为提示 */}
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
            value={formData.gender}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value as User["gender"],
              })
            }
          >
            {/* 教学注释：增加一个空的 MenuItem 作为提示 */}
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
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>先撤了</Button>
        <Button variant="contained" onClick={() => onSubmit(formData)}>
          搞定！
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
