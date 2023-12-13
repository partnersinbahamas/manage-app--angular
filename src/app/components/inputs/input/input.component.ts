import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputType } from 'src/app/types/input-type';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class InputComponent {
  @Input() inputObject!: InputType;
  @Output() onActionInput = new EventEmitter();

  get name() {
    return this.inputObject.name;
  };

  get placeholder() {
    return this.inputObject.placeholder;
  };

  get fromGroup() {
    return this.inputObject.formGroup;
  }
}
