import { Table, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTodos } from "../api/todoApi";
import type { Todo } from "../api/todoApi";
import type { ColumnsType } from "antd/es/table";

const { Link } = Typography;

function TodoList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await listTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Todo> = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      width: 200,
      render: (id: string) => (
        <Link onClick={() => navigate(`/${id}`)} style={{ cursor: "pointer" }}>
          {id}
        </Link>
      ),
    },
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("table.subject"),
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: t("table.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          open: "blue",
          "in-progress": "orange",
          resolved: "green",
          closed: "gray",
        };
        const statusKeyMap: Record<string, string> = {
          open: "status.open",
          "in-progress": "status.inProgress",
          resolved: "status.resolved",
          closed: "status.closed",
        };
        return <Tag color={colorMap[status]}>{t(statusKeyMap[status])}</Tag>;
      },
    },
    {
      title: t("table.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ margin: "14px" }}>
      <Table
        columns={columns}
        dataSource={todos}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default TodoList;
