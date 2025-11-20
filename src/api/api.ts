import axios from "axios";
import type {
  TodoRequest,
  TodoInfo,
  MetaResponse,
  Todo,
} from "../types/types.ts";
import { StatusEnum } from "../types/types.ts";

const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

async function getTodosApi(
  status: StatusEnum,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const res = await axiosInstance.get(`/todos`, {
      params: {
        filter: status,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}

async function addTodoApi(title: TodoRequest): Promise<Todo> {
  try {
    const res = await axiosInstance.post(`/todos`, title);
    return res.data;
  } catch (e) {
    throw e;
  }
}

async function deleteTodoApi(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`/todos/${id}`);
  } catch (e) {
    throw e;
  }
}

async function editTodoApi(id: number, request: TodoRequest): Promise<Todo> {
  try {
    const response = await axiosInstance.put(`/todos/${id}`, request);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export { getTodosApi, addTodoApi, deleteTodoApi, editTodoApi };
