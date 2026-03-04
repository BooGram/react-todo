import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

function TodoList() {
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center">
      <Title type="success">{t("listingTodos")}</Title>
    </Flex>
  );
}

export default TodoList;
