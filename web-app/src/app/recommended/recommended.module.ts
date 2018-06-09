import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { RecommendedService } from './recommended.service';
import { RecommendedComponent } from './recommended.component';
import { RecommendedRoutingModule } from './recommended-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RecommendedRoutingModule
  ],
  declarations: [
    RecommendedComponent
  ],
  exports: [ RecommendedComponent ],
  providers: [
    RecommendedService
  ]
})
export class RecommendedModule { }
