import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-userbox',
  templateUrl: './userbox.component.html',
  styleUrls: ['./userbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserboxComponent {
  @Input() user: Object;
}
