import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { FeaturedPlaylistsService } from './featured-playlists.service';
import { FeaturedPlaylistsComponent } from './featured-playlists.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    FeaturedPlaylistsComponent
  ],
  exports: [ FeaturedPlaylistsComponent ],
  providers: [
    FeaturedPlaylistsService
  ]
})
export class FeaturedPlaylistsModule { }
