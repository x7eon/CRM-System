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

  useEffect(() => {
    getTodos("all");
    getCounters();
  }, []);

  async function getCounters() {
    try {
      const response = await getTodosApi("all");
      const data = response.info;
      setCounters({
        ...counters,
        todosAllCount: data.all,
        todosInWorkCount: data.inWork,
        todosCompletedCount: data.completed,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getTodos(status: string) {
    try {
      const response = await getTodosApi(status);
      setTodos(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function addTodo(title: string) {
    try {
      const response = await addTodoApi({ title });
      setTodos([...todos, response]);
      await getCounters();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTodo(id: number) {
    try {
      await deleteTodoApi(id);
      const filteredTodos = todos.filter((item) => item.id !== id);
      setTodos([...filteredTodos]);
      await getCounters();
    } catch (e) {
      console.log(e);
    }
  }

  async function editTodo(id: number, title?: string, isDone?: boolean) {
    try {
      await editTodoApi(id, { title, isDone });
      await getCounters();
    } catch (e) {
      console.log(e);
    }
  }

  function removeItemFromList(id: number) {
    setTodos([...todos.filter((item) => item.id !== id)]);
  }

  function validateTitle(title: string) {
    const titleLength = title.length;
    if (title === "") {
      return { isValid: false, errorText: "Это поле не может быть пустым" };
    } else if (
      titleLength < 2 ||
      (title.trim().length < 2 && title.trim() !== "")
    ) {
      return {
        isValid: false,
        errorText: "Минимальная длина текста 2 символа",
      };
    } else if (titleLength > 64) {
      return {
        isValid: false,
        errorText: "Максимальная длина текста 64 символа",
      };
    } else if (title.trim() === "") {
      return {
        isValid: false,
        errorText: "Текст не должен быть пустым",
      };
    } else {
      return { isValid: true, errorText: "" };
    }
  }

  function toggleShowValidateError(
    isValid: boolean,
    errorElement: React.RefObject<HTMLSpanElement | null>,
  ) {
    if (!isValid) {
      errorElement.current!.classList.add("errorText_visible");
    } else {
      errorElement.current!.classList.remove("errorText_visible");
    }
  }

  return (
    <>
      <AddTodo
        addTodo={addTodo}
        validateTitle={validateTitle}
        toggleShowValidateError={toggleShowValidateError}
      />
      <Lists
        todos={todos}
        counters={counters}
        getTodos={getTodos}
        getCounters={getCounters}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        removeTodoFromList={removeItemFromList}
        validateTitle={validateTitle}
        toggleShowValidateError={toggleShowValidateError}
      />
    </>
  );
}

export default TodoListPage;
