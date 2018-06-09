import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})

export class IframeComponent {
  @Input() url: string;

  constructor( private _sanitizer: DomSanitizer) { }

  setIframeURL() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
