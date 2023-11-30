import { Day } from "./Day";

export class Week {
  constructor(
    public id: number,
    public startFrom: string,
    public endTo: string,
    public days: Day[],
  ) {}
}