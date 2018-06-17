import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mood-message',
  templateUrl: './mood-message.component.html',
  styleUrls: ['./mood-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoodMessageComponent {
  @Input() text: String;
  @Input() icon: String;

  constructor() {}
}
