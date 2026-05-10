import {
  AddProduct,
  DeleteProduct,
  GetProduct,
  UpdateProduct,
} from "@/api/products";
import { useTableData } from "@/hooks/useTableData";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ProductModal from "./components/ProductModal";
import type { Product } from "./type";

const Products = () => {
  const {
    paginatedRows,
    filteredRows,
    searchQuery,
    handleSearchChange,
    handleSearchClick,
    handleKeyDown,
    page,
    rowsPerPage,
    handleAdd,
    handleEdit,
    setRows,
    handleChangePage,
    handleChangeRowsPerPage,
    modalOpen,
    setModalOpen,
    editRow: editProduct,
  } = useTableData<Product>([], "name");

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: GetProduct,
  });

  useEffect(() => {
    if (data?.list) setRows(data.list);
  }, [data, setRows]);

  const { mutate } = useMutation({
    mutationFn: DeleteProduct, // 填什么？
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const { mutate: addProduct } = useMutation({
    mutationFn: AddProduct, // 填什么？
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: UpdateProduct, // 填什么？
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            商品管理系统
          </Typography>
          <Typography variant="body2" color="text.secondary">
            管理商品图片、价格、库存和分类
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            size="small"
            label="搜索商品名称"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <Button variant="outlined" onClick={handleSearchClick}>
            搜索
          </Button>
          <Button variant="contained" color="success" onClick={handleAdd}>
            新增商品
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell>图片</TableCell>
              <TableCell>商品名称</TableCell>
              <TableCell>分类</TableCell>
              <TableCell align="right">价格</TableCell>
              <TableCell align="right">库存</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={product.category} size="small" />
                </TableCell>
                <TableCell align="right">
                  {product.price === "" ? "-" : `￥${product.price}`}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={product.stock === "" ? "-" : product.stock}
                    size="small"
                    color={Number(product.stock) > 0 ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button size="small" onClick={() => handleEdit(product)}>
                    编辑
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => mutate(product.id)}
                  >
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="每页条数"
        />
      </TableContainer>

      {modalOpen && (
        <ProductModal
          key={editProduct?.id || "new"}
          onClose={() => setModalOpen(false)}
          onSubmit={(data) => {
            if (editProduct) {
              updateProduct(data);
            } else {
              addProduct(data);
            }
          }}
          initialData={editProduct}
        />
      )}
    </Box>
  );
};

export default Products;
