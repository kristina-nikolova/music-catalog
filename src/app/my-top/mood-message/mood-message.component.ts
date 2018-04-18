import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mood-message',
  templateUrl: './mood-message.component.html',
  styleUrls: ['./mood-message.component.css']
})
export class MoodMessageComponent implements OnInit {
  @Input() text: String;
  @Input() icon: String;

  constructor() { }

  ngOnInit() {
  }

}
