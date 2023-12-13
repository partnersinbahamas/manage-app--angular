import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Important } from 'src/app/types/important';
import { InputType } from 'src/app/types/input-type';
import { SelectInputType } from 'src/app/types/select-input-type';
import { ImportantsTypes } from 'src/app/types/todo';
import { formatDate } from 'src/helpers/functions';
import { importants } from 'src/helpers/variables';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  private validationMessages = {
    required: 'This field is required',
    length: 'Please enter at least 3 characters',
  };

  formGroup = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ]
    }),

    important: new FormControl(ImportantsTypes.AVARAGE, {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    })
  });

  inputObj: InputType = {
    name: 'title',
    placeholder: 'Type some...',
    formGroup: this.formGroup,
  };

  inputSelectOnj: SelectInputType = {
    selectedValue: this.important.value,
    selectedLabel: 'Avarage',
    isOpen: false,
  }

  importants = importants.map((el) => ({...el, formGroup: this.formGroup}))
  
  message: string = ''; 

  get title() {
    return this.formGroup.get('title') as FormControl;
  }

  get important() {
    return this.formGroup.get('important') as FormControl;
  }

  get preparetedImportants() {
    return this.importants.filter(
      (important) => important.value !== this.inputSelectOnj.selectedValue
  );
  }
 
  constructor(
    private todosService: TodoService,
  ) {}

  onSelect(important: Important) {
    this.inputSelectOnj.selectedValue = important.value;
    this.inputSelectOnj.selectedLabel = important.label;

    this.preparetedImportants;
  }

  isValidated() {
    const { required, minlength } = this.title.errors || {};

    if (required) {
      this.message = this.validationMessages.required;
      return false;
    }

    if (minlength && minlength.requiredLength > minlength.actualLength) {
      this.message = this.validationMessages.length;
      return false;
    }

    return true;
  }

  // onImportantSelect(important: Important) {
  //   this.in
  // }

  onTodoAdd() {
    if (this.isValidated() === true) {
      const newTodo = {
        id: 1,
        title: this.title.value,
        complete: false,
        date: formatDate(new Date()),
        importants: ImportantsTypes.AVARAGE,
      }
  
      this.todosService.onAddTodo(newTodo);

      this.formGroup.reset();
      this.message = '';
    };
  }
}
