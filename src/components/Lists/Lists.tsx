import "./Lists.scss";
import {
  type ReactElement,
  useRef,
  type SyntheticEvent,
  useState,
} from "react";
import type { ITodoItem } from "../TodoItem/TodoItem.tsx";
import type { ICounters } from "../../pages/TodoListPage.tsx";
import TodoList from "../TodoList/TodoList.tsx";

interface ListProps {
  todos: ITodoItem[];
  getTodos: (status: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title?: string, isDone?: boolean) => void;
  counters: ICounters;
  getCounters: () => void;
  removeTodoFromList: (id: number) => void;
  validateTitle: (title: string) => { isValid: boolean; errorText: string };
  toggleShowValidateError: (
    isValid: boolean,
    errorElement: React.RefObject<HTMLSpanElement | null>,
  ) => void;
}

function Lists(props: ListProps): ReactElement {
  const {
    todos,
    getTodos,
    getCounters,
    deleteTodo,
    editTodo,
    counters,
    removeTodoFromList,
    validateTitle,
    toggleShowValidateError,
  } = props;

  const tabAllRef = useRef<HTMLLIElement>(null);
  const tabInWorkRef = useRef<HTMLLIElement>(null);
  const tabCompletedRef = useRef<HTMLLIElement>(null);

  const tabs = [tabAllRef, tabInWorkRef, tabCompletedRef];
  const [activeTab, setActiveTab] = useState<string>("all");

  function toggleActive(e: SyntheticEvent) {
    e.currentTarget.classList.add("listItemActive");
    tabs.forEach((item) => {
      if (item.current !== e.currentTarget) {
        item.current!.classList.remove("listItemActive");
      }
    });
  }

  function groupAllOnClickHandler(e: SyntheticEvent<HTMLLIElement>) {
    toggleActive(e);
    getTodos("all");
    getCounters();
    setActiveTab("all");
  }

  function groupInWorkHandler(e: SyntheticEvent<HTMLLIElement>) {
    toggleActive(e);
    getTodos("inWork");
    getCounters();
    setActiveTab("inWork");
  }

  function groupCompletedHandler(e: SyntheticEvent<HTMLLIElement>) {
    toggleActive(e);
    getTodos("completed");
    getCounters();
    setActiveTab("completed");
  }

  return (
    <>
      <ul className="lists">
        <li
          className="listsItem listItemActive"
          onClick={groupAllOnClickHandler}
          ref={tabAllRef}
        >
          <span>Все </span>
          <span>({counters.todosAllCount})</span>
        </li>
        <li
          className="listsItem"
          onClick={groupInWorkHandler}
          ref={tabInWorkRef}
        >
          <span>в работе</span>
          <span>({counters.todosInWorkCount})</span>
        </li>
        <li
          className="listsItem"
          onClick={groupCompletedHandler}
          ref={tabCompletedRef}
        >
          <span>сделано</span>
          <span>({counters.todosCompletedCount})</span>
        </li>
      </ul>
      <TodoList
        todos={todos}
        getTodos={getTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        removeTodoFromList={removeTodoFromList}
        activeTab={activeTab}
        validateTitle={validateTitle}
        toggleShowValidateError={toggleShowValidateError}
      ></TodoList>
    </>
  );
}

export default Lists;
