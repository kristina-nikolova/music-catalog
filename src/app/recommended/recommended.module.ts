import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { RecommendedService } from './recommended.service';
import { RecommendedComponent } from './recommended.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
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
