import "./TodoList.scss";
import TodoItem from "../TodoItem/TodoItem";
import type { ITodoItem } from "../../types/types.ts";
import { type ReactElement } from "react";

interface ITodoList {
  todos: ITodoItem[];
  getTodos: (status: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title?: string, isDone?: boolean) => void;
  activeTab: string;
  removeTodoFromList: (id: number) => void;
  validateTitle: (title: string) => { isValid: boolean; errorText: string };
  toggleShowValidateError: (
    isValid: boolean,
    errorElement: React.RefObject<HTMLSpanElement | null>,
  ) => void;
}

function TodoList(props: ITodoList): ReactElement {
  const {
    todos,
    deleteTodo,
    editTodo,
    activeTab,
    removeTodoFromList,
    validateTitle,
    getTodos,
    toggleShowValidateError,
  } = props;

  return (
    <ul className="todoList">
      {todos.map((item: ITodoItem) => (
        <li key={item.id}>
          <TodoItem
            todo={item}
            getTodos={getTodos}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            activeTab={activeTab}
            removeTodoFromList={removeTodoFromList}
            validateTitle={validateTitle}
            toggleShowValidateError={toggleShowValidateError}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
