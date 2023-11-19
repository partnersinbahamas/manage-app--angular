import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'main-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  title: string = 'To Do List';
  subTitle: string = 'Simple To Do List App UI'
}
