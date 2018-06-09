import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowButtonComponent {
  @Input() name: string;
  @Output() onClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onClick() {
    this.onClicked.emit('Click from nested component');
  }

}
