import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss']
})
export class CircleButtonComponent {
  @Output() action = new EventEmitter();
  @Input() isSuccess!: boolean;
  @Input() img!: string;

  isMove: boolean = true;

  onEmit() {
    this.action.emit();
    this.isMove = true;

    setTimeout(() => {
      this.isMove = false;
    }, 3000)
  }
}
