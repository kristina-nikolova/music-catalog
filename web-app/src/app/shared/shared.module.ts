import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { APP_CONFIG } from './app.config';
export let MAIN_CONFIG = new InjectionToken('app.config');

import { SpinnerComponent, PlaylistTileComponent, TilesListComponent, FollowButtonComponent, TrackComponent, MoodWindowComponent, IframeComponent } from '@shared/components';

const components = [
  SpinnerComponent,
  TilesListComponent,
  PlaylistTileComponent,
  FollowButtonComponent,
  TrackComponent,
  MoodWindowComponent,
  IframeComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: components,
  providers: [
    {
      provide: MAIN_CONFIG,
      useValue: APP_CONFIG
    },
  ],
  exports: [
    ...components,
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
