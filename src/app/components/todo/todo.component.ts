import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo!: Todo;
}
