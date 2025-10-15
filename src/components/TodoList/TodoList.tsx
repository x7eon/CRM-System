import "./TodoList.scss";
import TodoItem from "../TodoItem/TodoItem";
import type { ITodoItem } from "../TodoItem/TodoItem";
import { type ReactElement } from "react";

interface ITodoList {
  todos: ITodoItem[];
  getTodos: (status: string) => void;
  deleteItem: (id: number) => void;
  editItem: (id: number, title?: string, isDone?: boolean) => void;
  activeTab: string;
  removeItemFromList: (id: number) => void;
  validateTitle: (
    title: string,
    isValid: React.RefObject<boolean>,
    errorTextRef: React.RefObject<HTMLSpanElement | null>,
    setValidateErrorText: (value: string) => void,
  ) => void;
}

function TodoList(props: ITodoList): ReactElement {
  const {
    todos,
    deleteItem,
    editItem,
    activeTab,
    removeItemFromList,
    validateTitle,
    getTodos,
  } = props;

  return (
    <ul className="todoList">
      {todos.map((item: ITodoItem) => (
        <li key={item.id}>
          <TodoItem
            todo={item}
            deleteItem={deleteItem}
            editItem={editItem}
            activeTab={activeTab}
            removeItemFromList={removeItemFromList}
            validateTitle={validateTitle}
            getTodos={getTodos}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
