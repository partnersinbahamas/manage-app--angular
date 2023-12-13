import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Important } from 'src/app/types/important';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss']
})
export class ImportantComponent {
  @Input() important!: Important;
  @Output() onSelect = new EventEmitter();
}
