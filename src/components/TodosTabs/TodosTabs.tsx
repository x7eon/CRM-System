import "./TodosTabs.scss";
import { type ReactElement } from "react";
import type { TodoInfo } from "../../types/types.ts";
import { StatusEnum } from "../../types/types.ts";
import { Tabs, type TabsProps } from "antd";

interface ListProps {
  counters: TodoInfo;
  getTodosData: (status: StatusEnum) => Promise<void>;
}

function TodosTabs(props: ListProps): ReactElement {
  const { counters, getTodosData } = props;

  const onChange = async (key: string): Promise<void> => {
    if (
      key === StatusEnum.all ||
      key === StatusEnum.inWork ||
      key === StatusEnum.completed
    ) {
      try {
        await getTodosData(key);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const items: TabsProps["items"] = [
    {
      key: StatusEnum.all,
      label: `Все (${counters.all})`,
      children: "Content of Tab Pane 1",
    },
    {
      key: StatusEnum.inWork,
      label: `в работе (${counters.inWork})`,
      children: "Content of Tab Pane 2",
    },
    {
      key: StatusEnum.completed,
      label: `сделано (${counters.completed})`,
      children: "Content of Tab Pane 3",
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default TodosTabs;
