export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export type TodoRequest = Partial<Omit<Todo, "created" | "id">>;

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

export type Status = "all" | "completed" | "inWork";
