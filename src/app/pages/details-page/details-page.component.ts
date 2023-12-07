import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Day } from 'src/app/Classes/Day';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent implements OnDestroy {
  @Input() selectedDay!: null | Day; 
  destroy$$ = new Subject();

  day: Day | null = null;

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$$.next(null);
    this.destroy$$.complete();
  }
}
