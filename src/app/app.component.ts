import { Component, OnInit } from '@angular/core';
import { navigations } from './../helpers/variables';
import { Nav } from './types/nav';
import {NavigationEnd, Router } from '@angular/router';
import { TodosService } from './services/todos.service';
import { Todo } from './types/todo';
import { map } from 'rxjs';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navs: Nav[] = navigations;
  // todos = this.todosService.todos$;
  // todosCount = this.todos.pipe(
  //   map(todos => todos.length)
  // );

  href: string = '';

  constructor(
    private router: Router,
    private todosService: TodosService,
    private calendarService: CalendarService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.href = event.url.split('/')[1];
      }
    });
  }
}
