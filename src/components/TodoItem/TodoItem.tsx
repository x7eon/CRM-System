import { type ReactElement, type SyntheticEvent, useState } from "react";
import type { Todo } from "../../types/types.ts";
import { deleteTodoApi, editTodoApi } from "../../api/api.ts";
import { Card, Space, Input, Flex, Button, Form } from "antd";
import validator from "../../helpers/validator.ts";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  SaveOutlined,
} from "@ant-design/icons";

export interface ITodoItemProps {
  todo: Todo;
  updateTodos: () => Promise<void>;
}

type FieldType = {
  status?: boolean;
  title?: string;
};

function TodoItem(props: ITodoItemProps): ReactElement {
  const { todo, updateTodos } = props;

  const id = todo.id;
  const todoTitle = todo.title;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(todo.title);
  const [checkBoxIsDone, setCheckBoxIsDone] = useState<boolean>(todo.isDone);

  function handleInputTextChange(e: SyntheticEvent<HTMLInputElement>): void {
    setInputText(e.currentTarget.value);
  }

  function editButtonHandler(): void {
    setIsEditMode(true);
  }

  async function saveButtonHandler(): Promise<void> {
    try {
      if (isEditMode) {
        await editTodo(id, inputText);
        await updateTodos();
        setIsEditMode(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteButtonHandler(): Promise<void> {
    try {
      await deleteTodo(id);
      await updateTodos();
    } catch (e) {
      console.log(e);
    }
  }

  function cancelButtonHandler(): void {
    if (isEditMode) {
      setIsEditMode(false);
      setInputText(todoTitle);
    }
  }

  async function inputCheckboxHandler(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    try {
      setCheckBoxIsDone(e.target.checked);
      await editTodo(id, inputText, e.target.checked);
      await updateTodos();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTodo(id: number): Promise<void> {
    try {
      await deleteTodoApi(id);
    } catch {
      alert("Ошибка удаления задачи. Попробуйте снова");
    }
  }

  async function editTodo(
    id: number,
    title?: string,
    isDone?: boolean,
  ): Promise<void> {
    try {
      await editTodoApi(id, { title, isDone });
    } catch {
      alert("Ошибка изменения задачи. Попробуйте снова");
    }
  }

  return (
    <Space direction="vertical">
      <Card style={{ width: 400 }}>
        <Form<FieldType>
          initialValues={{ status: todo.isDone, title: todoTitle }}
          onFinish={saveButtonHandler}
        >
          <Flex gap={20}>
            <Form.Item name="status">
              <Input
                type="checkbox"
                checked={checkBoxIsDone}
                onChange={inputCheckboxHandler}
              />
            </Form.Item>
            <Form.Item
              name="title"
              rules={[
                {
                  validator,
                },
              ]}
            >
              <Input
                type="text"
                value={inputText}
                disabled={!isEditMode}
                onChange={handleInputTextChange}
                style={{ width: 200 }}
              />
            </Form.Item>
            {!isEditMode ? (
              <>
                <Button onClick={editButtonHandler} icon={<EditOutlined />} />
                <Button
                  onClick={deleteButtonHandler}
                  icon={<DeleteOutlined />}
                />
              </>
            ) : (
              <>
                <Form.Item>
                  <Button htmlType="submit" icon={<SaveOutlined />} />
                </Form.Item>
                <Button onClick={cancelButtonHandler} icon={<StopOutlined />} />
              </>
            )}
          </Flex>
        </Form>
      </Card>
    </Space>
  );
}

export default TodoItem;
