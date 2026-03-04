import { Button, Card, Col, Form, Input, Row } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/es/form/Form";
import { createTodo, type CreateTodoDto } from "../api/todoApi";

function TodoMutate() {
  const todoId = useParams().id;
  const { t } = useTranslation();
  const [form] = useForm();

  const onFinish = (values: CreateTodoDto) => {
    createTodo(values)
      .then((newTodo) => {
        console.log("Todo created:", newTodo);
        // Optionally, navigate to the todo list or details page
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
        // Optionally, show an error message to the user
      });
    form.resetFields();
  };

  return (
    <Row justify="center" style={{ padding: "14px" }}>
      <Col xs={24} md={12}>
        <Card
          title={
            todoId
              ? `${t("editingTodo")}: ${todoId}`
              : t("creatingNewTodo")
          }
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name={"name"}
              label={t("form.name")}
              rules={[{ required: true, message: t("message.required") }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"email"}
              label={t("form.email")}
              rules={[
                { required: true, message: t("message.required") },
                { type: "email", message: t("message.email_error") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"subject"}
              label={t("form.subject")}
              rules={[{ required: true, message: t("message.required") }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"message"}
              label={t("form.message")}
              rules={[{ required: true, message: t("message.required") }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit"> {t("button.submit")}</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default TodoMutate;
