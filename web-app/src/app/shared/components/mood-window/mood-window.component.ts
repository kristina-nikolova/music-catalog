import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mood-window',
  templateUrl: './mood-window.component.html',
  styleUrls: ['./mood-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MoodWindowComponent {
  @Input() isVisible: boolean;
  @Output() moodIsSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(){}

  selectMood(mood: string) {
    this.moodIsSelected.emit(mood);
  }

}
