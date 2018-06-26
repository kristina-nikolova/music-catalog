import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateIfAuthenticated } from '@shared/guards';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MyPlaylistsModule } from './my-playlists/my-playlists.module';
import { MyTopModule } from './my-top/my-top.module';
import { RecommendedModule } from './recommended/recommended.module';
import { UserResolver } from './shared/resolvers/user-resolver.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'catalog',
    component: LayoutComponent,
    resolve: {
      user: UserResolver
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
