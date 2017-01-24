import { Component, Input } from '@angular/core';
import './userbox.css'

@Component({
  selector: 'userbox',
  template: `
    <div class="userbox">
      <span class="user__name">{{ userName }}</span>
      <img [src]="userPhoto" alt="user photo" class="user__photo" />
    </div>
  `,
})

export class UserboxComponent {
  @Input() userPhoto: String;
  @Input() userName: String;
}
