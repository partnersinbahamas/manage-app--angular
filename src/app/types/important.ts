import { FormGroup } from "@angular/forms";
import { ImportantsTypes } from "./todo";

export interface Important {
  id: number,
  value: ImportantsTypes,
  label: string,
  formGroup: FormGroup | null,
}
