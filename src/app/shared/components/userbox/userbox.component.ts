import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-userbox',
  templateUrl: './userbox.component.html',
  styleUrls: ['./userbox.component.css']
})

export class UserboxComponent {
  @Input() user: Object;
}
