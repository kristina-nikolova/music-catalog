import { NgModule, OpaqueToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { APP_CONFIG } from './app.config';
export let MAIN_CONFIG = new OpaqueToken('app.config');

import { SpinnerComponent } from './components/spinner/spinner.component';
import { PlaylistTileComponent } from './components/playlist-tile/playlist-tile.component';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    SpinnerComponent,
    CatalogListComponent,
    PlaylistTileComponent,
    FollowButtonComponent
  ],
  providers: [
    {
      provide: MAIN_CONFIG,
      useValue: APP_CONFIG
    },
  ],
  exports: [
    RouterModule,
    CommonModule,
    SpinnerComponent,
    CatalogListComponent,
    PlaylistTileComponent,
    FollowButtonComponent
  ]
})
export class SharedModule { }
