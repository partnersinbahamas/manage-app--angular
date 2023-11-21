import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;

  isEditing = false;
  title = '';

  @ViewChild('titleField') set titleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    console.log(this.isEditing);
  }

  onFocus() {
    this.isEditing = true;
    this.title = this.todo.title;
  }

  onSave() {
    this.isEditing = false;
  }
}
