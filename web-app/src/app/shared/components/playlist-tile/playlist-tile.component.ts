import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { PlaylistTile } from '@shared/models';

@Component({
  selector: 'app-playlist-tile',
  templateUrl: './playlist-tile.component.html',
  styleUrls: ['./playlist-tile.component.scss'],
  animations: [
    trigger('scale', [
      state('in', style({ transform: 'scale(1)' })),
      transition('void => *', [style({ transform: 'scale(0)' }), animate(200)]),
      transition('* => void', [animate(200, style({ transform: 'scale(1)' }))])
    ])
  ]
})
export class PlaylistTileComponent {
  @Input() playlist: PlaylistTile;
  @Input() canFollow: Boolean;
  @Input() link: String;
  @Input() isFolowing: Boolean;
  @Output() onPlaylistFollowButtonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPlaylistUnFollowButtonClicked: EventEmitter<string> = new EventEmitter<string>();

  onPlaylistFollowButtonClick() {
    this.onPlaylistFollowButtonClicked.emit();
  }

  onPlaylistUnFollowButtonClick() {
    this.onPlaylistUnFollowButtonClicked.emit();
  }
}
