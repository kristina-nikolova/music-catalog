import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mood-window',
  templateUrl: './mood-window.component.html',
  styleUrls: ['./mood-window.component.scss']
})

export class MoodWindowComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() moodIsSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(){}

  ngOnInit() {}

  selectMood(mood: string) {
    this.moodIsSelected.emit(mood);
  }

}
