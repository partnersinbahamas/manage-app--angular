import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { ImportantsTypes } from 'src/app/types/todo';
import { formatDate } from 'src/helpers/functions';

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
  });

  message: string = '';

  constructor(
    private todosService: TodoService,
  ) {}

  get title() {
    return this.formGroup.get('title') as FormControl;
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
