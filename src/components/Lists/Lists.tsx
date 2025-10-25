import "./Lists.scss";
import {
  type ReactElement,
  useRef,
  type SyntheticEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ITodoItem } from "../../types/types.ts";
import type { ICounters } from "../../pages/TodoListPage.tsx";
import TodoList from "../TodoList/TodoList.tsx";

interface ListProps {
  todos: ITodoItem[];
  counters: ICounters;

  getTodosData: (status: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title?: string, isDone?: boolean) => void;
  updateTodosWithFiltering: () => void;

  setActiveTab: Dispatch<SetStateAction<string>>;
}

function Lists(props: ListProps): ReactElement {
  const {
    todos,
    counters,
    getTodosData,
    deleteTodo,
    editTodo,
    updateTodosWithFiltering,

    setActiveTab,
  } = props;

  const tabAllRef = useRef<HTMLLIElement>(null);
  const tabInWorkRef = useRef<HTMLLIElement>(null);
  const tabCompletedRef = useRef<HTMLLIElement>(null);

  const tabs = [tabAllRef, tabInWorkRef, tabCompletedRef];

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
    getTodosData("all");
    setActiveTab("all");
  }

  function groupInWorkHandler(e: SyntheticEvent<HTMLLIElement>) {
    toggleActive(e);
    getTodosData("inWork");
    setActiveTab("inWork");
  }

  function groupCompletedHandler(e: SyntheticEvent<HTMLLIElement>) {
    toggleActive(e);
    getTodosData("completed");
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
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        updateTodosWithFiltering={updateTodosWithFiltering}
      ></TodoList>
    </>
  );
}

export default Lists;
