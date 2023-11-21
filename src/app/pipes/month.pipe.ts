import { Pipe, PipeTransform } from '@angular/core';
import { getMonth } from 'src/helpers/functions';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {
  transform(date: string): string {
    return getMonth(date);
  }
}
