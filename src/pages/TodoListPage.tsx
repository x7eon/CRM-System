import type { ReactElement } from "react";
import AddTodo from "../components/AddTodo/AddTodo.tsx";
import TodosTabs from "../components/TodosTabs/TodosTabs.tsx";
import TodoList from "../components/TodoList/TodoList.tsx";
import { getTodosApi } from "../api/api.ts";
import { useEffect, useState } from "react";
import type { Todo, TodoInfo } from "../types/types.ts";
import { StatusEnum } from "../types/types.ts";

function TodoListPage(): ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [counters, setCounters] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [activeTab, setActiveTab] = useState<StatusEnum>(StatusEnum.all);

  async function getTodosData(status: StatusEnum): Promise<void> {
    try {
      const response = await getTodosApi(status);
      setTodos(response.data);

      if (response.info) {
        setCounters(response.info);
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
    getTodosData(StatusEnum.all);
  }, []);

  return (
    <>
      <AddTodo updateTodos={updateTodos} />
      <TodosTabs counters={counters} getTodosData={getTodosData} />
      <TodoList todos={todos} updateTodos={updateTodos} />
    </>
  );
}

export default TodoListPage;
