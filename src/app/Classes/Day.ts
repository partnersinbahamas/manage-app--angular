import { Todo } from "../types/todo";

export class Day {
  todos: Todo[] = [];

  constructor(
    public date: string,
    public id: number,
    public weekId: number,
  ) {}
}