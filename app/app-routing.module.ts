import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { FeaturedPlaylistsListComponent } from './featured-playlists/featured-playlists-list.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';

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
    children: [
      { 
        path: 'featured-playlists', 
        component: FeaturedPlaylistsListComponent
      },
      { 
        path: 'featured-playlists/:id', 
        component: PlaylistDetailsComponent,
      },
      { 
        path: 'my-playlists', 
        component: MyPlaylistsComponent
      },
      { 
        path: 'my-playlists/:id', 
        component: PlaylistDetailsComponent,
      }
    ]
  },
  //{ path: '**', component: AppComponent }
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
