import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { APP_CONFIG } from './app.config';
export let MAIN_CONFIG = new InjectionToken('app.config');

import {
  SpinnerComponent,
  PlaylistTileComponent,
  TilesListComponent,
  FollowButtonComponent,
  TrackComponent,
  MoodWindowComponent,
  IframeComponent
} from '@shared/components';
import { ClickOutsideDirective } from '@shared/directives';
import { SafePipe } from './pipes/safe.pipe';

const components = [
  SpinnerComponent,
  TilesListComponent,
  PlaylistTileComponent,
  FollowButtonComponent,
  TrackComponent,
  MoodWindowComponent,
  ClickOutsideDirective,
  IframeComponent
];

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [...components, SafePipe],
  providers: [
    {
      provide: MAIN_CONFIG,
      useValue: APP_CONFIG
    }
  ],
  exports: [...components, RouterModule, CommonModule]
})
export class SharedModule {}
