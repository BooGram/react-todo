import { Flex, Typography } from "antd";

const { Title } = Typography;

function TodoList() {
  return (
    <Flex justify="center" align="center">
      <Title type="success">Listing Todos</Title>
    </Flex>
  );
}

export default TodoList;
