import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistDetailsComponent } from './../playlist-details/playlist-details.component';
import { MyPlaylistsComponent } from './my-playlists.component';

const routes: Routes = [
    {
      path: 'catalog/my-playlists',
      component: MyPlaylistsComponent
    },
    {
      path: 'catalog/my-playlists/:id',
      component: PlaylistDetailsComponent
    }
];

@NgModule({
  imports:      [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MyPlaylistsRoutingModule {}
