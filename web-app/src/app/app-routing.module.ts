import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { HomeResolver } from './home/homе-resolver.service';
import { RecommendedComponent } from './recommended/recommended.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyTopComponent } from './my-top/my-top.component';
import { PlaylistDetailsComponent } from './my-playlists/playlist-details/playlist-details.component';
import { RecommendedModule } from './recommended/recommended.module';
import { MyPlaylistsModule } from './my-playlists/my-playlists.module';
import { MyTopModule } from './my-top/my-top.module';

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
        loadChildren: () => RecommendedModule
      },
      {
        path: 'my-playlists',
        loadChildren: () => MyPlaylistsModule
      },
      {
        path: 'my-top',
        loadChildren: () => MyTopModule
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
