import type { TodoRequest } from "../types/types.ts";

const BASE_URL = "https://easydev.club/api/v1";

async function getTodosApi(status: string) {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${status}`, {
      method: "GET",
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка при получении todo: " + e);
  }
}

async function addTodoApi({ title, isDone = false }: TodoRequest) {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, isDone }),
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка при добавлении todo: " + e);
  }
}

async function deleteTodoApi(id: number) {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.log("Произошла ошибка при удалении todo: " + e);
  }
}

async function editTodoApi(id: number, { title, isDone }: TodoRequest) {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, isDone }),
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка при изменении todo: " + e);
  }
}

export { getTodosApi, addTodoApi, deleteTodoApi, editTodoApi };
