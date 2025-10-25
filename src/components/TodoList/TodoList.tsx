import "./TodoList.scss";
import TodoItem from "../TodoItem/TodoItem";
import type { ITodoItem } from "../../types/types.ts";
import { type ReactElement } from "react";

interface ITodoList {
  todos: ITodoItem[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title?: string, isDone?: boolean) => void;
  updateTodosWithFiltering: () => void;
}

function TodoList(props: ITodoList): ReactElement {
  const { todos, deleteTodo, editTodo, updateTodosWithFiltering } = props;

  return (
    <ul className="todoList">
      {todos.map((item: ITodoItem) => (
        <li key={item.id}>
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            updateTodosWithFiltering={updateTodosWithFiltering}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
