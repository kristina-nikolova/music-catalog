import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { FeaturedPlaylistsComponent } from './featured-playlists/featured-playlists.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { HomeResolver } from './home/homе-resolver.service';

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
        path: 'featured-playlists', 
        component: FeaturedPlaylistsComponent
      },
      { 
        path: 'my-playlists', 
        component: MyPlaylistsComponent
      },
      { 
        path: 'my-playlists/:id', 
        component: PlaylistDetailsComponent
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
