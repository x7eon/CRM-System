import "./Tabs.scss";
import { type ReactElement, type Dispatch, type SetStateAction } from "react";
import type { Status, TodoInfo } from "../../types/types.ts";

interface ListProps {
  counters: TodoInfo;
  getTodosData: (status: Status) => Promise<void>;
  activeTab: Status;
  setActiveTab: Dispatch<SetStateAction<Status>>;
}

function Tabs(props: ListProps): ReactElement {
  const { counters, getTodosData, activeTab, setActiveTab } = props;

  async function tabsHandler(status: Status): Promise<void> {
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
          onClick={() => tabsHandler("all")}
        >
          <span>Все </span>
          <span>({counters.all})</span>
        </li>
        <li
          className={
            activeTab === "inWork" ? "listsItem listItemActive" : "listsItem"
          }
          onClick={() => tabsHandler("inWork")}
        >
          <span>в работе</span>
          <span>({counters.inWork})</span>
        </li>
        <li
          className={
            activeTab === "completed" ? "listsItem listItemActive" : "listsItem"
          }
          onClick={() => tabsHandler("completed")}
        >
          <span>сделано</span>
          <span>({counters.completed})</span>
        </li>
      </ul>
    </>
  );
}

export default Tabs;
