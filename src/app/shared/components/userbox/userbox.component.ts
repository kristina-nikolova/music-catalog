import { Component, Input } from '@angular/core';

@Component({
  selector: 'userbox',
  templateUrl: './userbox.component.html',
  styleUrls: ['./userbox.component.css']
})

export class UserboxComponent {
  @Input() user: Object;
}
