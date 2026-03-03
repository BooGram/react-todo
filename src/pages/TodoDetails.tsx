import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function TodoDetails(){
    const todoId = useParams().id;

    return (
        <Flex justify="center" align="center">
            <Title type="warning">Todo ID: {todoId}</Title>
        </Flex>
    );
}

export default TodoDetails;