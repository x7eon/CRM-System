const BASE_URL = "https://easydev.club/api/v1";

// interface TodoRequest {
//   title?: string;
//   isDone?: boolean; // изменение статуса задачи происходит через этот флаг
// }

async function getTodosApi(status: string) {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${status}`, {
      method: "GET",
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка: " + e);
  }
}

async function addTodoApi(title: string) {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, isDone: false }),
    });
    return response.json();
  } catch (e) {
    console.log("Произошла ошибка: " + e);
  }
}

async function deleteTodoApi(id: number) {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.log("Произошла ошибка: " + e);
  }
}

async function editTodoApi(id: number, title?: string, isDone?: boolean) {
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
    console.log("Произошла ошибка: " + e);
  }
}

export { getTodosApi, addTodoApi, deleteTodoApi, editTodoApi };
