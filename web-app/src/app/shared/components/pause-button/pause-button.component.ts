import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PlayerService } from '@shared/services';

@Component({
  selector: 'app-pause-button',
  templateUrl: './pause-button.component.html',
  styleUrls: ['./pause-button.component.scss']
})
export class PauseButtonComponent implements OnInit {
  @Output() onClicked: EventEmitter<string> = new EventEmitter<string>();

  isTrackPlayed = false;

  constructor(private _playerService: PlayerService, private _router: Router) {}

  ngOnInit() {
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this._playerService.player) {
        this._playerService.player.getCurrentState().then((state) => {
          if (state && !state.paused) {
            this.isTrackPlayed = true;
          } else {
            this.isTrackPlayed = false;
          }
        });
      }
    });
  }

  onClick() {
    this.onClicked.emit('Click from nested component');
  }

  pauseTrack() {
    this._playerService
      .pauseTrack({
        playerInstance: this._playerService.player,
        device_id: this._playerService.device_id
      })
      .subscribe();
  }
}
