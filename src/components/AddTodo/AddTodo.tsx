import { addTodoApi } from "../../api/api.ts";
import type { FormProps } from "antd";
import { Button, Form, Input, Flex } from "antd";

import validator from "../../helpers/validator.ts";

type FieldType = {
  title?: string;
};

interface AddTodoProps {
  updateTodos: () => Promise<void>;
}

function AddTodo(props: AddTodoProps) {
  const { updateTodos } = props;
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      if (values.title) {
        await addTodo(values.title);
        await updateTodos();
      }
    } catch (e) {
      console.log(e);
    }
    form.setFieldsValue({ title: "" });
  };

  async function addTodo(title: string): Promise<void> {
    try {
      await addTodoApi({ title });
    } catch {
      alert("Ошибка добавления задачи. Попробуйте снова");
    }
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Flex gap={30}>
        <Form.Item
          name="title"
          rules={[
            {
              validator,
            },
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
  );
}

export default AddTodo;
