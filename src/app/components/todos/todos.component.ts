
import { Component } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { TodosService } from 'src/app/services/todos.service';
import { Day } from 'src/app/types/day';
import { formatDate } from 'src/helpers/functions';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  calendar: Day[] = [];
  constructor(
    private todosService: TodosService,
    private calendarService: CalendarService,
  ) {}

  onAdd() {
    const currentDate = formatDate(new Date());
    let currentDay = this.calendar.find((day: Day) => day.date === currentDate);

    if (!currentDay) {
      this.calendarService.createDay();
    } else {
      this.calendarService.createTodoByDate(formatDate(new Date()));
    }
  }

  ngOnInit(): void {
    this.calendarService.calendar$
      .subscribe(calendar => {
        this.calendar = calendar
      })
  }
}
