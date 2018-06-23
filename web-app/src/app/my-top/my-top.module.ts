import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { MoodMessageComponent } from './mood-message/mood-message.component';
import { MyTopRoutingModule } from './my-top-routing.module';
import { MyTopComponent } from './my-top.component';

const components = [MyTopComponent];

@NgModule({
  imports: [CommonModule, SharedModule, MyTopRoutingModule],
  declarations: [...components, MoodMessageComponent],
  exports: [MyTopComponent],
  providers: []
})
export class MyTopModule {}
