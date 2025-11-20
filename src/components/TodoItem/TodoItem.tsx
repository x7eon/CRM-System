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
  notification,
  type FormProps,
  type CheckboxChangeEvent,
} from "antd";
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
  todoIsDone?: boolean;
  title?: string;
};

const TodoItem = function (props: ITodoItemProps): ReactElement {
  const {
    todo: { id, title, isDone },
    updateTodos,
  } = props;

  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const errorsText: Record<string, string> = {
    editTitleError: "Не удалось изменить текст задачи. Попробуйте снова",
    deleteTodoError: "Не удалось удалить задачу. Попробуйте снова",
    changeTodoIsDone: "Не удалось изменить статус задачи. Попробуйте снова",
  };

  const openNotificationError = (descriptionText: string) => {
    api.open({
      type: "error",
      message: "Произошла ошибка",
      placement: "top",
      description: descriptionText,
    });
  };

  function onEditMode(): void {
    setIsEditMode(true);
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values,
  ): Promise<void> => {
    try {
      if (isEditMode) {
        await editTodo(id, values.title);
        await updateTodos();
        setIsEditMode(false);
      }
    } catch {
      openNotificationError(errorsText.editTitleError);
    }
  };

  async function onDeleteTodo(): Promise<void> {
    try {
      await deleteTodo(id);
      await updateTodos();
    } catch {
      openNotificationError(errorsText.deleteTodoError);
    }
  }

  function onCancelEditMode(): void {
    if (isEditMode) {
      setIsEditMode(false);
      form.setFieldsValue({ title: title });
    }
  }

  async function onChangeIsDoneTodo(e: CheckboxChangeEvent): Promise<void> {
    try {
      await editTodo(id, undefined, e.target.checked);
      await updateTodos();
    } catch {
      openNotificationError(errorsText.changeTodoIsDone);
    }
  }

  async function deleteTodo(id: number): Promise<void> {
    await deleteTodoApi(id);
  }

  async function editTodo(
    id: number,
    title?: string,
    isDone?: boolean,
  ): Promise<void> {
    await editTodoApi(id, { title, isDone });
  }

  function onSubmitForm() {
    form.submit();
  }

  return (
    <>
      {contextHolder}
      <Form.Provider
        onFormFinish={(name, { values }) => {
          if (name === `titleForm${id}`) {
            onFinish(values);
          }
        }}
      >
        <Space direction="vertical">
          <Card style={{ width: 400 }}>
            <Form
              form={form}
              name={`titleForm${id}`}
              initialValues={{ todoIsDone: isDone, title: title }}
            >
              <Flex gap={20}>
                <Form.Item<FieldType> name="todoIsDone" valuePropName="checked">
                  <Checkbox onChange={onChangeIsDoneTodo} />
                </Form.Item>
                <Form.Item<FieldType>
                  name="title"
                  rules={[
                    {
                      pattern: /^\s*[^\s]/,
                      message: "Название не должно состоять только из пробелов",
                    },
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                    { min: 2, message: "Минимальная длина названия 2 символа" },
                    {
                      max: 64,
                      message: "Максимальная длина названия 64 символа",
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
                      onClick={onEditMode}
                      icon={<EditOutlined />}
                    />
                    <Button
                      htmlType="button"
                      onClick={onDeleteTodo}
                      icon={<DeleteOutlined />}
                    />
                  </>
                ) : (
                  <>
                    <Form.Item>
                      <Button
                        htmlType="button"
                        onClick={onSubmitForm}
                        icon={<SaveOutlined />}
                      />
                    </Form.Item>
                    <Button
                      htmlType="button"
                      onClick={onCancelEditMode}
                      icon={<StopOutlined />}
                    />
                  </>
                )}
              </Flex>
            </Form>
          </Card>
        </Space>
      </Form.Provider>
    </>
  );
};

export default TodoItem;
