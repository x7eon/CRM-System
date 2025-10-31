import "./TodosTabs.scss";
import { type ReactElement, type Dispatch, type SetStateAction } from "react";
import type { TodoInfo } from "../../types/types.ts";
import { StatusEnum } from "../../types/types.ts";

interface ListProps {
  counters: TodoInfo;
  getTodosData: (status: StatusEnum) => Promise<void>;
  activeTab: StatusEnum;
  setActiveTab: Dispatch<SetStateAction<StatusEnum>>;
}

function TodosTabs(props: ListProps): ReactElement {
  const { counters, getTodosData, activeTab, setActiveTab } = props;

  async function tabsHandler(status: StatusEnum): Promise<void> {
    try {
      await getTodosData(status);
      setActiveTab(status);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <ul className="lists">
        <li
          className={
            activeTab === "all" ? "listsItem listItemActive" : "listsItem"
          }
          onClick={() => tabsHandler(StatusEnum.all)}
        >
          <span>Все </span>
          <span>({counters.all})</span>
        </li>
        <li
          className={
            activeTab === "inWork" ? "listsItem listItemActive" : "listsItem"
          }
          onClick={() => tabsHandler(StatusEnum.inWork)}
        >
          <span>в работе</span>
          <span>({counters.inWork})</span>
        </li>
        <li
          className={
            activeTab === "completed" ? "listsItem listItemActive" : "listsItem"
          }
          onClick={() => tabsHandler(StatusEnum.completed)}
        >
          <span>сделано</span>
          <span>({counters.completed})</span>
        </li>
      </ul>
    </>
  );
}

export default TodosTabs;
