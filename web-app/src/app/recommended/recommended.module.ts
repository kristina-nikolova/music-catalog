import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { RecommendedRoutingModule } from './recommended-routing.module';
import { RecommendedComponent } from './recommended.component';
import { RecommendedService } from './recommended.service';

const components = [RecommendedComponent];

@NgModule({
  imports: [CommonModule, SharedModule, RecommendedRoutingModule],
  declarations: [components],
  exports: [components],
  providers: [RecommendedService]
})
export class RecommendedModule {}
