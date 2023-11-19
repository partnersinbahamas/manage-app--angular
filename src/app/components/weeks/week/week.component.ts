import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Day } from 'src/app/types/day';
import { Week } from 'src/app/types/week';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekComponent {
  @Input() week!: Week;
  @Output() onDayInit = new EventEmitter();

  @ViewChild('weekEl') set weekElement(ref: ElementRef) {
    if (ref) {
      this.onDayInit.emit(ref);
    }
  }

  trackById(i: number, day: Day) {
    return day.id;
  }
}
