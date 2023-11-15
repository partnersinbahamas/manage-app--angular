import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Nav } from 'src/app/types/nav';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  @Input() nav!: Nav;
};
