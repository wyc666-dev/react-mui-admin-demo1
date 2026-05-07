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
import { useEffect, useState } from "react";
import GetUser from "@/api/users";
import UserModal from "./components/UserModal";
import type { User } from "./type";

/**
 * 【文件路径：src/pages/Users/index.tsx】
 */

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
  const [searchQuery, setSearchQuery] = useState("");
  // 教学注释：这是“正式版”关键词，只有点按钮才会更新它
  const [appliedQuery, setAppliedQuery] = useState("");
  // 核心数据篮子
  const [rows, setRows] = useState<User[]>([]);

  // 教学注释：控制弹窗开关的“总闸”
  const [modalOpen, setModalOpen] = useState(false);
  // 教学注释：存下当前正在“修理”的是哪个用户，如果是 null，说明在招新
  const [editUser, setEditUser] = useState<User | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  // 分页状态

  useEffect(() => {
    GetUser().then((data) => {
      setRows(data.list);
    });
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 过滤网逻辑

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // 抓现场的证词！
    setSearchQuery(value); // 记草稿

    // 教学注释：基于“现场证词”判断，避开 React 状态更新的延迟坑
    if (value === "") {
      setAppliedQuery(""); // 撤销搜索令
      setPage(0); // 回第一页
    }
  };

  // 教学注释：【正式授权】点按钮才把草稿转正
  const handleSearchClick = () => {
    setAppliedQuery(searchQuery); // 这里的 searchQuery 已经是渲染更新后的，可以放心用
    setPage(0);
  };

  // 教学注释：【键盘监听】让输入框能听懂“回车键”
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick(); // 按回车等于点搜索按钮
    }
  };
  // 教学注释：处理“我要一页看更多/更少”的操作
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // 把输入的字符串转成数字
    setPage(0); // 每次改每页条数，都得回第一页，不然容易“迷失方向”
  };

  // 教学注释：点击“新增用户”按钮时的动作
  const handleAdd = () => {
    setEditUser(null); // 清空旧档案，保证是张白纸
    setModalOpen(true); // 开门！
  };

  // 教学注释：点击表格里“编辑”按钮时的动作
  const handleEdit = (user: User) => {
    setEditUser(user); // 拿上这个人的老档案
    setModalOpen(true); // 开门！
  };

  // 教学注释：【新增逻辑】处理删除
  const handleDelete = (id: number) => {
    // 教学注释：加个确认框，防止用户“点歪了”
    const confirmDelete =
      window.confirm("你确定要把这位小伙伴从名单里划掉吗？");
    if (confirmDelete) {
      // 核心逻辑：过滤掉 ID 匹配的那个人
      setRows(rows.filter((user) => user.id !== id));
    }
  };

  // 教学注释：当弹窗里点“搞定！”（提交）时的逻辑
  const handleSubmit = (data: User) => {
    if (editUser) {
      // 编辑模式：找到 ID 相同的那个人，用新数据替换他
      const newRows = rows.map((item) =>
        item.id === editUser.id ? { ...data, id: item.id } : item,
      );
      setRows(newRows);
    } else {
      // 新增模式：造个新 ID（用时间戳保证唯一），把新人塞进大篮子的最前面
      const newUser = { ...data, id: Date.now() };
      setRows([newUser, ...rows]);
    }
    setModalOpen(false); // 完事了，关门谢客
  };

  const filteredRows = rows.filter((user) =>
    user.name.toLowerCase().includes(appliedQuery.toLowerCase()),
  );
  // 核心逻辑：把过滤后的数据“切片”展示
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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
              <TableCell sx={{ ...headerCellSx, width: "16%" }}>
                姓名
              </TableCell>
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
                      onClick={() => handleDelete(user.id!)}
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
          onSubmit={handleSubmit}
          initialData={editUser}
        />
      )}
    </Box>
  );
};

export default Users;
