import "./TodoList.scss";
import TodoItem from "../TodoItem/TodoItem";
import type { Todo } from "../../types/types.ts";
import { type ReactElement } from "react";

interface ITodoList {
  todos: Todo[];
  updateTodos: () => Promise<void>;
}

function TodoList(props: ITodoList): ReactElement {
  const { todos, updateTodos } = props;

  return (
    <ul className="todoList">
      {todos.map((item: Todo) => (
        <li key={item.id}>
          <TodoItem todo={item} updateTodos={updateTodos} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
