import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  /**
   * If the component should process click event.
   * Try always handling this from parent to remove needless checks
   */
  @Input() clickOnSpecificComponentClass: string;
  @Output() appClickOutside = new EventEmitter();

  constructor(private _ngZone: NgZone, private _elementRef: ElementRef) {}

  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      document.addEventListener('click', this._handleClickEvent.bind(this), true);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this._handleClickEvent.bind(this), true);
  }

  private _handleClickEvent(event: MouseEvent) {
    const targetElement = event.target;
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);

    if (
      !clickedInside &&
      (!this.clickOnSpecificComponentClass || targetElement['className'].includes(this.clickOnSpecificComponentClass))
    ) {
      this._ngZone.run(() => {
        this.appClickOutside.emit(null);
      });
    }
  }
}
