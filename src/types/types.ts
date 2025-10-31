export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export type TodoRequest = Partial<Pick<Todo, "title" | "isDone">>;

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export enum StatusEnum {
  all = "all",
  completed = "completed",
  inWork = "inWork",
}
