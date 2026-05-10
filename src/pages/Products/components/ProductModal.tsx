import type { Product } from "@/pages/Products/type";
import { productSchema, type ProductFormData } from "@/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";

interface ProductModalProps {
  onClose: () => void;
  onSubmit: (data: Product) => void;
  initialData?: Product | null;
}

const categoryOptions = ["手机", "电脑", "服饰", "食品", "家居"];

const ProductModal = ({
  onClose,
  onSubmit,
  initialData,
}: ProductModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      price: initialData?.price === "" ? undefined : initialData?.price,
      stock: initialData?.stock === "" ? undefined : initialData?.stock,
      image: initialData?.image || "",
    },
  });

  const productImage = watch("image");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setValue("image", String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const onFormSubmit = (data: ProductFormData) => {
    onSubmit({
      ...initialData,
      ...data,
      id: initialData?.id || 0,
      image: data.image || "",
    } as Product);
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
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            select
            label="商品分类"
            fullWidth
            defaultValue={initialData?.category || ""}
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
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
              {...register("price", { valueAsNumber: true })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              label="库存"
              type="number"
              fullWidth
              {...register("stock", { valueAsNumber: true })}
              error={!!errors.stock}
              helperText={errors.stock?.message}
            />
          </Stack>

          <Box
            sx={{
              border: "1px dashed",
              borderColor: errors.image ? "error.main" : "divider",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">商品图片</Typography>
              {productImage ? (
                <Box
                  component="img"
                  src={productImage}
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
                {productImage ? "更换图片" : "上传图片"}
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
        <Button variant="contained" onClick={handleSubmit(onFormSubmit)}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
