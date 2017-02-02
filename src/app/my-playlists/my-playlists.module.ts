import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { MyPlaylistsService } from './my-playlists.service';
import { MyPlaylistsComponent } from './my-playlists.component';
import { PlaylistComponent } from './../playlist-details/components/playlist/playlist.component';
import { PlaylistDetailsComponent } from './../playlist-details/playlist-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
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