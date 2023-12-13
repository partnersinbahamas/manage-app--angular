import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Important } from 'src/app/types/important';
import { SelectInputType } from 'src/app/types/select-input-type';
import { ImportantsTypes } from 'src/app/types/todo';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: [
    './select-input.component.scss', 
    '../../important/important.component.scss',
  ],
})
export class SelectInputComponent implements OnInit {
  @Input() selectInputObj!: SelectInputType;

  isImportant: boolean = false;

  get selectedValue() {
    return this.selectInputObj.selectedValue;
  };

  get selectedLabel() {
    return this.selectInputObj.selectedLabel;
  };

  get isOpen() {
    return this.selectInputObj.isOpen;
  }

  set isOpen(value: boolean) {
    this.selectInputObj.isOpen = value;
  }

  constructor () {}

  ngOnInit(): void {
    this.isImportant = Object.values(ImportantsTypes)
      .includes(this.selectInputObj.selectedValue);
  }
}
