import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { FeaturedPlaylistsService } from './recommended.service';
import { FeaturedPlaylistsComponent } from './recommended.component';

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
