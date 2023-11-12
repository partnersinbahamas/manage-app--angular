import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleStorageServiceService {

  constructor() { }

  saveData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getData(key: string): any {
    let result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
