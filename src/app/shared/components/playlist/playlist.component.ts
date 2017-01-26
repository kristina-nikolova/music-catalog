import { Playlist } from './../../model/playlist.model';
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlaylistComponent {
  @Input() playlist: Playlist;
  @Input() canFollow: Boolean;
  @Input() link: String;
  @Output() onPlaylistFollowButtonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPlaylistUnFollowButtonClicked: EventEmitter<string> = new EventEmitter<string>();

  onPlaylistFollowButtonClick() {
    this.onPlaylistFollowButtonClicked.emit();
  }

  onPlaylistUnFollowButtonClick() {
    this.onPlaylistUnFollowButtonClicked.emit();
  }
}
