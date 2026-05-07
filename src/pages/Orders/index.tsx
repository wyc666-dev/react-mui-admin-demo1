import { useTableData } from "@/hooks/useTableData";
import { fakerZH_CN as faker } from "@faker-js/faker";
import {
  Box,
  Button,
  Chip,
  MenuItem,
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
import { useState } from "react";
import OrderModal from "./components/OrderModal";
import type { Order } from "./type";

const statusOptions = ["待付款", "已付款", "已发货", "已完成"] as const;

const statusColorMap = {
  待付款: "warning",
  已付款: "info",
  已发货: "primary",
  已完成: "success",
} as const;

const generateOrders = (count: number): Order[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    orderId: faker.number.int({ min: 10000000, max: 99999999 }),
    customerName: faker.person.fullName(),
    product: faker.commerce.productName(),
    amount: faker.number.float({ min: 10, max: 9999, fractionDigits: 2 }),
    status: faker.helpers.arrayElement(statusOptions),
    createdAt: faker.date.recent({ days: 30 }).toISOString().slice(0, 10),
  }));
};

const initialRows = generateOrders(50);

const headerCellSx = {
  fontWeight: 700,
  fontSize: 16,
  whiteSpace: "nowrap",
};

const bodyCellSx = {
  fontSize: 15,
  verticalAlign: "middle",
};

const hoverRowSx = {
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(46, 125, 50, 0.06)",
  },
};

const Orders: React.FC = () => {
  const {
    paginatedRows,
    filteredRows,
    searchQuery,
    handleSearchChange,
    handleSearchClick,
    handleKeyDown,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    modalOpen,
    setModalOpen,
    editRow: editOrder,
  } = useTableData<Order>(initialRows, "orderId");

  const [statusFilter, setStatusFilter] = useState<"全部" | Order["status"]>(
    "全部",
  );

  const statusFilteredRows = filteredRows.filter((order) => {
    if (statusFilter === "全部") {
      return true;
    }

    return order.status === statusFilter;
  });

  const statusPaginatedRows = statusFilteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          mb: 2,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            订单管理系统
          </Typography>
          <Typography variant="body2" color="text.secondary">
            管理订单状态、客户、商品和金额
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            size="small"
            label="搜索订单ID"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <TextField
            select
            size="small"
            label="订单状态"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "全部" | Order["status"])
            }
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="全部">全部状态</MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" onClick={handleSearchClick}>
            搜索
          </Button>
          <Button variant="contained" color="success" onClick={handleAdd}>
            新增订单
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", minWidth: 980 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ ...headerCellSx, width: "14%" }}>
                订单号
              </TableCell>
              <TableCell sx={{ ...headerCellSx, width: "14%" }}>
                客户姓名
              </TableCell>
              <TableCell sx={{ ...headerCellSx, width: "24%" }}>
                商品名称
              </TableCell>
              <TableCell align="right" sx={{ ...headerCellSx, width: "12%" }}>
                金额
              </TableCell>
              <TableCell align="center" sx={{ ...headerCellSx, width: "12%" }}>
                状态
              </TableCell>
              <TableCell align="center" sx={{ ...headerCellSx, width: "12%" }}>
                创建时间
              </TableCell>
              <TableCell align="center" sx={{ ...headerCellSx, width: "12%" }}>
                操作
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {statusPaginatedRows.map((order) => (
              <TableRow key={order.id} hover sx={hoverRowSx}>
                <TableCell sx={bodyCellSx}>
                  <Typography sx={{ fontWeight: 600 }}>
                    #{order.orderId}
                  </Typography>
                </TableCell>
                <TableCell sx={bodyCellSx}>{order.customerName}</TableCell>
                <TableCell sx={bodyCellSx}>{order.product}</TableCell>
                <TableCell align="right" sx={bodyCellSx}>
                  {order.amount === "" ? "-" : `￥${order.amount.toFixed(2)}`}
                </TableCell>
                <TableCell align="center" sx={bodyCellSx}>
                  {order.status ? (
                    <Chip
                      label={order.status}
                      size="small"
                      color={statusColorMap[order.status]}
                      variant="outlined"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell align="center" sx={bodyCellSx}>
                  {order.createdAt || "-"}
                </TableCell>
                <TableCell align="center" sx={bodyCellSx}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: "center" }}
                  >
                    <Button size="small" onClick={() => handleEdit(order)}>
                      编辑
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(order.id)}
                    >
                      删除
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {paginatedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    没有找到匹配的订单
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          page={page}
          rowsPerPage={rowsPerPage}
          count={statusFilteredRows.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
          labelRowsPerPage="每页条数"
        />
      </TableContainer>

      {modalOpen && (
        <OrderModal
          key={editOrder?.orderId || "new"}
          onClose={() => setModalOpen(false)}
          initialData={editOrder}
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};
export default Orders;
