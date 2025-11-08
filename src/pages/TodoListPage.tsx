import { type ReactElement, useCallback, useEffect } from "react";
import AddTodo from "../components/AddTodo/AddTodo.tsx";
import TodosTabs from "../components/TodosTabs/TodosTabs.tsx";
import TodoList from "../components/TodoList/TodoList.tsx";
import { getTodosApi } from "../api/api.ts";
import { useState } from "react";
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

  const getTodosData = useCallback(
    async (status: StatusEnum): Promise<void> => {
      try {
        const response = await getTodosApi(status);
        setTodos((prevState) =>
          prevState.length === response.data.length &&
          prevState.every(
            (value, index) =>
              JSON.stringify(value) === JSON.stringify(response.data[index]),
          )
            ? prevState
            : response.data,
        );

        setCounters((prevState) => {
          if (response.info) {
            return JSON.stringify(prevState) === JSON.stringify(response.info)
              ? prevState
              : response.info;
          }
          return prevState;
        });
      } catch {
        alert(`Ошибка получения данных. Попробуйте обновить страницу`);
      }
    },
    [],
  );

  const updateTodos = useCallback(async (): Promise<void> => {
    try {
      await getTodosData(activeTab);
    } catch (e) {
      console.log(e);
    }
  }, [getTodosData, activeTab]);

  useEffect(() => {
    getTodosData(StatusEnum.all);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await updateTodos();
      } catch (e) {
        console.log(e);
      }
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [activeTab]);

  return (
    <>
      <AddTodo updateTodos={updateTodos} />
      <TodosTabs
        counters={counters}
        getTodosData={getTodosData}
        setActiveTab={setActiveTab}
      />
      <TodoList todos={todos} updateTodos={updateTodos} />
    </>
  );
}

export default TodoListPage;
