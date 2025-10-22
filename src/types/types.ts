export interface ITodoItem {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export type TodoRequest = Partial<Omit<ITodoItem, "created" | "id">>;
