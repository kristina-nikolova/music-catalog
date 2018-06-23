import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowButtonComponent {
  @Input() name: string;
  @Output() onClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onClick() {
    this.onClicked.emit('Click from nested component');
  }
}
