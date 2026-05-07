import { useState } from "react";

export const useTableData = <T extends { id: number }>(
  initialData: T[],
  searchKey: keyof T,
) => {
  const [rows, setRows] = useState<T[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<T | null>(null);

  const filteredRows = rows.filter((user: T) =>
    String(user[searchKey]).toLowerCase().includes(appliedQuery.toLowerCase()),
  );
  // 核心逻辑：把过滤后的数据“切片”展示
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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
    setEditRow(null); // 清空旧档案，保证是张白纸
    setModalOpen(true); // 开门！
  };

  // 教学注释：点击表格里“编辑”按钮时的动作
  const handleEdit = (user: T) => {
    setEditRow(user); // 拿上这个人的老档案
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
  const handleSubmit = (data: T) => {
    if (editRow) {
      // 编辑模式：找到 ID 相同的那个人，用新数据替换他
      const newRows = rows.map((item) =>
        item.id === editRow.id ? { ...data, id: item.id } : item,
      );
      setRows(newRows);
    } else {
      // 新增模式：造个新 ID（用时间戳保证唯一），把新人塞进大篮子的最前面
      const newUser = { ...data, id: Date.now() };
      setRows([newUser, ...rows]);
    }
    setModalOpen(false); // 完事了，关门谢客
  };

  return {
    rows,
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
    editRow,
  };
};
