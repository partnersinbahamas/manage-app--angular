
import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Week } from 'src/app/Classes/Week';
import { formatDate } from 'src/helpers/functions';
import { Day } from 'src/app/Classes/Day';
import { Subject, take, takeUntil } from 'rxjs';
import { compareDates } from 'src/helpers/functions';


@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class WeeksComponent implements OnInit, OnDestroy, OnChanges, AfterContentChecked {
  // weeks: Week[] = [];

  @Input() weeks!: Week[];

  destroy$ = new Subject();

  weekWidth: number = 0;
  weeksShift: number = 0;

  selectedWeek: Week | null = null;
  selectedDay: Day | null = null;
  currentDay: Day | null = null;

  isSuccessAdded: boolean = false;

  _max: number = 0;

  set max(value: any) {
    this._max = ((this.weeks.length - 1) * this.weekWidth) + (this.weeks.length - 1) * 30;
  }

  get max() {
    return -this._max;
  }

  isMax: boolean = false;
  isMin: boolean = false;

  constructor(
    private weeksService: WeeksService,
    private dayService: DayService,
  ) {}
  ngAfterContentChecked(): void {
    console.log('max', this.isMax);
    console.log('min', this.isMin);
  }

  ngOnChanges({weeks}: SimpleChanges): void {
    if (weeks.previousValue !== weeks.currentValue) {
      this.arrowLimitReBuild();
    }
  }

  arrowLimitReBuild() {
    this.max = null;

    this.isMax = this.weeksShift <= this.max;
    this.isMin = this.weeksShift === 0;
  }

  trackById(i: number, week: Week) {
    return week.id;
  }

  onDayElementInit(ref: ElementRef): void {
    this.weekWidth = ref.nativeElement.clientWidth;
    const index = this.selectedWeek?.id! - 1;

    this.arrowLimitReBuild();

    this.weeksShift = Math.max(-((this.weekWidth * index) + (index * 30)), this.max);
  }

  onWeekUnShift() {
    if (!this.isMin) {
      const shift =  Math.min(this.weeksShift + (this.weekWidth + 30), 0);
      this.weeksShift = shift;
  
        this.arrowLimitReBuild();
  
      this.weeksService.pickWeek(
        Math.max(this.selectedWeek?.id! - 1, 1)
      );
    }
  }

  onWeekShift() {
    if (!this.isMax) {
      this.max = null;

      const shift = Math.max(this.weeksShift - (this.weekWidth + 30), this.max)
      this.weeksShift = shift;
  
      this.isMax = this.weeksShift <= this.max;
      this.isMin = this.weeksShift === 0;
  
      this.weeksService.pickWeek(
        Math.min(this.selectedWeek?.id! + 1,
          this.weeks[this.weeks.length - 1].id,
        ),
      );
    }
  }

    onWeekUnShiftMin() {
    this.weeksShift = 0;
    this.weeksService.pickWeek(this.weeks[0].id);
    this.arrowLimitReBuild();
  }

  onWeekShiftMax() {
    this.weeksShift = this.max;
    this.weeksService.pickWeek(this.weeks[this.weeks.length - 1].id);
    this.arrowLimitReBuild();
  }

  onAdd() {
    this.weeksService.createWeek();

    this.isSuccessAdded = true;

    setTimeout(() => {
      this.isSuccessAdded = false;
    }, 2000)
  };

  ngOnInit(): void {
    // this.weeksService.weeks$.pipe(takeUntil(this.destroy$))
    //   .subscribe(weeks => {
    //     this.weeks = weeks
    //   });

    this.weeksService.selectedWeek$.pipe(takeUntil(this.destroy$))
      .subscribe((selectedWeek) => {
        this.selectedWeek = selectedWeek;
      });

    this.dayService.selectedDay$.pipe(takeUntil(this.destroy$))
      .subscribe((selectedDay) => {
        this.selectedDay = selectedDay
      })

    this.dayService.currentDay$.pipe(takeUntil(this.destroy$))
      .subscribe((currentDay) => {
        this.currentDay = currentDay;
      });

      if (!this.weeks.length) {
        this.onAdd();
      } else {
        const lastWeek = this.weeks[this.weeks.length - 1];

        const isCreateNewWeek = compareDates(
          formatDate(new Date()),
          lastWeek.endTo,
        );

        if (isCreateNewWeek) {
          this.onAdd();
        }
      }

    this.selectedWeek = this.weeks.find((week) => {
      return week.days.find((item) => item.date === formatDate(new Date()));
    }) || this.weeks[0];
    this.weeksService.pickWeek(this.selectedWeek.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
