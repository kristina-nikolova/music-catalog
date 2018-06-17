import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutResolver } from './layout/layout-resolver.service';
import { RecommendedComponent } from './recommended/recommended.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyTopComponent } from './my-top/my-top.component';
import { PlaylistDetailsComponent } from './my-playlists/playlist-details/playlist-details.component';
import { RecommendedModule } from './recommended/recommended.module';
import { MyPlaylistsModule } from './my-playlists/my-playlists.module';
import { MyTopModule } from './my-top/my-top.module';
import { CanActivateIfAuthenticated } from '@shared/guards';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'catalog',
    component: LayoutComponent,
    resolve: {
      user: LayoutResolver
    },
    children: [
      {
        path: 'recommended',
        loadChildren: () => RecommendedModule,
        canActivate: [CanActivateIfAuthenticated]
      },
      {
        path: 'my-playlists',
        loadChildren: () => MyPlaylistsModule,
        canActivate: [CanActivateIfAuthenticated]
      },
      {
        path: 'my-top',
        loadChildren: () => MyTopModule,
        canActivate: [CanActivateIfAuthenticated]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/catalog/recommended',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateIfAuthenticated]
})
export class AppRoutingModule {}
