import { type ReactElement, type Dispatch, type SetStateAction } from "react";
import type { TodoInfo } from "../../types/types.ts";
import { StatusEnum } from "../../types/types.ts";
import { Tabs, type TabsProps } from "antd";

interface ListProps {
  counters: TodoInfo;
  setActiveTab: Dispatch<SetStateAction<StatusEnum>>;
  getTodosData: (status: StatusEnum) => Promise<void>;
}

function TodosTabs(props: ListProps): ReactElement {
  const { counters, getTodosData, setActiveTab } = props;

  const onChange = async (key: string): Promise<void> => {
    if (
      key === StatusEnum.all ||
      key === StatusEnum.inWork ||
      key === StatusEnum.completed
    ) {
      try {
        await getTodosData(key);
        setActiveTab(key);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const items: TabsProps["items"] = [
    {
      key: StatusEnum.all,
      label: `Все (${counters.all})`,
      // children: "Content of Tab Pane 1", // TODO убрать чилдрены тут везде
    },
    {
      key: StatusEnum.inWork,
      label: `в работе (${counters.inWork})`,
      // children: "Content of Tab Pane 2",
    },
    {
      key: StatusEnum.completed,
      label: `сделано (${counters.completed})`,
      // children: "Content of Tab Pane 3",
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default TodosTabs;
