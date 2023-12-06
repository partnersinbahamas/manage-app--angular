import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss']
})
export class CircleButtonComponent {
  @Output() action = new EventEmitter();
  @Input() img!: string;
}
