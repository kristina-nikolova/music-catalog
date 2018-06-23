import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_CONFIG } from './app.config';
export let MAIN_CONFIG = new InjectionToken('app.config');

import {
  FollowButtonComponent,
  MoodWindowComponent,
  PauseButtonComponent,
  PlaylistTileComponent,
  SpinnerComponent,
  TilesListComponent,
  TrackComponent
} from '@shared/components';
import { ClickOutsideDirective } from '@shared/directives';
import { SafePipe, SortByPipe } from '@shared/pipes';

const components = [
  SpinnerComponent,
  TilesListComponent,
  PlaylistTileComponent,
  FollowButtonComponent,
  TrackComponent,
  MoodWindowComponent,
  ClickOutsideDirective,
  PauseButtonComponent
];

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [...components, SafePipe, SortByPipe],
  providers: [
    {
      provide: MAIN_CONFIG,
      useValue: APP_CONFIG
    }
  ],
  exports: [...components, SortByPipe, RouterModule, CommonModule]
})
export class SharedModule {}
