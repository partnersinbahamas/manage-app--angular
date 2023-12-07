
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Week } from 'src/app/Classes/Week';
import { formatDate } from 'src/helpers/functions';
import { Day } from 'src/app/Classes/Day';
import { Subject, takeUntil } from 'rxjs';
import { compareDates } from 'src/helpers/functions';



@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeksComponent implements OnInit, OnDestroy, OnChanges {
  @Input() weeks!: Week[];

  destroy$ = new Subject();

  weekWidth: number = 0;
  weeksShift: number = 0;

  selectedWeek: Week | null = null;
  currentWeek: Week | null = null;

  selectedDay: Day | null = null;
  currentDay: Day | null = null;

  isSuccessAdded: boolean = false;

  _max: number = 0;


  isMax: boolean = false;
  isMin: boolean = false;
  isCurrent: boolean = false;


  set max(value: any) {
    this._max = ((this.weeks.length - 1) * this.weekWidth) + (this.weeks.length - 1) * 30;
  }

  get max() {
    return -this._max;
  }

  constructor(
    private weeksService: WeeksService,
    private dayService: DayService,
  ) {}

  ngOnInit(): void {
    this.weeksService.selectedWeek$.pipe(takeUntil(this.destroy$))
      .subscribe((selectedWeek) => {
        this.selectedWeek = selectedWeek;
      });

    this.weeksService.currentWeek$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((currentWeek) => {
      this.currentWeek = currentWeek;
    })

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
          setTimeout(() => {
            this.onAdd();
            this.weeksService.setCurrentWeek();
          }, 0);
        }
      }

    this.selectedWeek = this.weeks.find((week) => {
      return week.days.find((item) => item.date === formatDate(new Date()));
    }) || this.weeks[0];
    this.weeksService.pickWeek(this.selectedWeek.id);
  }

  ngOnChanges({weeks}: SimpleChanges): void {
    if (weeks.previousValue !== weeks.currentValue) {
      this.arrowLimitReBuild();
    }
  }

  trackById(i: number, week: Week) {
    return week.id;
  }

  arrowLimitReBuild() {
    this.max = null;
    const currentIndex = this.currentWeek?.id! - 1;

    setTimeout(() => {
      this.isMax = this.weeksShift <= this.max;
      this.isMin = this.weeksShift === 0;
      this.isCurrent = this.weeksShift === -(
        (this.weekWidth * currentIndex) + (currentIndex * 30)
      )
    }, 0)
  }

  onDayElementInit(ref: ElementRef): void {
    this.weekWidth = ref.nativeElement.clientWidth;
    const index = this.selectedWeek?.id! - 1;

    this.arrowLimitReBuild();
    
    setTimeout(() => {
      this.weeksShift = Math.max(-((this.weekWidth * index) + (index * 30)), this.max);
    })
  }

  backToCurrent() {
    const index = this.currentWeek?.id! - 1;
    this.weeksShift = -((this.weekWidth * index) + (index * 30));
    this.weeksService.pickWeek(this.currentWeek?.id!);
    this.arrowLimitReBuild();
  }

  onWeekUnShift() {
    if (!this.isMin) {
      const shift =  Math.min(this.weeksShift + (this.weekWidth + 30), 0);
      this.weeksShift = shift;
    
      this.weeksService.pickWeek(
        Math.max(this.selectedWeek?.id! - 1, 1)
      );

      this.arrowLimitReBuild();
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

      this.arrowLimitReBuild();
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

    if (!this.isSuccessAdded) {
      this.isSuccessAdded = true;

      setTimeout(() => {
        this.isSuccessAdded = false;
      }, 2000);
    }
  };

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
