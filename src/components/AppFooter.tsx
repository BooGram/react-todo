import { Layout, Flex } from "antd";

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer>
      <Flex justify="center" align="center">
        <span>Support Platform ©2026 Created by Moenix</span>
      </Flex>
    </Footer>
  );
}