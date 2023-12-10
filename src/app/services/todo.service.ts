import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Todo } from '../types/todo';
import { DayService } from './day.service';
import { Day } from '../Classes/Day';
import { WeeksService } from './weeks.service';
import { Week } from '../Classes/Week';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {
  todos$$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos$$.asObservable();

  destroy$ = new Subject();

  weeks: Week[] = [];
  day: Day | null = null;

  constructor(
    private dayService: DayService,
    private weeksService: WeeksService,
  ) { 
    this.dayService.selectedDay$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((day) => {
      this.todos$$.next(day?.todos!);
      this.day = day;
    });

    this.weeksService.weeks$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((weeks) => {
      this.weeks = weeks;
    })
  }

  onAddTodo(todo: Todo) {
    this.weeks.map((week) => {
      return week.days.map((day: Day) => {
        if (day.id === this.day?.id!) {
          day.todos = [...day.todos, todo];
        }

        return day;
      })
    });

    this.weeksService.weeksUpdate(this.weeks);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
