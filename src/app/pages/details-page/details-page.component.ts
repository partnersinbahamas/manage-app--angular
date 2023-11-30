import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Day } from 'src/app/Classes/Day';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy{
  destroy$$ = new Subject();

  day: Day | null = null;

  constructor(
    private dayService: DayService,
  ) {}

  ngOnInit(): void {
    this.dayService.selectedDay$.pipe(
      takeUntil(this.destroy$$),
    ).subscribe((selectedDay) => {
      if (!selectedDay) {
        this.dayService.currentDay$.pipe(
          takeUntil(this.destroy$$)
        ).subscribe((currentDay) => {
          this.day = currentDay;
        })
      } else {
        this.day = selectedDay;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$$.next(null);
    this.destroy$$.complete();
  }
}
