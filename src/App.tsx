import { type ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import TodoListPage from "./pages/TodoListPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NavMenu from "./components/NavMenu/NavMenu.tsx";
import { Col, Flex, Row } from "antd";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Row>
        <Col span={2}>
          <NavMenu />
        </Col>
        <Col span={20}>
          <Flex vertical style={{ paddingBlockStart: 200 }} align="center">
            <Routes>
              <Route path="/" element={<TodoListPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Flex>
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
