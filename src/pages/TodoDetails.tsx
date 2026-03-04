import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Select,
  Tag,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getTodo, updateTodo, type Todo } from "../api/todoApi";

function TodoDetails() {
  const todoId = useParams().id;
  const { t } = useTranslation();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (todoId) {
      fetchTodo();
    }
  }, [todoId]);

  const fetchTodo = async () => {
    if (!todoId) return;

    setLoading(true);
    try {
      const data = await getTodo(todoId);
      setTodo(data);
      setSelectedStatus(data.status);
    } catch (error) {
      console.error("Error fetching todo:", error);
      message.error("Failed to load todo details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!todoId || !selectedStatus) return;

    setUpdating(true);
    try {
      const updatedTodo = await updateTodo(todoId, {
        status: selectedStatus as
          | "open"
          | "in-progress"
          | "resolved"
          | "closed",
      });
      setTodo(updatedTodo);
      message.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
      message.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      open: "blue",
      "in-progress": "orange",
      resolved: "green",
      closed: "gray",
    };
    return colorMap[status];
  };

  const getStatusLabel = (status: string) => {
    const statusKeyMap: Record<string, string> = {
      open: "status.open",
      "in-progress": "status.inProgress",
      resolved: "status.resolved",
      closed: "status.closed",
    };
    return t(statusKeyMap[status]);
  };

  if (loading) {
    return (
      <Row justify="center" style={{ padding: "14px" }}>
        <Col xs={24} md={16}>
          <Card loading={loading} />
        </Col>
      </Row>
    );
  }

  if (!todo) {
    return (
      <Row justify="center" style={{ padding: "14px" }}>
        <Col xs={24} md={16}>
          <Card>{t("todoNotFound")}</Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ padding: "14px" }}>
      <Col xs={24} md={16}>
        <Card title={`${t("todoId")}: ${todo.id}`}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label={t("table.name")}>
              {todo.name}
            </Descriptions.Item>
            <Descriptions.Item label={t("table.email")}>
              {todo.email}
            </Descriptions.Item>
            <Descriptions.Item label={t("table.subject")}>
              {todo.subject}
            </Descriptions.Item>
            <Descriptions.Item label={t("form.message")}>
              {todo.message}
            </Descriptions.Item>
            <Descriptions.Item label={t("table.status")}>
              <Tag color={getStatusColor(todo.status)}>
                {getStatusLabel(todo.status)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t("table.createdAt")}>
              {new Date(todo.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label={t("updatedAt")}>
              {new Date(todo.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: "20px" }}>
            <h3>{t("updateStatus")}</h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                style={{ width: 200 }}
                options={[
                  { value: "open", label: t("status.open") },
                  { value: "in-progress", label: t("status.inProgress") },
                  { value: "resolved", label: t("status.resolved") },
                  { value: "closed", label: t("status.closed") },
                ]}
              />
              <Button
                type="primary"
                onClick={handleStatusUpdate}
                loading={updating}
                disabled={selectedStatus === todo.status}
              >
                {t("button.update")}
              </Button>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default TodoDetails;
