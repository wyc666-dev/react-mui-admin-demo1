import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface ProfileForm {
  name: string;
  age: number | "";
  email: string;
}

const Profile = () => {
  const [form, setForm] = useState<ProfileForm>({
    name: "我有车",
    age: 26,
    email: "980475929@qt.com",
  });

  // 通用更新函数
  const update =
    (key: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setForm((prev) => ({
        ...prev,
        [key]: key === "age" ? (value === "" ? "" : Number(value)) : value,
      }));
    };

  const handleSubmit = () => {
    // 提交逻辑
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">个人资料</Typography>

      <TextField label="Name" value={form.name} onChange={update("name")} />
      <TextField label="Email" value={form.email} onChange={update("email")} />
      <TextField
        label="Age"
        type="number"
        value={form.age}
        onChange={update("age")}
      />

      <Button variant="contained" onClick={handleSubmit}>
        保存资料
      </Button>
    </Stack>
  );
};

export default Profile;
