import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homе.component';
import { HomeResolver } from './home/homе-resolver.service';
import { RecommendedComponent } from './recommended/recommended.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyTopComponent } from './my-top/my-top.component';
import { PlaylistDetailsComponent } from './my-playlists/playlist-details/playlist-details.component';

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
        path: 'my-top',
        component: MyTopComponent
      }
    ]
  },
  {
    path: 'recommended',
    loadChildren: './recommended/recommended.module#RecommendedModule',
    data: {
      preloadAfter: ['/catalog']
    }
  },
  {
    path: 'my-playlists',
    loadChildren: './my-playlists/my-playlists.module#MyPlaylistsModule',
    data: {
      preloadAfter: ['/catalog']
    }
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
