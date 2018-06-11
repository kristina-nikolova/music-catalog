import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyPlaylistsComponent } from './my-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';

const routes: Routes = [
  {
    path: '',
    component: MyPlaylistsComponent
  },
  {
    path: ':id',
    component: PlaylistDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPlaylistsRoutingModule {}
