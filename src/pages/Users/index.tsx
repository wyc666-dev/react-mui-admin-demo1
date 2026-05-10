import { AddUser, DeleteUser, GetUser, UpdateUser } from "@/api/users";
import { useTableData } from "@/hooks/useTableData";
import {
  Box,
  Button,
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
import UserModal from "./components/UserModal";
import type { User } from "./type";

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

const Users = () => {
  const {
    paginatedRows,
    filteredRows,
    searchQuery,
    handleSearchChange,
    handleSearchClick,
    handleEdit,
    handleKeyDown,
    page,
    handleAdd,
    rowsPerPage,
    setRows,
    handleChangePage,
    handleChangeRowsPerPage,
    modalOpen,
    setModalOpen,
    editRow: editUser,
  } = useTableData<User>([], "name");

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: GetUser,
  });
  const { mutate } = useMutation({
    mutationFn: DeleteUser, // 填什么？
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  useEffect(() => {
    if (data?.list) setRows(data.list);
  }, [data, setRows]);

  const { mutate: addUser } = useMutation({
    mutationFn: AddUser, // 填什么？
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: UpdateUser, // 填什么？
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          用户管理系统
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            label="搜索姓名"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <Button variant="outlined" onClick={handleSearchClick}>
            搜索
          </Button>
          <Button variant="contained" color="success" onClick={handleAdd}>
            新增用户
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center" sx={{ ...headerCellSx, width: "8%" }}>
                ID
              </TableCell>
              <TableCell sx={{ ...headerCellSx, width: "16%" }}>姓名</TableCell>
              <TableCell align="center" sx={{ ...headerCellSx, width: "10%" }}>
                年龄
              </TableCell>
              <TableCell align="center" sx={{ ...headerCellSx, width: "10%" }}>
                性别
              </TableCell>
              <TableCell sx={{ ...headerCellSx, width: "40%" }}>
                家庭住址
              </TableCell>
              <TableCell align="center" sx={{ ...headerCellSx, width: "16%" }}>
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((user) => (
              <TableRow key={user.id} hover sx={hoverRowSx}>
                <TableCell align="center" sx={bodyCellSx}>
                  {user.id}
                </TableCell>
                <TableCell sx={bodyCellSx}>{user.name}</TableCell>
                <TableCell align="center" sx={bodyCellSx}>
                  {user.age}
                </TableCell>
                <TableCell align="center" sx={bodyCellSx}>
                  {user.gender}
                </TableCell>
                <TableCell sx={bodyCellSx}>{user.address}</TableCell>
                <TableCell align="center" sx={bodyCellSx}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: "center" }}
                  >
                    <Button size="small" onClick={() => handleEdit(user)}>
                      编辑
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => mutate(user.id)}
                    >
                      删除
                    </Button>
                  </Stack>
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
        <UserModal
          key={editUser?.id || "new"}
          onClose={() => setModalOpen(false)}
          onSubmit={(data) => {
            if (editUser) {
              updateUser(data);
            } else {
              addUser(data);
            }
          }}
          initialData={editUser}
        />
      )}
    </Box>
  );
};

export default Users;
