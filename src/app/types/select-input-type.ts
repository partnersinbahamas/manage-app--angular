import { FormGroup } from "@angular/forms";
import { ImportantsTypes } from "./todo";

export interface SelectInputType {
  selectedValue: ImportantsTypes,
  selectedLabel: string,
  isOpen: boolean,
}
