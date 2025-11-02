import { addTodoApi } from "../../api/api.ts";
import type { FormProps } from "antd";
import { Button, Form, Input, Flex } from "antd";
import type { RuleObject } from "antd/lib/form";

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

  async function validator(_: RuleObject, title: string): Promise<void> {
    const trimmedTitle = title && title.trim();
    const maxTitleLength = 64;
    const minTitleLength = 2;
    return new Promise((resolve, reject) => {
      if (title === undefined || trimmedTitle === "") {
        reject("Поле не заполнено или содержит только пробелы");
      } else if (trimmedTitle.length < minTitleLength) {
        reject("Минимальная длина текста 2 символа");
      } else if (trimmedTitle.length > maxTitleLength) {
        reject("Максимальная длина текста 64 символа");
      } else {
        resolve();
      }
    });
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
