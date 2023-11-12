import { Todo } from "./todo";

export interface Day {
  id: number,
  date: string,
  todos: Todo[],
};
