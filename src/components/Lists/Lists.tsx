import "./Lists.scss";
import {
  type ReactElement,
  useRef,
  type SyntheticEvent,
  useState,
} from "react";
import type { ITodoItem } from "../TodoItem/TodoItem.tsx";
import TodoList from "../TodoList/TodoList.tsx";
import type { ICounters } from "../../App.tsx";

interface ListProps {
  todos: ITodoItem[];
  getTodos: (status: string) => void;
  deleteItem: (id: number) => void;
  editItem: (id: number, title?: string, isDone?: boolean) => void;
  counters: ICounters;
  getCounters: () => void;
  removeItemFromList: (id: number) => void;
  validateTitle: (
    title: string,
    isValid: React.RefObject<boolean>,
    errorTextRef: React.RefObject<HTMLSpanElement | null>,
    setValidateErrorText: (value: string) => void,
  ) => void;
}

function Lists(props: ListProps): ReactElement {
  const {
    todos,
    getTodos,
    getCounters,
    deleteItem,
    editItem,
    counters,
    removeItemFromList,
    validateTitle,
  } = props;

  const tabAll = useRef<HTMLLIElement>(null);
  const tabInWork = useRef<HTMLLIElement>(null);
  const tabCompleted = useRef<HTMLLIElement>(null);

  const tabs = [tabAll, tabInWork, tabCompleted];
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
          ref={tabAll}
        >
          <span>Все </span>
          <span>({counters.todosAllCount})</span>
        </li>
        <li className="listsItem" onClick={groupInWorkHandler} ref={tabInWork}>
          <span>в работе</span>
          <span>({counters.todosInWorkCount})</span>
        </li>
        <li
          className="listsItem"
          onClick={groupCompletedHandler}
          ref={tabCompleted}
        >
          <span>сделано</span>
          <span>({counters.todosCompletedCount})</span>
        </li>
      </ul>
      <TodoList
        todos={todos}
        deleteItem={deleteItem}
        editItem={editItem}
        activeTab={activeTab}
        removeItemFromList={removeItemFromList}
        validateTitle={validateTitle}
        getTodos={getTodos}
      ></TodoList>
    </>
  );
}

export default Lists;
