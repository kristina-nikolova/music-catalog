import { NgModule, OpaqueToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { APP_CONFIG } from './app.config';
export let MAIN_CONFIG = new OpaqueToken('app.config');

import { SpinnerComponent } from './components/spinner/spinner.component';
import { PlaylistTileComponent } from './components/playlist-tile/playlist-tile.component';
import { TilesListComponent } from './components/tiles-list/tiles-list.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { TrackComponent } from './components/track/track.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    SpinnerComponent,
    TilesListComponent,
    PlaylistTileComponent,
    FollowButtonComponent,
    TrackComponent
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
    TilesListComponent,
    PlaylistTileComponent,
    FollowButtonComponent,
    TrackComponent
  ]
})
export class SharedModule { }
