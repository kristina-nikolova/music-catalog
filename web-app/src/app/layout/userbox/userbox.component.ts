import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { User } from '@shared/models';

@Component({
  selector: 'app-userbox',
  templateUrl: './userbox.component.html',
  styleUrls: ['./userbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserboxComponent {
  @Input() user: User;
  @Output() onLogoutClicked: EventEmitter<any> = new EventEmitter<any>();

  showUserDropdown = false;

  onLogoutClick() {
    this.onLogoutClicked.emit();
  }
}
