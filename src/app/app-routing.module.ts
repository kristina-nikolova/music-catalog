import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { HomeResolver } from './home/homе-resolver.service';
import { RecommendedComponent } from './recommended/recommended.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { MyTopComponent } from './my-top/my-top.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'catalog',
    component: HomeComponent,
    resolve: {
      homeResolver: HomeResolver
    },
    children: [
      {
        path: 'recommended',
        component: RecommendedComponent
      },
      {
        path: 'my-playlists',
        component: MyPlaylistsComponent
      },
      {
        path: 'my-playlists/:id',
        component: PlaylistDetailsComponent
      },
      {
        path: 'my-top',
        component: MyTopComponent
      }
    ]
  }
];

@NgModule({
  imports:      [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
