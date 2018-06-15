import {
  Component,
  ChangeDetectionStrategy,
  Output,
  Input,
  HostListener,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

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
  @ViewChild('trackIframe') trackIframe: ElementRef;

  isClickedDisabled = true;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.isClickedDisabled = false;
    this.trackIframe.nativeElement.click();
    // setTimeout(() => {
    //   this.onClicked.emit(true);
    // }, this.trackDurationInMs);
  }
}
