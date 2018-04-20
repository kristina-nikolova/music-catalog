import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mood-message',
  templateUrl: './mood-message.component.html',
  styleUrls: ['./mood-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoodMessageComponent implements OnInit {
  @Input() text: String;
  @Input() icon: String;

  constructor() { }

  ngOnInit() {
  }

}
