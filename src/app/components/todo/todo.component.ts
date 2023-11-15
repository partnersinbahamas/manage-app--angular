import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/services/calendar.service';
import { Todo } from 'src/app/types/todo';
import { formatDate } from 'src/helpers/functions';

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

  constructor(
    private calendarService: CalendarService,
  ) {}

  ngOnInit(): void {
    console.log(this.isEditing);
  }

  onFocus() {
    this.isEditing = true;
    this.title = this.todo.title;
  }

  onSave() {
    this.isEditing = false;

    console.log(this.title);

    // this.calendarService
    //   .updateTodoByDate(
    //     formatDate(new Date()),
    //     { ...this.todo, title: this.title} /// ?
    //   );  // in develop phase
  }
}
