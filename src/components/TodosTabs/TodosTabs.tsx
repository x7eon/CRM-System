import { type ReactElement, type Dispatch, type SetStateAction } from "react";
import type { TodoInfo } from "../../types/types.ts";
import { StatusEnum } from "../../types/types.ts";
import { Tabs, notification, type TabsProps } from "antd";

interface ListProps {
  counters: TodoInfo;
  setActiveTab: Dispatch<SetStateAction<StatusEnum>>;
  getTodosData: (status: StatusEnum) => Promise<void>;
}

function TodosTabs(props: ListProps): ReactElement {
  const { counters, getTodosData, setActiveTab } = props;

  const [api, contextHolder] = notification.useNotification();

  const openNotificationError = () => {
    api.open({
      type: "error",
      message: "Произошла ошибка",
      placement: "top",
      description: "Не удалось получить список задач. Попробуйте снова",
    });
  };

  const onChangeTodosStatus = async (key: string): Promise<void> => {
    const isStatusEnum = (value: string): value is StatusEnum => {
      return Object.values(StatusEnum).includes(value as StatusEnum);
    };

    if (isStatusEnum(key)) {
      try {
        await getTodosData(key);
        setActiveTab(key);
      } catch {
        openNotificationError();
      }
    }
  };

  const items: TabsProps["items"] = [
    {
      key: StatusEnum.all,
      label: `Все (${counters.all})`,
    },
    {
      key: StatusEnum.inWork,
      label: `в работе (${counters.inWork})`,
    },
    {
      key: StatusEnum.completed,
      label: `сделано (${counters.completed})`,
    },
  ];

  return (
    <>
      {contextHolder}
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTodosStatus} />
    </>
  );
}

export default TodosTabs;
