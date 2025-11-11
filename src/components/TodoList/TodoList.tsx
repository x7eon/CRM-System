import TodoItem from "../TodoItem/TodoItem";
import type { Todo } from "../../types/types.ts";
import { type ReactElement } from "react";
import { List } from "antd";

interface ITodoList {
  todos: Todo[];
  updateTodos: () => Promise<void>;
}

const TodoList = function (props: ITodoList): ReactElement {
  const { todos, updateTodos } = props;

  return (
    <>
      <List
        split={false}
        dataSource={todos}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <TodoItem todo={item} updateTodos={updateTodos} />
          </List.Item>
        )}
      />
    </>
  );
};

export default TodoList;
