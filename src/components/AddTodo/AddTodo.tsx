import { addTodoApi } from "../../api/api.ts";
import type { FormProps } from "antd";
import { Button, Form, Input, Flex, notification } from "antd";

type FieldType = {
  title?: string;
};

interface AddTodoProps {
  updateTodos: () => Promise<void>;
}

const AddTodo = function (props: AddTodoProps) {
  const { updateTodos } = props;
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationError = () => {
    api.open({
      type: "error",
      message: "Произошла ошибка",
      placement: "top",
      description: "Не удалось добавить задачу. Попробуйте снова",
    });
  };

  const onSubmitForm: FormProps<FieldType>["onFinish"] = async (
    values,
  ): Promise<void> => {
    try {
      if (values.title) {
        await addTodo(values.title.trim());
        await updateTodos();
      }
    } catch {
      openNotificationError();
    }
    form.setFieldsValue({ title: "" });
  };

  async function addTodo(title: string): Promise<void> {
    await addTodoApi({ title });
  }

  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={onSubmitForm} name="smth">
        <Flex gap={30}>
          <Form.Item
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
              { max: 64, message: "Максимальная длина названия 64 символа" },
            ]}
          >
            <Input placeholder="Task To Be Done..." style={{ minWidth: 300 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default AddTodo;
