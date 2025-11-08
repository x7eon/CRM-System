import { type ReactElement, useState } from "react";
import type { Todo } from "../../types/types.ts";
import { deleteTodoApi, editTodoApi } from "../../api/api.ts";
import {
  Card,
  Space,
  Input,
  Flex,
  Button,
  Form,
  Checkbox,
  type FormProps,
} from "antd";
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

const TodoItem = function (props: ITodoItemProps): ReactElement {
  const { todo, updateTodos } = props;

  console.log("TodoItem rendered", new Date().toLocaleTimeString());

  const id = todo.id;
  const todoTitle = todo.title;
  const status = todo.isDone;

  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  function editButtonHandler(): void {
    setIsEditMode(true);
  }

  const onFinish: FormProps<FieldType>["onFinish"] =
    async (): Promise<void> => {
      const currentInputTitle = form.getFieldValue("title");
      try {
        if (isEditMode) {
          await editTodo(id, currentInputTitle);
          await updateTodos();
          setIsEditMode(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

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
      form.setFieldsValue({ title: todoTitle });
    }
  }

  async function inputCheckboxHandler(): Promise<void> {
    const currentInputTitle = form.getFieldValue("title");
    const currentCheckedValue = form.getFieldValue("status");
    try {
      await editTodo(id, currentInputTitle, currentCheckedValue);
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
        <Form
          form={form}
          initialValues={{ status: status, title: todoTitle }}
          onFinish={onFinish}
        >
          <Flex gap={20}>
            <Form.Item<FieldType> name="status" valuePropName="checked">
              <Checkbox onChange={inputCheckboxHandler} />
            </Form.Item>
            <Form.Item<FieldType>
              name="title"
              rules={[
                {
                  validator,
                },
              ]}
            >
              <Input
                type="text"
                disabled={!isEditMode}
                style={{ width: 200 }}
              />
            </Form.Item>
            {!isEditMode ? (
              <>
                <Button
                  htmlType="button"
                  onClick={editButtonHandler}
                  icon={<EditOutlined />}
                />
                <Button
                  htmlType="button"
                  onClick={deleteButtonHandler}
                  icon={<DeleteOutlined />}
                />
              </>
            ) : (
              <>
                <Form.Item>
                  <Button htmlType="submit" icon={<SaveOutlined />} />
                </Form.Item>
                <Button
                  htmlType="button"
                  onClick={cancelButtonHandler}
                  icon={<StopOutlined />}
                />
              </>
            )}
          </Flex>
        </Form>
      </Card>
    </Space>
  );
};

export default TodoItem;
