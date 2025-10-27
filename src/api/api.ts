import type {
  TodoRequest,
  Status,
  TodoInfo,
  MetaResponse,
  Todo,
} from "../types/types.ts";

const BASE_URL = "https://easydev.club/api/v1";

async function getTodosApi(
  status: Status,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${status}`, {
      method: "GET",
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка при получении todo: " + e);
    throw e;
  }
}

async function addTodoApi(title: TodoRequest): Promise<Todo> {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(title),
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка при добавлении todo: " + e);
    throw e;
  }
}

async function deleteTodoApi(id: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.log("Произошла ошибка при удалении todo: " + e);
    throw e;
  }
}

async function editTodoApi(id: number, request: TodoRequest): Promise<Todo> {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка при изменении todo: " + e);
    throw e;
  }
}

export { getTodosApi, addTodoApi, deleteTodoApi, editTodoApi };
