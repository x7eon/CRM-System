import type { ReactElement } from "react";
import AddTodo from "../components/AddTodo/AddTodo.tsx";
import Lists from "../components/Lists/Lists.tsx";
import {
  addTodoApi,
  deleteTodoApi,
  getTodosApi,
  editTodoApi,
} from "../api/api.ts";
import { useEffect, useState } from "react";
import type { ITodoItem } from "../types/types.ts";

export interface ICounters {
  todosAllCount: number;
  todosInWorkCount: number;
  todosCompletedCount: number;
}

function TodoListPage(): ReactElement {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [counters, setCounters] = useState<ICounters>({
    todosAllCount: 0,
    todosInWorkCount: 0,
    todosCompletedCount: 0,
  });

  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    getTodosData("all");
  }, []);

  async function getTodosData(status: string) {
    try {
      const response = await getTodosApi(status);
      setTodos(response.data);

      setCounters({
        ...counters,
        todosAllCount: response.info.all,
        todosInWorkCount: response.info.inWork,
        todosCompletedCount: response.info.completed,
      });

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function addTodo(title: string) {
    try {
      await addTodoApi({ title });
    } catch (e) {
      console.log(e);
    }
  }

  async function updateTodosWithFiltering() {
    const updatedTodos = await getTodosData("all");
    filterTodos(updatedTodos, activeTab);
  }

  async function deleteTodo(id: number) {
    try {
      await deleteTodoApi(id);
    } catch (e) {
      console.log(e);
    }
  }

  async function editTodo(id: number, title?: string, isDone?: boolean) {
    try {
      await editTodoApi(id, { title, isDone });
    } catch (e) {
      console.log(e);
    }
  }

  function filterTodos(todos: ITodoItem[], status: string) {
    const filteredTodos = todos.filter((item) => {
      if (status === "all") {
        return item;
      } else if (status === "completed") {
        return item.isDone;
      } else if (status === "inWork") {
        return !item.isDone;
      }
    });
    setTodos(filteredTodos);
  }

  return (
    <>
      <AddTodo
        addTodo={addTodo}
        activeTab={activeTab}
        updateTodosWithFiltering={updateTodosWithFiltering}
      />
      <Lists
        todos={todos}
        counters={counters}
        getTodosData={getTodosData}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        updateTodosWithFiltering={updateTodosWithFiltering}
        setActiveTab={setActiveTab}
      />
    </>
  );
}

export default TodoListPage;
