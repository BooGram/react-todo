import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function TodoMutate() {
  const todoId = useParams().id;
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100vh",
      }}
    >
      <Title type="success">
        {todoId ? `Editing Todo ID: ${todoId}` : "Creating New Todo"}
      </Title>
    </Flex>
  );
}

export default TodoMutate;
