import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { MyPlaylistsService } from './my-playlists.service';
import { MyPlaylistsComponent } from './my-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MyPlaylistsRoutingModule } from './my-playlists-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyPlaylistsRoutingModule
  ],
  declarations: [
    MyPlaylistsComponent,
    PlaylistDetailsComponent,
    PlaylistComponent
  ],
  exports: [
    MyPlaylistsComponent,
    PlaylistDetailsComponent
  ],
  providers: [ MyPlaylistsService ]
})
export class MyPlaylistsModule { }
