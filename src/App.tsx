import "./App.css";
import type { ReactElement } from "react";
import AddTodo from "./components/AddTodo/AddTodo.tsx";
import Lists from "./components/Lists/Lists.tsx";
import {
  addTodoApi,
  deleteTodoApi,
  getTodosApi,
  editTodoApi,
  // getTaskById,
} from "./api/api.ts";
import { useEffect, useState } from "react";
import { type ITodoItem } from "./components/TodoItem/TodoItem.tsx";

export interface ICounters {
  todosAllCount: number;
  todosInWorkCount: number;
  todosCompletedCount: number;
}

function App(): ReactElement {
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
      console.log(response);
      setTodos(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function addTodo(title: string) {
    try {
      const response = await addTodoApi(title);
      setTodos([...todos, response]);
      await getCounters();
      console.log("Добавление todo");
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
      console.log("Удаление todo");
    } catch (e) {
      console.log(e);
    }
  }

  async function editTodo(id: number, title?: string, isDone?: boolean) {
    try {
      const result = await editTodoApi(id, title, isDone);
      console.log(result);
      await getCounters();
      console.log("Изменение todo");
    } catch (e) {
      console.log(e);
    }
  }

  function removeItemFromList(id: number) {
    setTodos([...todos.filter((item) => item.id !== id)]);
  }

  function validateTitle(
    title: string,
    isValid: React.RefObject<boolean>,
    errorTextRef: React.RefObject<HTMLSpanElement | null>,
    setValidateErrorText: (value: string) => void,
  ) {
    hideValidateError(isValid, errorTextRef);
    const titleLength = title.length;
    if (title === "") {
      isValid.current = false;
      setValidateErrorText("Это поле не может быть пустым");
      showValidateError(isValid, errorTextRef);
    } else if (titleLength < 2) {
      setValidateErrorText("Минимальная длина текста 2 символа");
      isValid.current = false;
      showValidateError(isValid, errorTextRef);
    } else if (titleLength > 64) {
      setValidateErrorText("Максимальная длина текста 64 символа");
      isValid.current = false;
      showValidateError(isValid, errorTextRef);
    } else {
      isValid.current = true;
      hideValidateError(isValid, errorTextRef);
    }
  }

  function showValidateError(
    isValid: React.RefObject<boolean>,
    errorTextRef: React.RefObject<HTMLSpanElement | null>,
  ) {
    if (!isValid.current) {
      errorTextRef.current!.classList.add("errorText_visible");
    }
  }

  function hideValidateError(
    isValid: React.RefObject<boolean>,
    errorTextRef: React.RefObject<HTMLSpanElement | null>,
  ) {
    if (isValid.current) {
      errorTextRef.current!.classList.remove("errorText_visible");
    }
  }

  return (
    <>
      <AddTodo addTodo={addTodo} validateTitle={validateTitle} />
      <Lists
        todos={todos}
        counters={counters}
        getTodos={getTodos}
        getCounters={getCounters}
        deleteItem={deleteTodo}
        editItem={editTodo}
        removeItemFromList={removeItemFromList}
        validateTitle={validateTitle}
      />
    </>
  );
}

export default App;
