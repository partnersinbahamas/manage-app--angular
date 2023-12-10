import { Component } from '@angular/core';
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
  formGroup = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
  });

  constructor(
    private todosService: TodoService,
  ) {}

  get title() {
    return this.formGroup.get('title') as FormControl;
  }

  onTodoAdd() {
    const newTodo = {
      id: 1,
      title: this.title.value,
      complete: false,
      date: formatDate(new Date()),
      importants: ImportantsTypes.AVARAGE,
    }

    this.todosService.onAddTodo(newTodo);
  }
}
