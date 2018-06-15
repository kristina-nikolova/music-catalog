import { Component, ChangeDetectionStrategy, Output, Input, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IframeComponent {
  @Input() url: string;
  @Input() trackDurationInMs: number = 30;
  @Output() onClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    debugger;
    // setTimeout(() => {
    //   this.onClicked.emit(true);
    // }, this.trackDurationInMs);
    this.onClicked.emit(true);
  }
}
