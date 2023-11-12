import { Injectable } from '@angular/core';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos$$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos$$.asObservable();

  constructor(
    private localeStorage: LocaleStorageServiceService,
  ) {
    this.todos$$.next(this.getItem('todos') || []);
  }

  private getItem(key: string) {
    return this.localeStorage.getData(key);
  }

  private saveToStorage(key: string, data: Todo[]) {
    return this.localeStorage.saveData(key, data);
  }

  addTodo(todo: any) {
    const updatedTodo = [...this.todos$$.getValue(), todo];
    this.todos$$.next(updatedTodo);
    this.saveToStorage('todos', updatedTodo);
  }
}
