import type { Product } from "@/pages/Products/type";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ProductModalProps {
  onClose: () => void;
  onSubmit: (data: Product) => void;
  initialData?: Product | null;
}

const categoryOptions = ["手机", "电脑", "服饰", "食品", "家居"];

const emptyProduct: Product = {
  id: 0,
  name: "",
  price: "",
  stock: "",
  category: "",
  image: "",
};

const ProductModal = ({
  onClose,
  onSubmit,
  initialData,
}: ProductModalProps) => {
  const [formData, setFormData] = useState<Product>(
    initialData || emptyProduct,
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "编辑商品信息" : "新增商品"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="商品名称"
            fullWidth
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <TextField
            select
            label="商品分类"
            fullWidth
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <MenuItem value="">
              <em>-- 请选择分类 --</em>
            </MenuItem>
            {categoryOptions.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="价格"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
            />
            <TextField
              label="库存"
              type="number"
              fullWidth
              value={formData.stock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
            />
          </Stack>

          <Box
            sx={{
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">商品图片</Typography>
              {formData.image ? (
                <Box
                  component="img"
                  src={formData.image}
                  alt={formData.name || "商品图片"}
                  sx={{
                    display: "block",
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: 180,
                    borderRadius: 1,
                    bgcolor: "grey.100",
                    color: "text.secondary",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  暂无图片
                </Box>
              )}

              <Button variant="outlined" component="label">
                {formData.image ? "更换图片" : "上传图片"}
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>
            </Stack>
          </Box>
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

export default ProductModal;
