import { Day } from "./day";

export interface Week {
  id: number,
  startFrom: string,
  endTo: string,
  days: Day[]
}
