import type { ReactElement } from "react";
import AddTodo from "../components/AddTodo/AddTodo.tsx";
import Tabs from "../components/Tabs/Tabs.tsx";
import TodoList from "../components/TodoList/TodoList.tsx";
import { getTodosApi } from "../api/api.ts";
import { useEffect, useState } from "react";
import type { Todo, Status, TodoInfo } from "../types/types.ts";

function TodoListPage(): ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [counters, setCounters] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [activeTab, setActiveTab] = useState<Status>("all");

  async function getTodosData(status: Status): Promise<void> {
    try {
      const response = await getTodosApi(status);
      setTodos(response.data);

      if (response.info) {
        setCounters({
          ...counters,
          all: response.info.all,
          inWork: response.info.inWork,
          completed: response.info.completed,
        });
      }
    } catch {
      alert(`Ошибка получения данных. Попробуйте обновить страницу`);
    }
  }

  async function updateTodos(): Promise<void> {
    try {
      await getTodosData(activeTab);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTodosData("all");
  }, []);

  return (
    <>
      <AddTodo updateTodos={updateTodos} />
      <Tabs
        counters={counters}
        getTodosData={getTodosData}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <TodoList todos={todos} updateTodos={updateTodos} />
    </>
  );
}

export default TodoListPage;
