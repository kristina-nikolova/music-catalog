import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturedPlaylistsComponent } from './recommended.component';

const routes: Routes = [
    {
      path: 'catalog/recommended',
      component: FeaturedPlaylistsComponent
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
export class FeaturedPlaylistsRoutingModule {}
