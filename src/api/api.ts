import axios from "axios";
import type {
  TodoRequest,
  TodoInfo,
  MetaResponse,
  Todo,
} from "../types/types.ts";
import { StatusEnum } from "../types/types.ts";

const BASE_URL = "https://easydev.club/api/v1";

async function getTodosApi(
  status: StatusEnum,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const res = await axios.get(`${BASE_URL}/todos?filter=${status}`);
    return res.data;
  } catch (e) {
    console.log("Произошла ошибка при получении todo: " + e);
    throw e;
  }
}

async function addTodoApi(title: TodoRequest): Promise<Todo> {
  try {
    const res = await axios.post(`${BASE_URL}/todos`, title);
    return res.data;
  } catch (e) {
    console.log("Произошла ошибка при добавлении todo: " + e);
    throw e;
  }
}

async function deleteTodoApi(id: number): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/todos/${id}`);
  } catch (e) {
    console.log("Произошла ошибка при удалении todo: " + e);
    throw e;
  }
}

async function editTodoApi(id: number, request: TodoRequest): Promise<Todo> {
  try {
    const response = await axios.put(`${BASE_URL}/todos/${id}`, request);
    return response.data;
  } catch (e) {
    console.log("Произошла ошибка при изменении todo: " + e);
    throw e;
  }
}

export { getTodosApi, addTodoApi, deleteTodoApi, editTodoApi };
