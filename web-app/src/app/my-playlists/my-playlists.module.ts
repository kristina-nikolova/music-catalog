import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { MyPlaylistsRoutingModule } from './my-playlists-routing.module';
import { MyPlaylistsComponent } from './my-playlists.component';
import { MyPlaylistsService } from './my-playlists.service';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { PlaylistComponent } from './playlist/playlist.component';

const components = [MyPlaylistsComponent, PlaylistDetailsComponent];

@NgModule({
  imports: [CommonModule, SharedModule, MyPlaylistsRoutingModule],
  declarations: [...components, PlaylistComponent],
  exports: [components],
  providers: [MyPlaylistsService]
})
export class MyPlaylistsModule {}
